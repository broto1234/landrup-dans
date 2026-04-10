const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function registerUser( data ) {
  const res = await fetch(`${BASE_URL}/api/v1/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        age: data.age,
        password: data.password,
        role: "default",
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.message || "Failed to register user";
      throw new Error(errorMessage);
    }
    return await res.json();
}