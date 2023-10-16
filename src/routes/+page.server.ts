import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { eq } from 'drizzle-orm';
import { verifyJWT } from '$lib/server/jwt';
import { db } from '$lib/server';
import { usersTable, profilesTable, imagesTable } from '$lib/server/schema';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('auth_token');
	if (!token) {
		throw redirect(301, '/auth');
	}
	const verifyResult = await verifyJWT(token);
	if (verifyResult.status === 'failed') {
		throw redirect(301, '/auth');
	}

	const userProfile = await db
		.select({
			userId: usersTable.id,
			email: usersTable.email,
			profileId: profilesTable.id,
			firstName: profilesTable.firstName,
			lastName: profilesTable.lastName,
			links: profilesTable.links,
			image: {
				id: imagesTable.asset_id,
				url: imagesTable.secure_url
			}
		})
		.from(usersTable)
		.leftJoin(profilesTable, eq(usersTable.id, profilesTable.id))
		.leftJoin(imagesTable, eq(profilesTable.id, imagesTable.id))
		.where(eq(usersTable.id, parseInt(verifyResult.id)))
		.limit(1);
	if (!userProfile[0]) {
		throw redirect(301, '/auth');
	}
	const data = userProfile[0];
	return { data };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const firstName = data.get('first_name');
		const lastName = data.get('last_name');
		const email = data.get('email');
		const profilePic = data.get('profile_pic');
		console.log(firstName, lastName, email, profilePic);
	}
} satisfies Actions;
