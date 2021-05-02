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
			<div class="flex flex-wrap gap-4 justify-items-center">
				{#each parseFileContents(fileContents) as journalEntry}
					<div class="bg-gray-100 bg-opacity-50 rounded-xl p-8 ring ring-gray-100 shadow">
						<div class="text-indigo-600 text-center font-italic">{journalEntry.date.toDateString()}</div>
						<br/>
						<div class="text-2xl text-uppercase font-bold">{journalEntry.activity}</div>
						<ul class="list-disc list-inside">
							{#each journalEntry.properties as prop}
								<li>{prop}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		{/await}
	{:else}
		<p>Upload a file to get started.</p>
		<input type="file" bind:files>
	{/if}
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>