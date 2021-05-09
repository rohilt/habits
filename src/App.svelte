<script lang="ts">
	import router from 'page';
	import Home from './components/Home.svelte';
	import About from './components/About.svelte';

	let page;

	router('/', () => (page = Home));
	router('/about', () => (page = About));

	router.start();
</script>

<nav class="flex gap-8 md:px-16 md:pt-2">
	<a href="/" class="text-xl md:text-4xl flex-grow text-black">habits</a>
	<a href="/about" class="flex-none">about</a>
	<a href="https://github.com/rohilt/habits" target="_blank" class="flex-none">source</a>
</nav>
<svelte:component this={page} />

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
