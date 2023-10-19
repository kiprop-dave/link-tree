import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server';
import { usersTable, profilesTable, imagesTable } from '$lib/server/schema';

export const load: PageServerLoad = async ({ url }) => {
	const userId = url.pathname.split('/')[2];
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
		.leftJoin(profilesTable, eq(usersTable.profileId, profilesTable.id))
		.leftJoin(imagesTable, eq(profilesTable.imageId, imagesTable.id))
		.where(eq(usersTable.id, parseInt(userId)))
		.limit(1);
	if (!userProfile.length) {
		throw redirect(301, '/auth');
	}
	const data = userProfile[0];
	return { data };
};
