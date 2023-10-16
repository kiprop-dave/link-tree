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
			links: (userProfile.links || []).filter((_, i) => i !== index)
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
