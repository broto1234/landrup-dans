import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getTokens() {
  const store = await cookies();

  return {
    token: store.get("accessToken")?.value,
    userId: store.get("userId")?.value,
  };
}

export async function requireTokens() {
  const { token, userId } = await getTokens();

  if (!token || !userId) {
    redirect("/login");
  }

  return { token, userId };
}