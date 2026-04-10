const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function activityById(id) {

  const res = await fetch(`${BASE_URL}/api/v1/activities/${id}`, 
    { cache: "no-store" }
  );

  if (!res.ok) {
    const data = await res.json();
    const errorMessage = data.message || "Failed to fetch activities";
    throw new Error(errorMessage);
  }

  return await res.json();
}