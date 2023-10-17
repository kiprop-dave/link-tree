import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server';
import { usersTable, profilesTable, imagesTable } from '$lib/server/schema';
import type { Platform } from '$lib/server/schema';
import { verifyJWT } from '$lib/server/jwt';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const token = cookies.get('auth_token');
	if (!token) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}
	const verifyResult = await verifyJWT(token);
	if (verifyResult.status === 'failed') {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}
	try {
		const body = await request.json();
		const { links, profileId } = body as {
			links: { platform: Platform; url: string }[];
			profileId: number;
		};
		await db
			.update(profilesTable)
			.set({
				links
			})
			.where(eq(profilesTable.id, profileId))
			.returning();

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
			.where(eq(usersTable.id, parseInt(verifyResult.id)))
			.limit(1);
		if (!userProfile.length) {
			return json({ message: 'Unauthorized' }, { status: 401 });
		}
		const data = userProfile[0];
		return json(data);
	} catch (err) {
		console.error('error in POST /api/profile', err);
		return json({ message: 'Internal Server Error' }, { status: 500 });
	}
};
