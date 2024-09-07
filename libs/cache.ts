'use server'

import { revalidatePath } from 'next/cache'

export async function invalidateNextCache() {
  revalidatePath('/', 'layout')
}
