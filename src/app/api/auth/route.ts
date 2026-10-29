import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "6405";
const COOKIE = "k1330_admin";
const SESSION_HOURS = 8;

/** Verify the war council password; on success grants an httpOnly session cookie. */
export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => ({}));
  const b = (body ?? {}) as Record<string, unknown>;
  const password = typeof b.password === "string" ? b.password : "";

  if (password && password === ADMIN_PASSWORD) {
    const store = await cookies();
    store.set(COOKIE, "granted", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_HOURS * 60 * 60,
    });
    return Response.json({ ok: true });
  }
  return Response.json({ ok: false, error: "invalid_password" }, { status: 401 });
}

/** Report whether the current session holds the leadership cookie. */
export async function GET() {
  const store = await cookies();
  return Response.json({ admin: store.get(COOKIE)?.value === "granted" });
}

/** End the leadership session. */
export async function DELETE() {
  const store = await cookies();
  store.delete(COOKIE);
  return Response.json({ ok: true });
}
