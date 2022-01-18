<script lang="ts">
	import BaseHeader from '../../atoms/typography/header/BaseHeader.svelte';
	import BaseHeaderModel from '../../atoms/typography/header/BaseHeaderModel';

	import {goto} from '$app/navigation';
	import Species from '../../../app/species/global/entities/Species';

	export let listStyle: string ='square'

	export let species: Species

	const header: BaseHeaderModel = new BaseHeaderModel(species.computeName())
		.setSizeOrTrowError("h3")
		.setDisplaySizeOrTrowError('lg')
		.setColorOrTrowError('white')

</script>

{#if listStyle === 'square'}
	<div class='flex-c w-48 m-3 rounded-b-lg hover:cursor-pointer transition-shadow duration-300' on:click={(e) => goto(species.computeLinkToSpecies())}>
		<img class='h-32' src={species.images[0].url} alt={species.images[0].title}>
		<div class='flex-c bg-gray-500 rounded-b-lg w-full text-center' >
			<BaseHeader baseHeaderModel={header} />
		</div>
	</div>
{:else}
	<div class='flex-r w-full h-32 m-3 rounded-r-lg hover:cursor-pointer transition-shadow duration-300' on:click={(e) => goto()}>
		<img class='h-32 w-48' src={species.images[0].url} alt={species.images[0].title}>
		<div style='flex: 2' class='bg-gray-500 rounded-r-lg h-full'>
			<div class='ml-6 mt-2'>

				<BaseHeader baseHeaderModel={header} />
				<div class='flex-r justify-start space-x-6 items-start'>
					<ul>
						<li><span class='font-semibold'>Difficulté : </span>débutant</li>
						<li><span class='font-semibold'>Origine : </span>{species.origin}</li>
					</ul>
					<ul>
						<li><span class='font-semibold'>pH : </span>{species.water_constraints.ph_min} - {species.water_constraints.ph_max}</li>
						<li><span class='font-semibold'>GH : </span>{species.water_constraints.gh_min} - {species.water_constraints.gh_max}</li>
						<li><span class='font-semibold'>Température : </span>{species.water_constraints.temp_min} - {species.water_constraints.temp_max}</li>
					</ul>

				</div>
			</div>

		</div>
	</div>
{/if}