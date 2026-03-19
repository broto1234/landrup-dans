"use server"; //uses server-only features: zod, cookies(), redirect(), revalidatePath()

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { newsletterSchema } from "@/lib/validations";
import { formSchema } from "@/lib/validations";
import { loginSchema } from "@/lib/validations";
import { registerSchema } from "@/lib/validations";
import { joinActivity } from "@/lib/dal";
import { fetchUserById } from "@/lib/dal";
import { fetchNewsletter } from "@/lib/dal";

//// Newsletter Action ////
export async function newsletterAction( prevState, formData ) {
  const email = formData.get("email");

  console.log("prevState...:", prevState);

  // if ( prevState?.values && 
  //       email === prevState.values.email ) {
  //   return prevState;
  // }

  const emailParse = newsletterSchema.safeParse({ email });
  
  if (!emailParse.success) {
    return {
      values: { email },
      errors: z.flattenError(emailParse.error).fieldErrors,
    };
  }

  await fetchNewsletter(email);  
  // console.log("Server response:", result);

  return { success: true };
  // return { success: true, values: { email }, errors: undefined };
}

//// Contact Form Action  /////
export async function contactData( prevState, formData ) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  console.log("prevState...:", prevState);

  // if ( prevState?.values && 
  //       name === prevState.values.name && 
  //       email === prevState.values.email && 
  //       message === prevState.values.message) {
  //   return prevState;
  // }

  const validationResult = formSchema.safeParse({ name, email, message });
  
  if (!validationResult.success) {
    return {
      values: { name, email, message },
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  if (!res.ok) {
    return {
      values: { name, email, message },
      errors: { form: ["Failed to send message"] },
    };
  }

  const result = await res.json();
  console.log("Server response:", result);

  return { success: true };
}

////----------- Login User Action ------------- //////
export async function loginData( prevState, formData ) {
  const cookiesStore = await cookies();
  const username = formData.get("username");
  const password = formData.get("password");
  console.log("prevState...:", prevState);

  // if ( prevState?.values && 
  //       username === prevState.values.username && 
  //       password === prevState.values.password) {
  //   return prevState;
  // }

  const validationResult = loginSchema.safeParse({ username, password });
  
  if (!validationResult.success) {
    return {
      values: { username, password },
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }); 
  
  if (!res.ok) {
    return {
      values: { username, password },
      errors: { form: ["Invalid username or password"] },
    };
  }

  const result = await res.json();
  console.log("Server response:", result);

  cookiesStore.set("accessToken", result.token);
  cookiesStore.set("userId", result.userId);
  const role = result.role;
  if (role === "default") { redirect("/user") }
  redirect("/instructor");
}


//----------- Register action ------------ //////

export async function registerData( prevState, formData ) {
  const cookiesStore = await cookies();
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const username = formData.get("username");
  const age = formData.get("age") ?? "";
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  console.log("prevState...:", prevState);
  
  const validationResult = registerSchema.safeParse({ firstname, lastname, username, age, password, confirmPassword });

  if (!validationResult.success) {
    return {
      values: { firstname, lastname, username, age, password, confirmPassword },
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, username, age:validationResult.data.age, password, role: "default" }),
  });
  if (!res.ok) {
    return {
      values: { firstname, lastname, username, age, password, confirmPassword },
      errors: { form: ["Failed to register user"] },
    };
  }
  const result = await res.json();
  cookiesStore.set("accessToken", result.token);
  const decode = jwt.decode(result.token);
  const role = decode?.data?.role;
  if (role === "default") { redirect("/user") }
  redirect("/instructor");
}

//-----------  Add User to Activity -----------//
export async function addUserToActivity(activityId, isUserEnrolled) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const userId = cookiesStore.get("userId")?.value;

  if (!accessToken || !userId) {
    redirect("/login");
  }

  try {
    await joinActivity(userId, activityId, isUserEnrolled, accessToken);
    
    revalidatePath(`/activities/${activityId}`);
    
    return { 
      success: true, 
      message: isUserEnrolled 
      ?  "Successfully left activity" 
      :  "Successfully joined activity" 
    };
  } catch (error) {
    console.log("Network error:", error);
    return {
      success: false,
      message: error.message || "Network error while joining activity"
    }
  } 
}

//---------- Get User by ID -----------////
export async function getUserById() {

  const cookiesStore = await cookies();
  
  if (!cookiesStore.has("userId") || !cookiesStore.has("accessToken")) {
    redirect("/login");
  }

  const userId = cookiesStore.get("userId")?.value;
  const accessToken = cookiesStore.get("accessToken")?.value;

  return fetchUserById(userId, accessToken);
}