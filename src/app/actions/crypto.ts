'use server';

import {
    addUserCryptocurrency,
    deleteUserCryptocurrency,
    getUserCryptocurrencies,
    updateUserCryptocurrency
} from '@/db';
import { NewUserCryptocurrency } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

export async function addCrypto(data: Omit<NewUserCryptocurrency, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const crypto = await addUserCryptocurrency({
    ...data,
    id: nanoid(),
    userId,
  });

  revalidatePath('/dashboard');
  return crypto;
}

export async function getCryptos() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  return getUserCryptocurrencies(userId);
}

export async function updateCrypto(id: string, data: Partial<NewUserCryptocurrency>) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const crypto = await updateUserCryptocurrency(id, data);
  revalidatePath('/dashboard');
  return crypto;
}

export async function deleteCrypto(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const crypto = await deleteUserCryptocurrency(id);
  revalidatePath('/dashboard');
  return crypto;
}