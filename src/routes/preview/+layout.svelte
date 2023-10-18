<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { LayoutData } from '../$types';
	import { page } from '$app/stores';

	export let data: LayoutData & { layoutData: { path: string; origin: string } }; // Not automatically inferred

	$: userId = $page.data.data.userId as string;

	let hasCopied = false;
	let timeout: ReturnType<typeof setTimeout>;

	const copyLink = () => {
		navigator.clipboard.writeText(data.layoutData.origin + '/preview/' + userId);
		hasCopied = true;
		timeout = setTimeout(() => {
			hasCopied = false;
		}, 2000);
	};

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<main class="h-[calc(100dvh+30dvh)]">
	<div
		class="h-auto md:h-[55dvh] w-[100dvw] md:rounded-b-3xl md:bg-violet-600 px-2 py-4 md:p-6 md:relative"
	>
		<nav class="w-full md:bg-white md:p-4 rounded-xl flex items-center justify-between gap-4">
			<a
				href="/"
				class="flex-1 md:flex-none flex items-center justify-center px-7 py-3 border border-violet-600 rounded-lg text-violet-600 font-semibold hover:bg-gray-200"
			>
				{#if data.layoutData.path === '/preview'}
					Back to editor
				{:else}
					Make your link tree
				{/if}
			</a>
			<button
				type="button"
				class="bg-violet-600 text-white flex-1 md:flex-none rounded-lg px-7 py-3 font-semibold flex items-center justify-center"
				on:click={copyLink}
			>
				{#if hasCopied}
					<p class="text-green-500">Link copied!</p>
				{:else}
					Share link
				{/if}
			</button>
		</nav>
		<div
			class="md:absolute md:left-0 md:right-0 md:mx-auto md:top-1/2 w-full md:w-1/3 md:bg-white md:rounded-lg md:shadow-lg md:shadow-violet-200"
		>
			<slot />
		</div>
	</div>
</main>
