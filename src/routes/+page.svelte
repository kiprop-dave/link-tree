<script lang="ts">
	import type { PageData } from './$types';
	import { userProfile } from '$lib/stores/userProfile';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import PhoneSvg from '$lib/components/PhoneSvg.svelte';
	import LinkForm from '$lib/components/LinkForm.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';

	export let data: PageData;
	onMount(() => {
		userProfile.set({ ...data.data });
	});

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
	<aside class="hidden md:flex items-center justify-center p-4 w-[40%] bg-white rounded-lg">
		<PhoneSvg />
	</aside>
	<div class="flex-1 bg-white rounded-lg pt-6 px-4">
		{#if currentTab === 'links'}
			<LinkForm />
		{/if}
		{#if currentTab === 'profile'}
			<ProfileForm />
		{/if}
	</div>
</div>
