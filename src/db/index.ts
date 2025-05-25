import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';

export const db = drizzle(sql, { schema });

// Helper functions for database operations
export async function getUserCryptocurrencies(userId: string) {
  return await db.query.userCryptocurrencies.findMany({
    where: (cryptocurrencies, { eq }) => eq(cryptocurrencies.userId, userId),
  });
}

export async function addUserCryptocurrency(data: schema.NewUserCryptocurrency) {
  return await db.insert(schema.userCryptocurrencies).values(data).returning();
}

export async function updateUserCryptocurrency(id: string, data: Partial<schema.NewUserCryptocurrency>) {
  return await db
    .update(schema.userCryptocurrencies)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(schema.userCryptocurrencies.id, id))
    .returning();
}

export async function deleteUserCryptocurrency(id: string) {
  return await db
    .delete(schema.userCryptocurrencies)
    .where(eq(schema.userCryptocurrencies.id, id))
    .returning();
}