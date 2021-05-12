<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
	import Journal from './Journal.svelte';
	import { parseJournal } from '../parser/parser';

	let files: FileList;
</script>

<main>
	<div class="flex px-8 md:px-16 py-8">
		{#if files}
			{#await files[0].text().then((t) => parseJournal(t))}
				<p>Loading {files[0].name}...</p>
			{:then maybeJournal}
				<Journal {maybeJournal} />
			{/await}
		{:else}
			<!-- <input type="file" bind:files /> -->
			<div class="flex-grow grid grid-cols-1 gap-4 md:grid-cols-3">
				<div>testing</div>
				<div class="md:col-span-2">
					<Dropzone
						accept="text/plain"
						on:drop={(e) => {
							files = e.detail.acceptedFiles;
						}}
					>
						<p>Upload a file to get started.</p>
					</Dropzone>
				</div>
			</div>
		{/if}
	</div>
</main>
