<script lang="ts">
	import { userProfile, addLink } from '$lib/stores/userProfile';
	import type { Platform } from '$lib/server/schema';
	import CreateLink from './CreateLink.svelte';

	let remainingLinks: Platform[] = [
		'instagram',
		'facebook',
		'frontend-mentor',
		'twitter',
		'github'
	];

	// $: {
	// 	console.log($userProfile?.links);
	// 	if ($userProfile && $userProfile.links) {
	// 		remainingLinks = remainingLinks.filter((platform) => {
	// 			return !$userProfile?.links?.map((link) => link.platform).includes(platform);
	// 		});
	// 	}
	// }

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
			class="rounded-lg px-6 py-2 bg-purple-800 text-white font-semibold disabled:bg-purple-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-purple-800"
		>
			Save
		</button>
	</div>
</div>
