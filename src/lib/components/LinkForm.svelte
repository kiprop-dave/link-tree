<script lang="ts">
	import { userProfile, addLink, saveLinks } from '$lib/stores/userProfile';
	import type { Platform } from '$lib/server/schema';
	import CreateLink from './CreateLink.svelte';
	import Spinner from './Spinner.svelte';

	let remainingLinks: Platform[] = [
		'instagram',
		'facebook',
		'frontend-mentor',
		'twitter',
		'github'
	];

	let loading = false;

	const addNewLink = () => {
		if (remainingLinks.length > 0) {
			if (
				$userProfile?.links === null ||
				($userProfile && $userProfile?.links?.length < remainingLinks.length)
			) {
				addLink('', '');
			}
		}
	};

	const save = () => {
		if ($userProfile?.links && $userProfile?.profileId) {
			loading = true;
			const links = $userProfile.links as { platform: Platform; url: string }[];
			saveLinks($userProfile.profileId, links)
				.then((result) => {
					if (result.status === 'success') {
						userProfile.set({ ...result.data, hasChanged: false });
					}
				})
				.finally(() => {
					setTimeout(() => {
						loading = false;
					}, 2000);
				});
		}
	};
</script>

<div class="flex-1 flex flex-col gap-2 md:gap-4 h-full">
	<h1 class="text-3xl font-bold">Customize your links</h1>
	<p class="text-gray-600">
		Add/edit/remove/reorder links below and share your profile with the world!
	</p>
	<button
		type="button"
		class="w-full flex items-center justify-center border border-purple-800 py-2 rounded-lg text-purple-800 font-semibold hover:bg-gray-200"
		on:click={addNewLink}
	>
		+ Add new Link
	</button>
	<div class="h-[calc(100vh-120px)] flex flex-col gap-2 rounded-lg overflow-y-scroll no-scrollbar">
		{#if !$userProfile?.links || $userProfile.links.length === 0}
			<div class="flex flex-col items-center bg-gray-100 justify-center gap-2 h-full">
				<img src="/images/illustration-empty.svg" alt="links" class="" />
				<h1 class="text-3xl font-semibold">Let's get you started</h1>
				<p class="text-gray-600 text-center w-3/4">
					Use the “Add new link” button to get started. Once you have more than one link, you can
					reorder and edit them. We're here to help you share your profiles with everyone!
				</p>
			</div>
		{:else}
			{#each $userProfile.links as link, index}
				<CreateLink {remainingLinks} {index} {link} />
			{/each}
		{/if}
	</div>
	<hr class="" />
	<div class="flex items-center justify-end">
		<button
			type="button"
			disabled={!$userProfile?.hasChanged || loading}
			on:click={save}
			class="rounded-lg px-6 py-2 text-white font-semibold focus:ring-2 focus:ring-purple-800"
			class:cursor-not-allowed={!$userProfile?.hasChanged || loading}
			class:bg-purple-300={!$userProfile?.hasChanged && !loading}
			class:bg-purple-800={$userProfile?.hasChanged || loading}
		>
			{#if loading}
				<Spinner />
			{:else}
				Save
			{/if}
		</button>
	</div>
</div>
