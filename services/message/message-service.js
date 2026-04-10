const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function messages(name, email, message) {
  const res = await fetch(`${BASE_URL}/api/v1/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  if (!res.ok) {
    const text = await res.json();
    const errorMessage = text.message || "Failed to send message";
    throw new Error(errorMessage);
  }

  return await res.json();
}