import { cookies } from "next/headers";

export const ADMIN_COOKIE = "k1330_admin";

/** True when the request carries the leadership session cookie. */
export async function isAdminSession(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === "granted";
}

export function unauthorized() {
  return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
}
