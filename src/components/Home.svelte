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
		journal.set({ fileName: null, journal: null, parseError: null });
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
									class="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
								&nbsp;
								<p>Successfully uploaded {$journal.fileName}</p>
							</div>
						{:else if $journal.parseError}
							<div class="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
										clip-rule="evenodd"
									/>
								</svg>
								&nbsp;
								<p>An error occurred while loading {$journal.fileName}. Please try again.</p>
							</div>
						{:else if files}
							<div class="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
										clip-rule="evenodd"
									/>
								</svg>
								&nbsp;
								<p>Loading...</p>
							</div>
						{:else}
							<div class="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
										clip-rule="evenodd"
									/>
								</svg>
								&nbsp;
								<p>Upload a journal file</p>
							</div>
						{/if}
					</Dropzone>
					<br />
					{#if $journal.journal}
						<button
							in:fade
							class="place-self-center rounded-full bg-gray-50 border-2 border-blue-400 text-l px-4 py-2 w-min"
							on:click={() => uploadPage.set(false)}
						>
							continue
						</button>
						<button
							in:fade
							class="place-self-center rounded-full bg-gray-50 border-2 border-yellow-400 text-l px-4 py-2 w-min"
							on:click={() => {
								journal.set({
									fileName: null,
									journal: null,
									parseError: null
								});
								files = null;
							}}
						>
							clear
						</button>
					{:else if $journal.parseError}
						<div in:fade class="bg-red-50 border-2 border-red-200 p-4">
							There was a parse error at {$journal.parseError.line}, {$journal.parseError.error}, {$journal
								.parseError.date}, {$journal.parseError.activity}
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<JournalView on:loading />
		{/if}
	</div>
</main>
