<script lang="ts">
	import type { Journal, ParseError } from '../parser/parser.types';

	export let maybeJournal: Journal | ParseError;
</script>

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
