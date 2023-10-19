import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import { hash, compare } from 'bcrypt';
import { db } from '$lib/server';
import { profilesTable, usersTable } from '$lib/server/schema';
import { createJWT, verifyJWT } from '$lib/server/jwt';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('auth_token');
	if (token) {
		const validTokenResult = await verifyJWT(token);
		if (validTokenResult.status === 'success') {
			throw redirect(303, '/');
		}
	}
};

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		if (!email) {
			return fail(400, { email, missing: true });
		}
		if (email?.toString()?.length < 1) {
			return fail(400, { email, missing: true });
		}

		if (!password) {
			return fail(400, { password, missing: true });
		}
		const user = await db
			.select({
				email: usersTable.email,
				id: usersTable.id,
				password: usersTable.password
			})
			.from(usersTable)
			.where(eq(usersTable.email, email.toString()))
			.limit(1);

		if (user.length === 0) {
			return fail(401, { email, unregistered: true, register: true });
		}
		const correctPassword = await compare(password.toString(), user[0].password);
		if (!correctPassword) {
			return fail(401, { email, invalid: true });
		}
		const token = await createJWT({ id: user[0].id.toString(), email: user[0].email });
		cookies.set('auth_token', token, { sameSite: 'strict', maxAge: 86400 });
		throw redirect(303, '/');
	},
	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const confirmPassword = data.get('confirmPassword');
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		if (!email || !emailRegex.test(email.toString())) {
			return fail(400, { email, invalid: true, register: true });
		}
		if (!password || !passwordRegex.test(password.toString())) {
			return fail(400, { password, email, badPassword: true, register: true });
		}
		if (!confirmPassword || confirmPassword.toString() !== password.toString()) {
			return fail(400, { confirmPassword, password, email, mismatch: true, register: true });
		}
		const passwordHash = await hash(password.toString(), 10);
		const newProfille = await db
			.insert(profilesTable)
			.values({})
			.returning({ insertedId: profilesTable.id });
		const newUser = await db
			.insert(usersTable)
			.values({
				email: email.toString(),
				password: passwordHash,
				profileId: newProfille[0].insertedId
			})
			.returning({ insertedId: usersTable.id });

		const token = await createJWT({
			id: newUser[0].insertedId.toString(),
			email: email.toString()
		});
		cookies.set('auth_token', token, { sameSite: 'strict', maxAge: 86400 });
		throw redirect(303, '/');
	}
} satisfies Actions;
