<script lang="ts">
	import { userProfile } from '../stores/userProfile';
	//import type { Platform } from '$lib/server/schema';
	//type BackgroundText = Record<Platform,{text:string,background:string}>

	$: displayPicture = $userProfile?.image;
	$: firstName = $userProfile?.firstName;
	$: lastName = $userProfile?.lastName;
	$: email = $userProfile?.email;
	$: links = $userProfile?.links;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none" viewBox="0 0 308 632">
	<path
		stroke="#737373"
		d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
	/>
	<path
		fill="#fff"
		stroke="#737373"
		d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
	/>
	{#if displayPicture}
		<circle cx="153.5" cy="112" r="48" fill={displayPicture.url} />
	{:else}
		<circle cx="153.5" cy="112" r="48" fill="#EEE" />
	{/if}
	{#if firstName && lastName}
		<foreignObject width="100%" height="32" x="0" y="185">
			<p class="text-center text-gray-600">{firstName} {lastName}</p>
		</foreignObject>
	{:else}
		<rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
	{/if}
	{#if email}
		<foreignObject width="100%" height="32" x="0" y="214">
			<p class="text-center text-gray-600">{email}</p>
		</foreignObject>
	{:else}
		<rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
	{/if}
	{#if links}
		<foreignObject width="84%" height="100%" x="25" y="248">
			{#each links as link}
				<a href={link.url} target="_blank" rel="noreferrer" class="">
					<div
						class="flex items-center justify-between mb-2 h-10 rounded-md px-2"
						class:bg-blue-500={link.platform === 'twitter'}
						class:bg-purple-500={link.platform === 'instagram'}
						class:bg-zinc-900={link.platform === 'github'}
						class:bg-white={link.platform === 'frontend-mentor'}
						class:bg-blue-800={link.platform === 'facebook'}
						class:bg-blue-600={link.platform === 'linkedin'}
						class:bg-slate-300={link.platform === 'frontend-mentor'}
					>
						{#if link.platform.length > 0}
							<img src={`/images/icon-${link.platform}.svg`} alt={link.platform} class="h-6" />
						{/if}
						<p class:text-white={link.platform === 'github'}>{link.platform}</p>
						<img src="/images/icon-arrow-right.svg" alt="arrow" class="h-6" />
					</div>
				</a>
			{/each}
		</foreignObject>
	{:else}
		<!-- else content here -->
	{/if}
</svg>
