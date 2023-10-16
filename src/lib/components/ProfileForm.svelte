<script lang="ts">
	import { onDestroy } from 'svelte';
	import { userProfile, fillProfile } from '$lib/stores/userProfile';

	let previewImage: string = '';
	let files: FileList | null = null;

	$: {
		if (files) {
			previewImage = URL.createObjectURL(files[0]);
		} else if ($userProfile?.image) {
			previewImage = $userProfile?.image.url;
		}
	}

	onDestroy(() => {
		if (files) {
			URL.revokeObjectURL(previewImage);
		}
	});

	let firstName: string = $userProfile?.firstName || '';
	let lastName: string = $userProfile?.lastName || '';
	let email: string = $userProfile?.email || '';

	$: {
		fillProfile(firstName, lastName, email);
	}
</script>

<div class="flex-1 flex flex-col gap-2 md:gap-4 h-full">
	<div class="flex flex-col gap-2 md:gap-4">
		<h1 class="text-3xl font-bold">Profile details</h1>
		<p class="text-gray-600">Fill your details to add a personal touch to your profile</p>
	</div>
	<form class="flex flex-col gap-6" method="POST">
		<div class="flex flex-col md:flex-row md:items-center gap-2 bg-gray-100 rounded-lg p-2">
			<label for="profile_pic" class="text-gray-600 md:mr-16">Profile picture</label>
			<label
				class="w-48 h-48 flex items-center justify-center rounded-lg bg-gray-200 cursor-pointer relative"
			>
				{#if !!previewImage}
					<img
						src={previewImage}
						alt="preview"
						class="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
					/>
				{/if}
				<input
					type="file"
					accept="image/*"
					name="profile_pic"
					id="profile_pic"
					bind:files
					class="hidden"
				/>
				<div
					class="w-full h-full rounded-lg flex flex-col items-center justify-center z-10"
					class:hover:bg-black={!!previewImage}
					class:hover:opacity-60={!!previewImage}
				>
					<img src="/images/icon-upload-image.svg" alt="upload" />
					<p class="text-purple-700 font-semibold">+ Upload image</p>
				</div>
			</label>
			<p class="text-gray-600 text-xs w-40">
				Image must be below 1024x1024px. Use PNG or JPG format.
			</p>
		</div>
		<div class="flex flex-col gap-2 bg-gray-100 rounded-lg px-2 py-4">
			<div class="flex flex-col md:flex-row md:gap-6 md:items-center">
				<label for="first_name" class="md:w-1/4">
					<p class="text-sm">First name</p>
				</label>
				<input
					type="text"
					id="first_name"
					name="first_name"
					placeholder="eg. John"
					bind:value={firstName}
					class="h-12 md:flex-1 border border-gray-300 rounded-lg px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-600"
				/>
			</div>
			<div class="flex flex-col md:flex-row md:gap-6 md:items-center">
				<label for="last_name" class="md:w-1/4">
					<p class="text-sm">Last name</p>
				</label>
				<input
					type="text"
					id="last_name"
					name="last_name"
					placeholder="eg. Doe"
					bind:value={lastName}
					class="h-12 md:flex-1 border border-gray-300 rounded-lg px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-600"
				/>
			</div>
			<div class="flex flex-col md:flex-row md:gap-6 md:items-center">
				<label for="email" class="md:w-1/4">
					<p class="text-sm">Email</p>
				</label>
				<div class="relative flex items-center h-12 md:flex-1">
					<img
						src="/images/icon-email.svg"
						alt="email"
						class="absolute left-2 top-1/2 -translate-y-1/2 w-4"
					/>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="eg. johndoe@gmail.com"
						bind:value={email}
						class="h-12 pl-8 flex-1 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-500"
					/>
				</div>
			</div>
		</div>
		<hr class="my-4" />
		<div class="flex items-center justify-end">
			<button
				type="submit"
				class="rounded-lg px-6 py-2 bg-purple-800 text-white font-semibold focus:ring-2 focus:ring-purple-800"
				>Save</button
			>
		</div>
	</form>
</div>
