<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	let ctx;

	export let overviewData;

	onMount(() => {
		let chart;
		if (ctx)
			chart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: Object.keys(overviewData),
					datasets: [
						{
							label: 'Habits',
							data: Object.values(overviewData),
							backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
							hoverOffset: 4
						}
					]
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom'
						},
						title: {
							display: false
						}
					}
				}
			});
	});
</script>

<div class="relative md:p-8">
	<canvas bind:this={ctx} id="myChart" />
</div>
