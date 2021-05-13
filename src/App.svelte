<script lang="ts">
	import router from 'page';
	import Home from './components/Home.svelte';
	import About from './components/About.svelte';
	import { fade } from 'svelte/transition';
	import { uploadPage } from './stores/journal';

	let page;
	let loading = false;

	router('/', () => (page = Home));
	router('/about', () => (page = About));

	router.start();
</script>

<nav class="flex gap-8 px-8 md:px-16 py-4 bg-gray-50 items-center shadow sticky top-0 z-50">
	{#if $uploadPage || page != Home}
		<a in:fade href="/" class="text-4xl flex-none text-black">habits</a>
	{:else}
		<button in:fade on:click={() => uploadPage.set(true)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		<a in:fade href="/" class="hidden md:block text-4xl flex-none text-black">habits</a>
	{/if}
	{#if loading}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="animate-spin h-5 w-5"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
				clip-rule="evenodd"
			/>
		</svg>
	{/if}
	<div class="flex-grow" />
	<a href="/about" class="flex-none">about</a>
	<a href="https://github.com/rohilt/habits" target="_blank" class="flex-none">source</a>
</nav>
<svelte:component this={page} on:loading={(l) => (loading = l.detail.status)} />

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
