<script lang="ts">
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

			<p><span class='font-semibold'>Famille : </span>{species.naming.species_family.name}</p>
			<p><span class='font-semibold'>Genre : </span>{species.naming.species_genre.name}</p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 p-3 m-3 lg:m-1 flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Contraintes d'eau</h2>
			<div class='flex-c items-start w-full'>

				<p><span class='font-semibold'>pH : </span>entre {species.water_constraints.ph_min} et {species.water_constraints.ph_max}</p>
				<p><span class='font-semibold'>GH : </span>entre {species.water_constraints.gh_min} et {species.water_constraints.gh_max}</p>
				<p><span class='font-semibold'>Température : </span>entre {species.water_constraints.temp_min} et {species.water_constraints.temp_max}°C</p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 m-3 lg:m-1 p-3  flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Habitat</h2>
			<div class='flex-c items-start w-full'>

				<p><span class='font-semibold'>Origine : </span>amérique centrale</p>
				<p><span class='font-semibold'>Zone de vie : </span>surface</p>
				<p><span class='font-semibold'>Plantes : </span>Oui</p>
				<p><span class='font-semibold'>Roches : </span>indifférent</p>
				<p><span class='font-semibold'>Racines : </span>indifférent</p>
				<p><span class='font-semibold'>Type de sable : </span>indifférent</p>
				<p><span class='font-semibold'>Lumière : </span>indifférent</p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 m-3 lg:m-1 p-3 flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Aquarium</h2>
			<div class='flex-c items-start w-full'>

				<p><span class='font-semibold'>Volume brut minimal : </span>54L</p>
				<p><span class='font-semibold'>Longueur minimale : </span>Poecilia</p>
				<p><span class='font-semibold'>Hauteur minimale : </span>Poecilia Reticulata</p>
				<p><span class='font-semibold'>Hauteur maximale : </span>Guppy</p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 m-3 lg:m-1 p-3 flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Comportement</h2>
			<div class='flex-c items-start w-full'>

				<p><span class='font-semibold'>Régime : </span>omnivore</p>
				<p><span class='font-semibold'>Avec les autres : </span>calme</p>
				<p><span class='font-semibold'>Entre eux : </span>calme</p>
				<p><span class='font-semibold'>Minimum dans le groupe: </span>4</p>
				<p>1 male pour 3 femelles</p>
			</div>
		</div>

		<div class='bg-gray-700 w-full lg:w-1/3 m-3 lg:m-1 p-3 flex-c rounded-lg'>
			<h2 class='mb-3 text-xl font-bold'>Reproduction</h2>
			<div class='flex-c items-start w-full'>

				<p><span class='font-semibold'>Famille : </span>Poecilidae</p>
				<p><span class='font-semibold'>Genre: </span>Poecilia</p>
				<p><span class='font-semibold'>Nom: </span>Poecilia Reticulata</p>
				<p><span class='font-semibold'>Noms communs: </span>Guppy</p>
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
