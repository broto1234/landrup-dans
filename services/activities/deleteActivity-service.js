const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

// import { cookies } from "next/headers";
import { requireTokens } from "@/lib/auth";

export async function deleteActivity(id) {

  const { token } = await requireTokens();
  
  const res = await fetch(`${BASE_URL}/api/v1/activities/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // //Handle expired session
  // if (res.status === 401) {
  //   const cookieStore = cookies();

  //   cookieStore.delete("accessToken");
  //   cookieStore.delete("userId");

  //   throw new Error("SESSION_EXPIRED");
  // }

  // if (!res.ok) {
  //   const text = await res.text();
  //   console.error("Delete failed:", text);
  //   throw new Error("Could not delete activity");
  // }
  
  if (!res.ok) {
    const text = await res.text();
    const errorMessage = text || "Could not delete activity";
    console.error("Delete failed:", errorMessage);
  }

  return true;
}