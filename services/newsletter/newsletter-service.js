const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function newsLetter(email) {
  const res = await fetch(`${BASE_URL}/api/v1/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Subscription failed");
  }

  return await res.json();  
}