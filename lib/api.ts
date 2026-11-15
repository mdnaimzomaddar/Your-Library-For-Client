import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // লগইন করা থাকলে টোকেন নিয়ে হেডারে বসাও
  const { data } = await authClient.token();
  if (data?.token) {
    headers["Authorization"] = `Bearer ${data.token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(json?.message || "কিছু একটা ভুল হয়েছে");
  }
  return json;
}