<script lang="ts">
	import { isEntry, isJournal, isParseError, parseFileContents } from './parser/parser';
	import type { Journal, ParseError } from './parser/parser.types';

	let files: FileList;
	const parseJournal = (contents: string): Journal => {
		let maybeJournal = parseFileContents(contents);
		if (isParseError(maybeJournal))
			return {
				parseType: 'journal',
				entries: []
			};
		else return maybeJournal;
	};
</script>

<main>
	{#if files}
		{#await files[0].text().then((t) => parseFileContents(t))}
			<p>Loading {files[0].name}...</p>
		{:then maybeJournal}
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
		{/await}
	{:else}
		<p>Upload a file to get started.</p>
		<input type="file" bind:files />
	{/if}
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
