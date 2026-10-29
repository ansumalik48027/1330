import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Kingdom doubt submissions collected from the KvK Event Guide.
 * Leadership reviews them on the /admin review board and can record
 * an official answer plus an open/answered status.
 */
export const doubts = pgTable("doubts", {
  id: serial("id").primaryKey(),
  playerName: text("player_name").notNull(),
  alliance: text("alliance").notNull().default("Unaffiliated"),
  question: text("question").notNull(),
  status: text("status").notNull().default("open"),
  answer: text("answer"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type DoubtRow = typeof doubts.$inferSelect;
export type DoubtInsert = typeof doubts.$inferInsert;
