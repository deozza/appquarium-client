<script lang="ts">

	import Result from '../../../../app/utils/useCasesResult/Result';
	import SpeciesUseCase from '../../../../app/species/global/useCases/UseCase';
	import SpeciesFamiliesUseCase from '../../../../app/species/global/useCases/speciesNaming/speciesFamilies/UseCase';
	import { onMount } from 'svelte';

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase();
	const speciesFamiliesUseCase: SpeciesFamiliesUseCase = new SpeciesFamiliesUseCase();
	let appquariumStats: object = {};
	let loadingStats: boolean = true

	onMount(async () => {
		appquariumStats = await loadStats()
		loadingStats = false
	})

	async function loadStats(): Promise<object> {
		let stats: object = {
			species: null,
			speciesFamilies: null,
			speciesOrigins: null
		};
		const numberOfSpeciesFromHasura: Result = await speciesUseCase.getTotalSpecies('');
		if (numberOfSpeciesFromHasura.isFailed()) {
			for (const error of numberOfSpeciesFromHasura.errors) {
				console.log(error);
			}
			return stats;
		}

		stats.species = numberOfSpeciesFromHasura.content;

		const numberOfSpeciesFamiliesFromHasura: Result = await speciesFamiliesUseCase.getTotalSpeciesFamilies('');
		if (numberOfSpeciesFamiliesFromHasura.isFailed()) {
			for (const error of numberOfSpeciesFamiliesFromHasura.errors) {
				console.log(error);
			}
			return stats;
		}

		stats.speciesFamilies = numberOfSpeciesFamiliesFromHasura.content;

		const numberOfSpeciesOriginsFromHasura: Result = await speciesUseCase.getTotalSpeciesOrigins('');
		if (numberOfSpeciesOriginsFromHasura.isFailed()) {
			for (const error of numberOfSpeciesOriginsFromHasura.errors) {
				console.log(error);
			}
			return stats;
		}

		stats.speciesOrigins = numberOfSpeciesOriginsFromHasura.content;

		return stats;
	}


</script>

{#if loadingStats}

	<div class='w-2/3 flex-r justify-around space-y-3 lg:space-y-0'>
		<div class='flex-c w-full lg:w-48  bg-gray-500 rounded-lg'>
			<div class='flex-c h-12 lg:h16'>
				<i class='fa fa-circle-notch fa-spin fa-2x'></i>
			</div>
			<div class='flex-c h-12'>
				<p class='text-lg '>Espères répertoriées</p>
			</div>
		</div>
		<div class='flex-c w-full lg:w-48  bg-gray-500 rounded-lg'>
			<div class='flex-c h-12 lg:h16'>
				<i class='fa fa-circle-notch fa-spin fa-2x'></i>
			</div>
			<div class='flex-c h-12'>
				<p class='text-lg '>Familles d'espèces</p>
			</div>
		</div>
		<div class='flex-c w-full lg:w-48  bg-gray-500 rounded-lg'>
			<div class='flex-c h-12 lg:h16'>
				<i class='fa fa-circle-notch fa-spin fa-2x'></i>
			</div>
			<div class='flex-c h-12'>
				<p class='text-lg '>Biotopes</p>
			</div>
		</div>
	</div>
{:else}
	<div class='w-2/3 flex-r justify-around space-y-3 lg:space-y-0'>
		<div class='flex-c w-full lg:w-48  bg-gray-500 rounded-lg'>
			<div class='flex-c h-12 lg:h16'>
				<p class='text-semibold text-3xl'>{appquariumStats.species}</p>
			</div>
			<div class='flex-c h-12'>
				<p class='text-lg '>Espères répertoriées</p>
			</div>
		</div>
		<div class='flex-c w-full lg:w-48  bg-gray-500 rounded-lg'>
			<div class='flex-c h-12 lg:h16'>
				<p class='text-semibold text-3xl'>{appquariumStats.speciesFamilies}</p>
			</div>
			<div class='flex-c h-12'>
				<p class='text-lg '>Familles d'espèces</p>
			</div>
		</div>
		<div class='flex-c w-full lg:w-48  bg-gray-500 rounded-lg'>
			<div class='flex-c h-12 lg:h16'>
				<p class='text-semibold text-3xl'>{appquariumStats.speciesOrigins}</p>
			</div>
			<div class='flex-c h-12'>
				<p class='text-lg '>Biotopes</p>
			</div>
		</div>
	</div>
{/if}