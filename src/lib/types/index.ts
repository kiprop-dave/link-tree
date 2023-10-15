import type { Platform } from '$lib/server/schema';

export type UserProfile = {
	userId: number;
	email: string;
	profileId: number | null;
	firstName: string | null;
	lastName: string | null;
	links: { platform: Platform | ''; url: string }[] | null;
	image: { id: string; url: string } | null;
};
