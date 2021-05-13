<script lang="ts">
	import type { Journal, ParseError, Entry } from '../parser/parser.types';
	import { createEventDispatcher } from 'svelte';
	import OverviewChart from './OverviewChart.svelte';
	import { journal } from '../stores/journal';

	const dispatch = createEventDispatcher();

	let timeView = 'this week';
	let filteredData;
	let overviewData;

	$: {
		dispatch('loading', { status: true });
		if ($journal) {
			filteredData = $journal.journal.entries; // TODO filtering logic
			let _overviewData = filteredData.reduce((p, c: Entry) => {
				return {
					...p,
					[c.activity]: (p[c.activity] ? p[c.activity] : 0) + c.minutes
				};
			}, {});
			let activities = Object.keys(_overviewData).sort(
				(a1, a2) => _overviewData[a2] - _overviewData[a1]
			);
			overviewData = {
				...activities.slice(0, 4).reduce((p, a) => {
					return {
						...p,
						[a]: _overviewData[a]
					};
				}, {})
			};
			console.log(activities.slice(4));
			console.log(_overviewData);
			if (activities.slice(4).length != 0)
				overviewData = {
					...overviewData,
					Other: activities.slice(4).reduce((p, a) => p + _overviewData[a], 0)
				};
		}
		dispatch('loading', { status: false });
	}
	$: console.log(overviewData);
</script>

<div class="flex flex-col items-center w-full items-stretch gap-4">
	{#if $journal}
		<div class="flex divide-x items-stretch md:w-1/2 md:self-center bg-gray-50 shadow">
			<button
				class="flex-1 p-2 ring-gray-200"
				class:underline={timeView == 'this week'}
				class:shadow-inner={timeView == 'this week'}
				on:click={() => (timeView = 'this week')}>this week</button
			>
			<button
				class="flex-1 p-2 ring-gray-200"
				class:underline={timeView == 'this month'}
				class:shadow-inner={timeView == 'this month'}
				on:click={() => (timeView = 'this month')}>this month</button
			>
			<button
				class="flex-1 p-2 ring-gray-200"
				class:underline={timeView == 'all time'}
				class:shadow-inner={timeView == 'all time'}
				on:click={() => (timeView = 'all time')}>all time</button
			>
		</div>
		<div class="md:grid md:grid-cols-2 gap-16">
			<OverviewChart {overviewData} />
			<div class="flex flex-wrap gap-4 justify-items-center">
				{#each $journal.journal.entries as journalEntry}
					<div class="bg-gray-100 bg-opacity-50 rounded-xl p-8 ring ring-gray-100 shadow">
						<div class="text-indigo-600 text-center font-italic">
							{journalEntry.date.toISOString().slice(0, 10)}
						</div>
						<br />
						<div class="text-2xl text-uppercase font-bold">{journalEntry.activity}</div>
						<div class="text-l text-indigo-400">
							{journalEntry.minutes >= 60 ? Math.floor(journalEntry.minutes / 60) + ' hours, ' : ''}
							{journalEntry.minutes % 60} minutes
						</div>
						<ul class="list-disc list-inside">
							{#each Object.keys(journalEntry) as k}
								{#if !['parseType', 'date', 'activity', 'minutes', 'line'].includes(k)}
									<li>{k}: {journalEntry[k]}</li>
								{/if}
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<p>Oh no! Something has gone terribly wrong.</p>
	{/if}
</div>
