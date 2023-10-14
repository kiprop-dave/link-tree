<script lang="ts">
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Svg from '$lib/svg.svelte';

	export let data: PageData;
	type Tab = 'links' | 'profile';
	let currentTab: Tab = 'links';

	const switchToProfile = () => {
		currentTab = 'profile';
	};

	const switchToLinks = () => {
		currentTab = 'links';
	};
</script>

<Navbar {currentTab} {switchToProfile} {switchToLinks} />
<div class="mt-6 w-full flex gap-6">
	<aside class="hidden md:flex items-center justify-center p-4 w-1/3 bg-white rounded-lg">
		<Svg />
	</aside>
	<div class="">forms</div>
</div>
