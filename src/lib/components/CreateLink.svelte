<script lang="ts">
	import type { Platform } from '$lib/server/schema';
	import { fillLink, removeLink } from '$lib/stores/userProfile';

	type Link = {
		platform: Platform | '';
		url: string;
	};

	export let remainingLinks: Platform[];
	export let index: number;
	export let link: Link;

	let selectedPlatform: Platform | '' = link.platform;
	let url: string = link.url;
	let timer: ReturnType<typeof setTimeout>;

	const debounce = (evt: Event) => {
		const v = (evt.target as HTMLInputElement).value;
		clearTimeout(timer);
		timer = setTimeout(() => {
			url = v;
		}, 500);
	};

	$: {
		fillLink(index, selectedPlatform, url);
	}
</script>

<div class="flex flex-col gap-4 bg-gray-100 px-2 py-4 rounded-lg">
	<div class="rounded-lg flex items-center justify-between">
		<p class="flex items-center gap-2 text-gray-600 font-semibold">
			<span class="cursor-pointer">
				<img src="/images/icon-drag-and-drop.svg" alt="drag and drop" />
			</span>
			<span class="pointer-events-none">
				Link #{index + 1}
			</span>
		</p>
		<button class="flex items-center gap-2 text-gray-600" on:click={() => removeLink(index)}>
			Remove
		</button>
	</div>
	<form class="flex flex-col gap-2">
		<label for="platform" class="block text-sm text-gray-600">Platform</label>
		<select
			id="platform"
			name="platform"
			class="w-full bg-white h-12 border border-gray-300 text-gray-600 rounded-lg pr-3 pl-8 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
			bind:value={selectedPlatform}
		>
			<option value="">Select platform</option>
			{#each remainingLinks as platform}
				<option value={platform}>{platform[0].toUpperCase() + platform.slice(1)}</option>
			{/each}
		</select>
		<label for="link" class="block text-sm text-gray-600">Link</label>
		<div class="relative w-full h-12 flex items-center gap-2">
			<img
				src="/images/icon-link.svg"
				alt="link"
				class="h-5 w-5 absolute left-2 top-1/2 -translate-y-1/2"
			/>
			<input
				type="text"
				id="link"
				name="link"
				class="w-full h-12 text-gray-600 border border-gray-300 rounded-lg pr-3 pl-8 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-600"
				on:input={(evt) => debounce(evt)}
				placeholder="https://www.example.com"
				bind:value={url}
			/>
		</div>
	</form>
</div>
