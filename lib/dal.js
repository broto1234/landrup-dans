// Data Access Layer (DAL) for fetching data from the API
// "use server";


//---- Get Newsletter Subscribers -----//
export async function fetchNewsletter(email) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    return {
      values: { email },
      errors: { form: ["Failed to send newsletter subscription"] },
    };
  }

  return await res.json();
  
}

//----- Get All Testimonials -----//
export async function getAllTestimonials() {
  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonials`);
    console.log(res);

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

//------- Login Authentication -------//
// export async function loginAuth(username, password) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     const text = await res.text();
//     if (!text) return null;

//     try {
//       return JSON.parse(text); // returns whatever the backend sent
//     } catch {
//       return null;
//     }
//   } catch (error) {
//     console.log("Network error:", error);
//     return null;
//   }
// }

//-------- Get All Activities --------//
export async function getAllActivities() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/activities`,{
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

//----------- Get Single Activity -----------////
// lib/dal.js
export async function getSingleActivity(id) {
  try {
    if (!id) throw new Error("Activity ID is required");
    if (!/^\d+$/.test(id)) throw new Error("Invalid activity ID");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/activities/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch activity: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("getSingleActivity error:", err);
    throw err;
  }
}
// export async function getSingleActivity(id) {
//   try {
//     if (!id) {
//       throw new Error({message: "Post ID is required"});
//     }

//     if(!/^\d+$/.test(id)) {
//       throw new Error({message: "Post ID must be a numeric string"});
//     }

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/activities/${id}`);
    
//     if(!res.ok){
//         throw new Error({message: res.statusText})
//     }
    
//     return await res.json();

//   } catch (error) {
//     console.log("Network error:", error);
//     return {
//       success: false,
//       message: "Network error while fetching activity"
//     }
//   }    
// }

//---------- Get User by ID -----------////
export async function fetchUserById(userId, accessToken) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.json();
    throw new Error("Failed to fetch user data: " + text);
  }

  return res.json();
}

//----  Join Activity -----//
export async function joinActivity(userId, activityId, isUserEnrolled, token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/activities/${activityId}`,
    {
      method: isUserEnrolled ? "DELETE" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to join activity");
  }
  
  return await res.text();
}

