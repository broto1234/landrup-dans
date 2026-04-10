const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function userById(userId, accessToken) {
  
  const res = await fetch(`${BASE_URL}/api/v1/users/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed: ${res.status} - ${text}` || "Failed to fetch user");
  }

  return await res.json();
}
