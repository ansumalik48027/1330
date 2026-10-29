import { eq } from "drizzle-orm";
import { db } from "@/db";
import { doubts } from "@/db/schema";
import { isAdminSession, unauthorized } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Leadership updates a doubt: status (open/answered) and/or official answer. */
export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await isAdminSession())) return unauthorized();
  try {
    const { id } = await ctx.params;
    const num = Number(id);
    if (!Number.isInteger(num) || num <= 0) {
      return Response.json({ ok: false, error: "not_found" }, { status: 404 });
    }

    const body: unknown = await req.json().catch(() => ({}));
    const b = (body ?? {}) as Record<string, unknown>;

    const patch: { status?: string; answer?: string | null } = {};
    if (
      typeof b.status === "string" &&
      (b.status === "open" || b.status === "answered")
    ) {
      patch.status = b.status;
    }
    if (typeof b.answer === "string") {
      patch.answer = b.answer.trim() || null;
    }
    if (Object.keys(patch).length === 0) {
      return Response.json(
        { ok: false, error: "nothing_to_update" },
        { status: 400 },
      );
    }

    await db.update(doubts).set(patch).where(eq(doubts.id, num));
    return Response.json({ ok: true });
  } catch (err) {
    console.error("PATCH /api/doubts/[id] failed:", err);
    return Response.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}

/** Remove a doubt from the record. */
export async function DELETE(_req: Request, ctx: Ctx) {
  if (!(await isAdminSession())) return unauthorized();
  try {
    const { id } = await ctx.params;
    const num = Number(id);
    if (!Number.isInteger(num) || num <= 0) {
      return Response.json({ ok: false, error: "not_found" }, { status: 404 });
    }
    await db.delete(doubts).where(eq(doubts.id, num));
    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/doubts/[id] failed:", err);
    return Response.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}
