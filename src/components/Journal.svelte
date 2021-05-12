<script lang="ts">
	import type { Journal, ParseError } from '../parser/parser.types';
	import { createEventDispatcher, onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let maybeJournal: Journal | ParseError;

	const dispatch = createEventDispatcher();

	let timeView = 'today';

	let ctx;
	onMount(() => {
		let chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
					{
						label: '# of Votes',
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});
</script>

<div class="flex flex-col items-center w-full items-stretch gap-4">
	<button on:click={() => dispatch('fileUpload', {})}>(return to file upload)</button>
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
		<div class="relative md:p-4">
			<canvas bind:this={ctx} id="myChart" />
		</div>
		<div class="flex flex-wrap gap-4 justify-items-center">
			{#if maybeJournal.parseType == 'journal'}
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
			{:else}
				<p>parse error: {maybeJournal.error}</p>
				<br />
				<p>error at {maybeJournal.activity}, {maybeJournal.date}</p>
			{/if}
		</div>
	</div>
</div>
