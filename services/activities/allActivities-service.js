const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function allActivities() {

  const res = await fetch(`${BASE_URL}/api/v1/activities`, 
    { cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.json();
    const errorMessage = text.message || "Failed to fetch activities";
    throw new Error(errorMessage);
  }

  return await res.json();
}