const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function addActivity(token, payload) {
  const res = await fetch(`${BASE_URL}/api/v1/activities`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    const text = await res.text();
    console.log("Response:", res.status, text);
    // console.log("status:", res.status);
    // console.log("redirected:", res.redirected);
    // console.log("url:", res.url);

    if (!res.ok) {
    const text = await res.text();
    const errorMessage = text || "Failed to add activity";
    throw new Error(errorMessage);
    }
    return JSON.parse(text);
}