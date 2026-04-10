"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { newsletterSchema, formSchema, loginSchema, registerSchema } from "@/schemas/schemas";
import { newsLetter  } from "@/services/newsletter/newsletter-service";
import { messages  } from "@/services/message/message-service";
import { registerUser  } from "@/services/users/registerUser-service";
import { login  } from "@/services/authentication/login-service";

//------- Newsletter -------//
export async function newsletterData( prevState, formData ) {
  const email = formData.get("email");
  console.log("prevState...:", prevState);

  if ( prevState?.values && 
        email === prevState.values.email ) {
    return prevState;
  }

  const emailParse = newsletterSchema.safeParse({ email });
  
  if (!emailParse.success) {
    return {
      values: { email },
      errors: z.flattenError(emailParse.error).fieldErrors,
    };
  }

  try {
    await newsLetter(email);
    return {
      values: { email: "" },
      errors: {},
      success: true,
    };
  } catch (err) {
    return {
      values: { email },
      errors: {
        form: err.message || "Failed to subscribe",
      },
    };
  }
}

//-------- Contact/message ------//
export async function messageData( prevState, formData ) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  console.log("prevState...:", prevState);

  if ( prevState?.values && 
      name === prevState.values.name && 
      email === prevState.values.email && 
      message === prevState.values.message) {
    return prevState;
  }

  const validationResult = formSchema.safeParse({ name, email, message });
  
  if (!validationResult.success) {
    return {
      values: { name, email, message },
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }
  try {
    await messages(name, email, message);
    return {
      values: { name: "", email: "", message: "" },
      errors: {},
      success: true,
    };
  } catch (err) {
    return {
      values: { name, email, message },
      errors: {
        form: err.message || "Failed to send message",
      },
    };
  }
}

//----------- Login -------------//
export async function loginData( prevState, formData ) {
  
  const username = formData.get("username");
  const password = formData.get("password");
  
  if ( prevState?.values && 
    username === prevState.values.username && 
    password === prevState.values.password) {
      return prevState;
  }
    
  const validationResult = loginSchema.safeParse({ username, password });
    
  if (!validationResult.success) {
    return {
      values: { username, password },
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }

  let result;
    
  try {
    result = await login(username, password);
    // Set cookies
    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", result.token);
    cookiesStore.set("userId", result.userId);
  }catch (error) {
    return {
      values: { username, password },
      errors: { form: [error.message || "Login failed"] },
    };
  }
  // Redirect based on role
    if (result.role === "default") {
      redirect("/user");
    }
    redirect("/instructor");
}

//----------- Register ------------ //
export async function registerData( prevState, formData ) {

  const data = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    username: formData.get("username"),
    age: formData.get("age"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  if ( prevState?.values && 
        data.firstname === prevState.values.firstname && 
        data.lastname === prevState.values.lastname &&
        data.username === prevState.values.username &&
        data.age === prevState.values.age &&
        data.password === prevState.values.password &&
        data.confirmPassword === prevState.values.confirmPassword
      ) {
    return prevState;
  }
  
  const validationResult = registerSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      values: data,
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }
  try {
    await registerUser(data);
  } catch (error) {
    return {
      values: data,
      errors: { form: error.message},
    };
  }
  redirect("/login");
}

//----------- Logout ------------- //
export default async function LogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("userId");

  return redirect("/");
}
