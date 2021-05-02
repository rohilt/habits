<script lang="ts">
    interface JournalEntry {
      date: Date,
      activity: String,
      properties: String[],
    }

    let files: FileList;

    const parseJournalEntry = (contents: String) => {
      let vals = contents.split(/\r?\n/);
      return {
        ...parseDateActivity(vals[0]),
        properties: vals.slice(1)
      }      
    }

    const parseDateActivity = (contents: String) => {
      let vals = contents.split(/ /);
      return {
        date: new Date(Date.parse(vals[0])),
        activity: vals[1],
      }
    }

    const parseFileContents = (fileContents: String): JournalEntry[] => fileContents.split(/\r?\n\r?\n/).map(parseJournalEntry)
</script>

<main>
	{#if files}
		{#await files[0].text()}
			<p>Loading...</p>
		{:then fileContents}
			<p>The text is {fileContents}</p>
		{/await}
	{:else}
		<p>Upload a file to get started.</p>
		<input type="file" bind:files>
	{/if}
	<!-- <h1>Hello there!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>