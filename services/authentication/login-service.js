const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export async function login(username, password) {

  const res = await fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }); 
    
    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.message || "Invalid username or password";
      throw new Error(errorMessage);
    }
  
    return await res.json();
}
