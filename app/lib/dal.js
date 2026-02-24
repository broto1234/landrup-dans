// Data Access Layer (DAL) for fetching data from the API
"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

//----- Get All Testimonials -----//
export async function getAllTestimonials() {
  try {
    
    const res = await fetch(`${process.env.API_URL}/api/v1/testimonials`);
    // console.log(res);

    if(!res.ok){
        throw new Error({message: res.statusText})
    }
    
    return await res.json();

  } catch (error) {
    console.log("Network error:", error);
    return {
      success: false,
      message: "Network error while fetching testimonials"
    }
  }    
}

//-------- Get All Activities --------//
export async function getAllActivities() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/activities`,{
      cache: "no-store"
    });
    // console.log(res);
    
    if(!res.ok){
        throw new Error({message: res.statusText})
    }
    
    return await res.json();

  } catch (error) {
    console.log("Network error:", error);
    return {
      success: false,
      message: "Network error while fetching activities"
    }
  }    
}

// Get Single Activity
export async function getSingleActivity(id) {
  try {
    if (!id) {
      throw new Error({message: "Post ID is required"});
    }

    if(!/^\d+$/.test(id)) {
      throw new Error({message: "Post ID must be a numeric string"});
    }

    const res = await fetch(`${process.env.API_URL}/api/v1/activities/${id}`);
    
    if(!res.ok){
        throw new Error({message: res.statusText})
    }
    
    return await res.json();

  } catch (error) {
    console.log("Network error:", error);
    return {
      success: false,
      message: "Network error while fetching activity"
    }
  }    
}

//----  Add User to Activity -----//
export async function addUserToActivity(activityId) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/login");
  }
  const user = jwt.decode(accessToken).data;
  const userId = user.id;
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/users/${userId}/activities/${activityId}`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || res.statusText);
    }
      const result = await res.json();
      console.log("Join activity response:", result);
      revalidatePath("/user");
      return { success: true, message: "Successfully joined activity" };
  } catch (error) {
    console.log("Network error:", error);
    return {
      success: false,
      message: "Network error while joining activity"
    }
  } 
}