import { desc } from "drizzle-orm";
import { db } from "@/db";
import { doubts } from "@/db/schema";
import { isAdminSession, unauthorized } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/** List all recorded kingdom doubts (leadership session required), newest first. */
export async function GET() {
  if (!(await isAdminSession())) return unauthorized();
  try {
    const rows = await db.select().from(doubts).orderBy(desc(doubts.id));
    return Response.json({ data: rows });
  } catch (err) {
    console.error("GET /api/doubts failed:", err);
    return Response.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}

/** Record a new kingdom doubt from the event guide form. */
export async function POST(req: Request) {
  try {
    const body: unknown = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
    }
    const b = body as Record<string, unknown>;
    const playerName = typeof b.playerName === "string" ? b.playerName.trim() : "";
    const alliance = typeof b.alliance === "string" ? b.alliance.trim() : "";
    const question = typeof b.question === "string" ? b.question.trim() : "";

    if (!playerName || !question) {
      return Response.json(
        { ok: false, error: "missing_fields" },
        { status: 400 },
      );
    }
    if (playerName.length > 80 || alliance.length > 80 || question.length > 800) {
      return Response.json(
        { ok: false, error: "fields_too_long" },
        { status: 400 },
      );
    }

    const [row] = await db
      .insert(doubts)
      .values({
        playerName,
        alliance: alliance || "Unaffiliated",
        question,
      })
      .returning();

    return Response.json({ ok: true, id: row.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/doubts failed:", err);
    return Response.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}
