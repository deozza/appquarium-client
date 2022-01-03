<script lang="ts">
	import {  } from '@fortawesome/fontawesome-free/js/all'

	import BaseHeaderModel from '../../components/atoms/typography/header/BaseHeaderModel';
	import BaseHeader from '../../components/atoms/typography/header/BaseHeader.svelte';

	import { page } from '$app/stores';
	import Species from '../../app/species/global/entities/Species';
	import SpeciesUseCase from '../../app/species/global/useCases/UseCase';
	import Result from '../../app/utils/useCasesResult/Result';

	let headerContent: string = $page.params.genre + ' ' + $page.params.name
	const header: BaseHeaderModel = new BaseHeaderModel(headerContent)
		.setDisplaySizeOrTrowError('xxxl')
		.setSizeOrTrowError('h1')
		.setColorOrTrowError('white')

	export let species: Species

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

	async function getSingleSpecies(): Promise<Species> {
		const speciesFromHasura: Result = await speciesUseCase.getSpecies('', $page.params.genre, $page.params.name)
		if (speciesFromHasura.isFailed()) {
			for (const error of speciesFromHasura.errors) {
				console.log(error)
			}
			return speciesFromHasura
		}
		species = speciesFromHasura.content

		return species
	}
</script>

<section class='flex-c mb-6 text-center'>
	<BaseHeader baseHeaderModel={header} />
	<h4 class='font-bold text-lg'>Guppy</h4>
</section>

{#await getSingleSpecies()}

<section>
	<p>Chargement ...</p>
</section>
	{:then species}

<section class='flex-r justify-between items-center w-full'>
	<div class='lg:flex-1'>
		<img src={species.images[0].url} alt={species.images[0].title}>
	</div>
	<div class='flex-r justify-around items-center' style='flex:2'>
		<div class='bg-gray-700 w-full lg:w-1/3 m-3 lg:m-1 p-3 flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Espèce</h2>
			<div class='flex-c items-start w-full'>

			<p class='font-semibold'>Famille : <span class='font-normal'>{species.naming.species_family.name}</span></p>
			<p class='font-semibold'>Genre : <span class='font-normal'>{species.naming.species_genre.name}</span></p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 p-3 m-3 lg:m-1 flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Contraintes d'eau</h2>
			<div class='flex-c items-start w-full'>

				<p class='font-semibold'>pH : <span class='font-normal'>Entre {species.water_constraints.ph_min} et {species.water_constraints.ph_max}</span></p>
				<p class='font-semibold'>GH: <span class='font-normal'>entre {species.water_constraints.gh_min} et {species.water_constraints.gh_max}</span></p>
				<p class='font-semibold'>Température: <span class='font-normal'>Entre {species.water_constraints.temp_min} et {species.water_constraints.temp_max}°C</span></p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 m-3 lg:m-1 p-3  flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Habitat</h2>
			<div class='flex-c items-start w-full'>

				<p class='font-semibold'>Origine : <span class='font-normal'>amérique centrale</span></p>
				<p class='font-semibold'>Zone de vie : <span class='font-normal'>surface</span></p>
				<p class='font-semibold'>Plantes : <span class='font-normal'>Oui</span></p>
				<p class='font-semibold'>Roches : <span class='font-normal'>indifférent</span></p>
				<p class='font-semibold'>Racines : <span class='font-normal'>indifférent</span></p>
				<p class='font-semibold'>Type de sable : <span class='font-normal'>indifférent</span></p>
				<p class='font-semibold'>Lumière : <span class='font-normal'>indifférent</span></p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 m-3 lg:m-1 p-3 flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Aquarium</h2>
			<div class='flex-c items-start w-full'>

				<p class='font-semibold'>Volume brut minimal : <span class='font-normal'>54L</span></p>
				<p class='font-semibold'>Longueur minimale : <span class='font-normal'>Poecilia</span></p>
				<p class='font-semibold'>Hauteur minimale : <span class='font-normal'>Poecilia Reticulata</span></p>
				<p class='font-semibold'>Hauteur maximale : <span class='font-normal'>Guppy</span></p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 m-3 lg:m-1 p-3 flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Comportement</h2>
			<div class='flex-c items-start w-full'>

				<p class='font-semibold'>Régime : <span class='font-normal'>omnivore</span></p>
				<p class='font-semibold'>Avec les autres : <span class='font-normal'>calme</span></p>
				<p class='font-semibold'>Entre eux : <span class='font-normal'>calme</span></p>
				<p class='font-semibold'>Minimum dans le groupe: <span class='font-normal'>4</span></p>
				<p>1 male pour 3 femelles</p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 m-3 lg:m-1 p-3 flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Reproduction</h2>
			<div class='flex-c items-start w-full'>

				<p class='font-semibold'>Famille : Poecilidae</p>
				<p class='font-semibold'>Genre: Poecilia</p>
				<p class='font-semibold'>Nom: Poecilia Reticulata</p>
				<p class='font-semibold'>Noms communs: Guppy</p>
			</div>
		</div>

	</div>

</section>

<section>

	<div class='bg-gray-700 p-6 flex-c w-full mt-6 rounded-lg'>
		<h2>Description</h2>
	</div>
</section>

	{:catch e}
	{/await}
