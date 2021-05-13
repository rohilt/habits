<script lang="ts">
	import { fade } from 'svelte/transition';
	import Dropzone from 'svelte-file-dropzone';
	import JournalView from './Journal.svelte';
	import { parseJournal } from '../parser/parser';
	import type { Journal, ParseError } from '../parser/parser.types';
	import { createEventDispatcher } from 'svelte';
	import { journal, uploadPage } from '../stores/journal';

	let files: FileList;
	let maybeJournal: Journal | ParseError;
	const dispatch = createEventDispatcher();

	const onFileUpload = async (e) => {
		dispatch('loading', { status: true });
		files = e.detail.acceptedFiles;
		maybeJournal = await files[0].text().then((t) => parseJournal(t));
		if (maybeJournal.parseType == 'journal')
			journal.set({
				fileName: files[0].name,
				journal: maybeJournal,
				parseError: null
			});
		else
			journal.set({
				fileName: files[0].name,
				journal: null,
				parseError: maybeJournal
			});
		dispatch('loading', { status: false });
	};
</script>

<main>
	<div in:fade class="flex px-8 md:px-16 py-8">
		{#if $uploadPage}
			<div in:fade class="flex-grow grid grid-cols-1 gap-4 md:grid-cols-3 md:divide-x">
				<div>
					Upload a habits journal file to continue. To learn more about how to create a habits
					journal file and what this application does, visit the <a class="underline" href="/about"
						>about page</a
					>.
				</div>
				<div class="md:col-span-2 flex-col content-center md:pl-12">
					<Dropzone accept="text/plain" on:drop={onFileUpload}>
						{#if $journal.journal}
							<div class="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p>&nbsp; Successfully uploaded {$journal.fileName}</p>
							</div>
						{:else if $journal.parseError}
							<p>parse error in {$journal.fileName}...</p>
						{:else if files}
							<p>Loading...</p>
						{:else}
							<p>Upload a journal file</p>
						{/if}
					</Dropzone>
					{#if $journal.journal}
						<br />
						<button
							in:fade
							class="place-self-center rounded-full bg-gray-50 border-2 border-gray-200 text-l px-4 py-2 w-min"
							on:click={() => uploadPage.set(false)}
						>
							continue
						</button>
					{/if}
				</div>
			</div>
		{:else}
			<JournalView on:loading />
		{/if}
	</div>
</main>
