import { writable } from 'svelte/store';
import type { UserProfile } from '$lib/types';
import type { Platform } from '$lib/server/schema';

export const userProfile = writable<(UserProfile & { hasChanged: boolean }) | null>(null);

export const addLink = (platform: Platform | '', url: string) => {
	userProfile.update((userProfile) => {
		if (!userProfile) {
			return null;
		}
		return {
			...userProfile,
			hasChanged: true,
			links: [...(userProfile.links || []), { platform, url }]
		};
	});
};

export const fillLink = (index: number, platform: Platform | '', url: string) => {
	userProfile.update((userProfile) => {
		if (!userProfile) {
			return null;
		}
		return {
			...userProfile,
			links: (userProfile.links || []).map((link, i) => {
				if (i === index) {
					return { platform, url };
				}
				return link;
			})
		};
	});
};

export const removeLink = (index: number) => {
	userProfile.update((userProfile) => {
		if (!userProfile) {
			return null;
		}
		return {
			...userProfile,
			links: (userProfile.links || []).filter((_, i) => i !== index),
			hasChanged: true
		};
	});
};

export const fillProfile = (firstName: string, lastName: string, email: string) => {
	userProfile.update((userProfile) => {
		if (!userProfile) {
			return null;
		}
		return {
			...userProfile,
			hasChanged: true,
			firstName,
			lastName,
			email
		};
	});
};

type SaveLinksResult = ({ data: UserProfile } & { status: 'success' }) | { status: 'failed' };

export const saveLinks = async (
	profileId: number,
	links: { platform: Platform; url: string }[]
): Promise<SaveLinksResult> => {
	try {
		const res = await fetch('/api/profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				profileId,
				links
			})
		});
		const data = (await res.json()) as UserProfile;
		return { status: 'success', data };
	} catch (err) {
		console.error(err);
		return { status: 'failed' };
	}
};

export const reorderLinks = (linkOneIndex: number, linkTwoIndex: number) => {
	userProfile.update((userProfile) => {
		if (!userProfile) {
			return null;
		}
		const links = userProfile.links ? [...userProfile.links] : null;
		if (!links) {
			return {
				...userProfile
			};
		}
		[[links[linkOneIndex], links[linkTwoIndex]]] = [[links[linkTwoIndex], links[linkOneIndex]]];
		return {
			...userProfile,
			links,
			hasChanged: true
		};
	});
};
