<script lang="ts">
	import router from 'page';
	import Home from './components/Home.svelte';
	import About from './components/About.svelte';

	let page;

	router('/', () => (page = Home));
	router('/about', () => (page = About));

	router.start();
</script>

<nav>habits.</nav>
<svelte:component this={page} />

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
