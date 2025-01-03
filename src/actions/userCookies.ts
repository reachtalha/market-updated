'use server';

import { cookies } from 'next/headers';

export async function createUser(data: any) {
  cookies().set('user', JSON.stringify(data), { secure: true });
}

export async function deleteUser() {
  cookies().delete('user');
}
