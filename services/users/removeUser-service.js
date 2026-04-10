const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function deleteUserFromActivity(userId, activityId, token) {
  const res = await fetch(`${BASE_URL}/api/v1/users/${userId}/activities/${activityId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.message || "Could not delete activity";
    throw new Error(errorMessage);
  }

  return true;
}