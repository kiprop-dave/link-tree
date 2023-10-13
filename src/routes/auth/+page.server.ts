import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { eq } from 'drizzle-orm';
import { hash, compare } from 'bcrypt';
import { db } from '$lib/server';
import { usersTable } from '$lib/server/schema';

export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    if (!email) {
      return fail(400, { email, missing: true })
    }
    if (email?.toString()?.length < 1) {
      return fail(400, { email, missing: true });
    }

    if (!password) {
      return fail(400, { password, missing: true })
    }
    const user = await db.select({
      email: usersTable.email,
      id: usersTable.id,
      password: usersTable.password
    }).from(usersTable).where(eq(usersTable.email, email.toString())).limit(1);

    if (user.length === 0) {
      return fail(401, { email, unregistered: true, register: true })
    }
    const correctPassword = await compare(password.toString(), user[0].password)
    if (!correctPassword) {
      return fail(401, { email, invalid: true })
    }
    cookies.set("auth_token", "jfdfdfdfd", { sameSite: "strict", maxAge: 120 });
    throw redirect(303, '/');
  },
  register: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get("confirmPassword");
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!email || !emailRegex.test(email.toString())) {
      return fail(400, { email, invalid: true, register: true })
    }
    if (!password || !passwordRegex.test(password.toString())) {
      console.log(password)
      return fail(400, { password, email, badPassword: true, register: true })
    }
    if (!confirmPassword || confirmPassword.toString() !== password.toString()) {
      return fail(400, { confirmPassword, password, email, mismatch: true, register: true })
    }

    const passwordHash = await hash(password.toString(), 10);
    const newUser = await db.insert(usersTable).values({
      email: email.toString(),
      password: passwordHash
    })
    throw redirect(303, '/');
  }
} satisfies Actions;
