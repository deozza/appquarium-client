<script lang="ts">
	import {
		headerMain,
		headerDataNaming,
		headerDataWaterContraints,
		headerDataEnvironment,
		headerDataAquarium,
		headerDataBehaviour,
		headerDataReproduction,
		headerDataDescription
	} from '../../components/pages/species/[genre]-[name]/Modeles';

	import BaseHeader from '../../components/atoms/typography/header/BaseHeader.svelte';

	import { page } from '$app/stores';
	import Species from '../../app/species/global/entities/Species';
	import SpeciesUseCase from '../../app/species/global/useCases/UseCase';
	import Result from '../../app/utils/useCasesResult/Result';
	import SpeciesData from '../../components/molecules/speciesData/SpeciesData.svelte';
	import Constraints from '../../app/adapters/hasura/HasuraRequestBuilderV2/Constraints';
	import ConstraintBuilder from '../../app/species/global/adapters/Constraints';

	let headerMainContent: string = $page.params.genre + ' ' + $page.params.name;
	headerMain.setContent(headerMainContent);

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase();

	async function getSingleSpecies(): Promise<Species> {

		const filters: object = {
			naming: {
				name: $page.params.name,
				species_genre: {
					name: $page.params.genre
				}
			}
		}

		let speciesConstraints: Constraints = new Constraints()

		speciesConstraints.where = ConstraintBuilder.buildConstraintsFilters(filters)

		const speciesFromHasura: Result = await speciesUseCase.getSpecies('', speciesConstraints);
		if (speciesFromHasura.isFailed()) {
			for (const error of speciesFromHasura.errors) {
				console.log(error);
			}
			return speciesFromHasura;
		}
		species = speciesFromHasura.content;

		return species;
	}

	export let species: Promise<Species> = getSingleSpecies();

</script>

<section class='flex-c mb-6 text-center'>
	<BaseHeader baseHeaderModel={headerMain} />
	<h4 class='font-bold text-lg'>Guppy</h4>
</section>

{#await species}

<section>
	<p>Chargement ...</p>
</section>
	{:then species}

<section class='flex-r justify-between items-center w-full'>
	<div class='flex-c lg:flex-1'>
		<img src={species.images[0].url} alt={species.images[0].title}>

		<SpeciesData header={headerDataDescription} >
		</SpeciesData>
	</div>
	<div class='flex-r justify-around items-center' style='flex:2'>

		<SpeciesData header={headerDataNaming} >
			<p><span class='font-semibold'>Famille : </span>{species.naming.species_family.name}</p>
			<p><span class='font-semibold'>Genre : </span>{species.naming.species_genre.name}</p>
		</SpeciesData>

		<SpeciesData header={headerDataWaterContraints} >
			<p><span class='font-semibold'>pH : </span>entre {species.water_constraints.ph_min} et {species.water_constraints.ph_max}</p>
			<p><span class='font-semibold'>GH : </span>entre {species.water_constraints.gh_min} et {species.water_constraints.gh_max}</p>
			<p><span class='font-semibold'>Température : </span>entre {species.water_constraints.temp_min} et {species.water_constraints.temp_max}°C</p>
		</SpeciesData>

		<SpeciesData header={headerDataEnvironment} >
			<p><span class='font-semibold'>Origine : </span>amérique centrale</p>
			<p><span class='font-semibold'>Zone de vie : </span>surface</p>
			<p><span class='font-semibold'>Plantes : </span>Oui</p>
			<p><span class='font-semibold'>Roches : </span>indifférent</p>
			<p><span class='font-semibold'>Racines : </span>indifférent</p>
			<p><span class='font-semibold'>Type de sable : </span>indifférent</p>
			<p><span class='font-semibold'>Lumière : </span>indifférent</p>
		</SpeciesData>

		<SpeciesData header={headerDataAquarium} >
			<p><span class='font-semibold'>Volume brut minimal : </span>54L</p>
			<p><span class='font-semibold'>Longueur minimale : </span>Poecilia</p>
			<p><span class='font-semibold'>Hauteur minimale : </span>Poecilia Reticulata</p>
			<p><span class='font-semibold'>Hauteur maximale : </span>Guppy</p>
		</SpeciesData>

		<SpeciesData header={headerDataBehaviour} >
			<p><span class='font-semibold'>Régime : </span>omnivore</p>
			<p><span class='font-semibold'>Avec les autres : </span>calme</p>
			<p><span class='font-semibold'>Entre eux : </span>calme</p>
			<p><span class='font-semibold'>Minimum dans le groupe: </span>4</p>
			<p>1 male pour 3 femelles</p>
		</SpeciesData>

		<SpeciesData header={headerDataReproduction} >
			<p><span class='font-semibold'>Famille : </span>Poecilidae</p>
			<p><span class='font-semibold'>Genre: </span>Poecilia</p>
			<p><span class='font-semibold'>Nom: </span>Poecilia Reticulata</p>
			<p><span class='font-semibold'>Noms communs: </span>Guppy</p>
		</SpeciesData>
	</div>

</section>

	{:catch e}
	{/await}
