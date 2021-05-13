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
							backgroundColor: [
								'rgb(34, 34, 59)',
								'rgb(74, 78, 105)',
								'rgb(154, 140, 152)',
								'rgb(201, 173, 167)',
								'rgb(242, 233, 228'
							],
							hoverOffset: 4
						}
					]
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom',
							labels: {
								font: {
									family: 'Fira Sans'
								}
							}
						},
						title: {
							display: false
						},
						tooltip: {
							backgroundColor: 'rgb(255, 255, 255)',
							bodyColor: 'rgb(0, 0, 0)'
						}
					}
				}
			});
	});
</script>

<div class="relative md:p-8">
	<canvas bind:this={ctx} id="myChart" />
</div>
