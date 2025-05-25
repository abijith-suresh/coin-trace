import { sql } from "drizzle-orm";
import {
    decimal,
    pgTable,
    text,
    timestamp
} from "drizzle-orm/pg-core";

export const userCryptocurrencies = pgTable('user_cryptocurrencies', {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  amount: decimal("amount", { precision: 18, scale: 8 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Types
export type UserCryptocurrency = typeof userCryptocurrencies.$inferSelect;
export type NewUserCryptocurrency = typeof userCryptocurrencies.$inferInsert;