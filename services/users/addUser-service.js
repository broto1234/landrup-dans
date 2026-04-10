const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function addUserToActivity(userId, activityId, token) {
  const res = await fetch(`${BASE_URL}/api/v1/users/${userId}/activities/${activityId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, activityId }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.message || "Registration failed";
    throw new Error(errorMessage);
  }

  return await res.json();
}