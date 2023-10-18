<script lang="ts">
	import type { UserProfile } from '$lib/types';

	export let userProfile: UserProfile;
</script>

<section class="w-full flex flex-col items-center gap-2 py-4 px-6">
	<div
		class="w-28 h-28 rounded-full border-[3px] border-violet-600 flex items-center justify-center"
	>
		{#if userProfile.image}
			<img src={userProfile.image.url} alt="profile" class="w-24 h-24 rounded-full" />
		{:else}
			<img
				width="78"
				height="78"
				src="https://img.icons8.com/color/48/gender-neutral-user.png"
				alt="gender-neutral-user"
			/>
		{/if}
	</div>
	<h2 class="text-3xl font-bold text-gray-700 mt-4">
		{userProfile.firstName}
		{userProfile.lastName}
	</h2>
	<p class="text-gray-600">{userProfile.email}</p>
	<div class="w-5/6 mt-8 flex flex-col gap-5">
		{#if userProfile.links}
			{#each userProfile.links as link}
				<a
					href={link.url}
					target="_blank"
					rel="noreferrer"
					class="flex items-center justify-between px-4 py-4 rounded-xl"
					class:bg-blue-500={link.platform === 'twitter'}
					class:bg-purple-500={link.platform === 'instagram'}
					class:bg-zinc-900={link.platform === 'github'}
					class:bg-white={link.platform === 'frontend-mentor'}
					class:bg-blue-800={link.platform === 'facebook'}
					class:bg-blue-600={link.platform === 'linkedin'}
					class:bg-gray-300={link.platform === 'frontend-mentor'}
				>
					<img src={`/images/icon-${link.platform}.svg`} alt="social" class="h-6" />
					<span class="" class:text-white={link.platform === 'github'}>{link.platform}</span>
					<img src="/images/icon-arrow-right.svg" alt="arrow" />
				</a>
			{/each}
		{/if}
	</div>
</section>
