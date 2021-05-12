<script lang="ts">
	import type { Journal, ParseError } from '../parser/parser.types';
	import { createEventDispatcher } from 'svelte';
	import OverviewChart from './OverviewChart.svelte';

	export let maybeJournal: Journal | ParseError;

	const dispatch = createEventDispatcher();

	let timeView = 'today';
</script>

<div class="flex flex-col items-center w-full items-stretch gap-4">
	<button on:click={() => dispatch('fileUpload', {})}>(return to file upload)</button>
	{#if maybeJournal.parseType == 'journal'}
		<div class="flex divide-x items-stretch md:w-1/2 md:self-center">
			<button
				class="flex-1 p-2 ring-gray-200"
				class:underline={timeView == 'today'}
				on:click={() => (timeView = 'today')}>today</button
			>
			<button
				class="flex-1 p-2 ring-gray-200"
				class:underline={timeView == 'this week'}
				on:click={() => (timeView = 'this week')}>this week</button
			>
			<button
				class="flex-1 p-2 ring-gray-200"
				class:underline={timeView == 'this month'}
				on:click={() => (timeView = 'this month')}>this month</button
			>
			<button
				class="flex-1 p-2 ring-gray-200"
				class:underline={timeView == 'all time'}
				on:click={() => (timeView = 'all time')}>all time</button
			>
		</div>
		<div class="md:grid md:grid-cols-2 gap-16">
			<OverviewChart />
			<div class="flex flex-wrap gap-4 justify-items-center">
				{#each maybeJournal.entries as journalEntry}
					<div class="bg-gray-100 bg-opacity-50 rounded-xl p-8 ring ring-gray-100 shadow">
						<div class="text-indigo-600 text-center font-italic">
							{journalEntry.date.toISOString().slice(0, 10)}
						</div>
						<br />
						<div class="text-2xl text-uppercase font-bold">{journalEntry.activity}</div>
						<ul class="list-disc list-inside">
							{#each Object.keys(journalEntry) as k}
								<li>{k}: {journalEntry[k]}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div>
			Oh no!
			<br />
			<p>parse error: {maybeJournal.error}</p>
			<br />
			<p>error at {maybeJournal.activity}, {maybeJournal.date}</p>
		</div>
	{/if}
</div>
