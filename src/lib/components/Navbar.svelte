<script lang="ts">
	export let switchToProfile: () => void;
	export let switchToLinks: () => void;
	export let currentTab: 'links' | 'profile';
</script>

<nav class="flex items-center justify-between w-full px-2 py-4 md:px-4 bg-white rounded-lg">
	<a href="/">
		<img src="/images/logo-devlinks-large.svg" alt="logo" class="h-8 hidden md:block" />
		<img src="/images/logo-devlinks-small.svg" alt="logo" class="h-8 md:hidden" />
	</a>
	<div class="flex items-center">
		<button
			type="button"
			class="flex items-center px-4 py-3 rounded-lg hover:text-purple-800"
			class:bg-gray-200={currentTab === 'links'}
			class:text-purple-800={currentTab === 'links'}
			class:text-gray-500={currentTab === 'profile'}
			on:click={switchToLinks}
		>
			<img src="/images/icon-link.svg" alt="links" class="h-6" />
			<span class="ml-2 font-semibold hidden md:block">Links</span>
		</button>
		<button
			class="flex items-center px-4 py-3 rounded-lg hover:text-purple-800"
			class:text-gray-500={currentTab === 'links'}
			class:bg-gray-200={currentTab === 'profile'}
			class:text-purple-800={currentTab === 'profile'}
			on:click={switchToProfile}
		>
			<img src="/images/icon-profile-details-header.svg" alt="profile" class="h-6" />
			<span class="ml-2 font-semibold hidden md:block">Profile Details</span>
		</button>
	</div>
	<a href="/preview">
		<button
			class="rounded-lg px-6 py-3 hover:bg-gray-200 border border-purple-800 text-purple-800 font-semibold"
		>
			Preview
		</button>
	</a>
</nav>
