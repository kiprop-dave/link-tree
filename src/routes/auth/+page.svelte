<script lang="ts">
	import type { ActionData } from './$types';
	import { onMount } from 'svelte';

	export let form: ActionData;
	type FormVariant = 'login' | 'register';

	let formVariant: FormVariant = 'login';

	onMount(() => {
		if (form?.register) {
			formVariant = 'register';
		}
	});

	const toggleFormVariant = () => {
		formVariant = formVariant === 'login' ? 'register' : 'login';
	};
</script>

<div class="w-screen h-screen flex items-center justify-center">
	<div class="w-full h-full md:w-2/3 lg:w-1/3 flex flex-col items-center">
		<a href="/" class="mt-4 md:mt-6">
			<img src="/images/logo-devlinks-large.svg" alt="logo" />
		</a>
		<div class="bg-white rounded-2xl w-full mt-12 p-3">
			<div class="">
				{#if formVariant === 'login'}
					<h2 class="text-xl font-bold">Login</h2>
					<p class="text-gray-500">Enter your credentials below</p>
				{:else}
					<h2 class="text-xl font-bold">Create an account</h2>
					<p class="text-gray-500">Let's get you started sharing your links!</p>
				{/if}
			</div>
			<form
				class="mt-4 w-full"
				method="POST"
				action={formVariant === 'login' ? '?/login' : '?/register'}
			>
				<label for="email" class="block text-sm text-gray-800">Email address</label>
				{#if form?.missing}
					<p class="text-red-500 font-bold text-xs">The email field is missing</p>
				{/if}
				<div class="flex items-center w-full relative">
					<img
						src="/images/icon-email.svg"
						alt="mail"
						class="absolute left-2 top-1/2 -translate-y-1/2"
					/>
					<input
						type="email"
						id="email"
						name="email"
						autocomplete="email"
						placeholder="e.g johndoe@gmail.com"
						class="w-full h-12 border border-gray-300 rounded-lg pr-3 pl-8 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
						value={form?.email ?? ''}
					/>
				</div>
				<label for="password" class="block text-sm text-gray-800 mt-4">Password</label>
				{#if form?.badPassword && formVariant === 'register'}
					<p class="text-red-500 font-bold text-xs">
						The password must contain uppercase and lowercase letters, at least 1 number and should
						contain 8 characters
					</p>
				{/if}
				<div class="flex items-center w-full relative">
					<img
						src="/images/icon-password.svg"
						alt="password"
						class="absolute left-2 top-1/2 -translate-y-1/2"
					/>
					<input
						type="password"
						id="password"
						name="password"
						autocomplete="current-password"
						placeholder="min 8 characters"
						class="w-full h-12 border border-gray-300 rounded-lg pr-3 pl-8 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
						value={form?.password ?? ''}
					/>
				</div>
				{#if formVariant === 'register'}
					<label for="confirmPassword" class="block text-sm text-gray-800 mt-4"
						>Confirm Password</label
					>
					{#if form?.mismatch}
						<p class="text-red-500 font-bold text-xs">Make sure the two passwords match</p>
					{/if}
					<div class="flex items-center w-full relative">
						<img
							src="/images/icon-password.svg"
							alt="password"
							class="absolute left-2 top-1/2 -translate-y-1/2"
						/>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							placeholder="min 8 characters"
							class="w-full h-12 border border-gray-300 rounded-lg pr-3 pl-8 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
							value={form?.confirmPassword ?? ''}
						/>
					</div>
				{/if}
				<button
					type="submit"
					class="w-full h-12 bg-blue-500 rounded-lg text-white font-bold mt-6 hover:bg-blue-600"
				>
					{#if formVariant === 'login'}
						Login
					{:else}
						Create a new account
					{/if}
				</button>
				<p class="text-center mt-4 text-gray-500">
					{#if formVariant === 'login'}
						Don't have an account? <button
							type="button"
							class="text-blue-500"
							on:click={toggleFormVariant}>Create account</button
						>
					{:else}
						Already have an account? <button
							type="button"
							class="text-blue-500"
							on:click={toggleFormVariant}>Login</button
						>
					{/if}
				</p>
			</form>
		</div>
	</div>
</div>
