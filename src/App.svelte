<script lang="ts">
	import router from 'page';
	import Home from './components/Home.svelte';
	import About from './components/About.svelte';
	import { fade } from 'svelte/transition';
	import { uploadPage } from './stores/journal';

	let page;
	let loading = false;
	export let greet;

	router('/', () => (page = Home));
	router('/about', () => (page = About));

	router.start();
</script>

<nav class="flex gap-8 pr-8 md:pr-16 py-4 bg-gray-50 items-center shadow sticky top-0 z-50">
	<div class="w-0 md:w-8 flex self-center">
		{#if page != Home || !$uploadPage}
			<button
				in:fade
				on:click={() => {
					uploadPage.set(true);
					router('/');
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 self-center pl-2 md:h-10 md:w-10 md:pl-4"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		{/if}
	</div>
	<div in:fade class="text-2xl md:text-4xl flex-none text-black">habits</div>
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
<button on:click={() => console.log(greet.Entry.new().getMinutes())}>Testing</button>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
