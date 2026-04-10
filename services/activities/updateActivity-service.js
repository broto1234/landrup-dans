const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function updateActivity(token, id, payload) {

  const res = await fetch(`${BASE_URL}/api/v1/activities/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    if (res.status === 204) return null;

    const text = await res.text();
    if(!text) return null; 
    const json= await JSON.parse(text); 
    return json;
}