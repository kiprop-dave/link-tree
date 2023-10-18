<script lang="ts">
	import type { PageData } from '../$types';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	export let data: PageData;
</script>

<ProfileCard userProfile={data.data} />
