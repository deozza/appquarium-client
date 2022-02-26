<script lang="ts">
	import {
		headerMain,
		headerDataNaming,
		headerDataWaterConstraints,
		headerDataEnvironment,
		headerDataAquarium,
		headerDataBehaviour,
		headerDataSpecs,
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
	import { onMount } from 'svelte';

	let headerMainContent: string = $page.params.genre + ' ' + $page.params.name;
	headerMain.setContent(headerMainContent);

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase();

	let isLoading: boolean = true
	let species: Species;

	onMount(async () => {
		species = await loadSingleSpecies()

		console.log(species)

		//isLoading = false
	})

	async function loadSingleSpecies(): Promise<Species> {

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
			return speciesFromHasura.content;
		}

		return speciesFromHasura.content;
	}


</script>

<section class='flex-c text-center'>
	<BaseHeader baseHeaderModel={headerMain} />
</section>

{#if isLoading}

	<section>
		<p>Chargement ...</p>
	</section>
{:else}

	<section class='flex-c text-center'>
		<h4 class='text-lg'>{species.naming.common_names.join(', ')}</h4>
	</section>

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

			<SpeciesData header={headerDataWaterConstraints} >
				<p><span class='font-semibold'>pH : </span>entre {species.water_constraints.ph_min} et {species.water_constraints.ph_max}</p>
				<p><span class='font-semibold'>GH : </span>entre {species.water_constraints.gh_min} et {species.water_constraints.gh_max}</p>
				<p><span class='font-semibold'>Température : </span>entre {species.water_constraints.temp_min} et {species.water_constraints.temp_max}°C</p>
			</SpeciesData>

			<SpeciesData header={headerDataSpecs} >
				{#if species.category === 'plant'}
					<p><span class='font-semibold'>Taille : </span>{species.plant_specs.size}cm</p>
					<p><span class='font-semibold'>Zone de plantation : </span>{species.plant_specs.zone}</p>
					<p><span class='font-semibold'>Croissance : </span>{species.plant_specs.growth_speed}</p>
					<p><span class='font-semibold'>Apport en CO2 : </span>{species.plant_specs.need_in_carbone}</p>
					<p><span class='font-semibold'>Besoin d'un terreau : </span>{species.plant_specs.need_in_fertilizer}</p>
				{:else}
					<p><span class='font-semibold'>Taille du male : </span>{species.animal_specs.male_size}cm</p>
					<p><span class='font-semibold'>Taille de la femelle : </span>{species.animal_specs.female_size}cm</p>
					<p><span class='font-semibold'>Espérance de vie : </span>{species.animal_specs.longevity_in_years} ans</p>
				{/if}
			</SpeciesData>

			<SpeciesData header={headerDataEnvironment} >
				<p><span class='font-semibold'>Origine : </span>{Species.getTranslatedOrigin(species.origin)}</p>
				<p><span class='font-semibold'>Zone de vie : </span>{species.animal_behaviour.zone}</p>
				<p><span class='font-semibold'>Plantes : </span>Oui</p>
				<p><span class='font-semibold'>Roches : </span>indifférent</p>
				<p><span class='font-semibold'>Racines : </span>indifférent</p>
				<p><span class='font-semibold'>Type de sable : </span>{species.aquarium_contraints.soil_kind}</p>
			</SpeciesData>

			<SpeciesData header={headerDataAquarium} >
				<p><span class='font-semibold'>Type d'aquarium : </span>{species.animal_behaviour.aquarium_kind}</p>
				<p><span class='font-semibold'>Volume brut minimal : </span>{species.aquarium_contraints.min_volume}</p>
				<p><span class='font-semibold'>Longueur minimale : </span>{species.aquarium_contraints.min_length}</p>
				<p><span class='font-semibold'>Hauteur maximale : </span>{species.aquarium_contraints.max_height}</p>
			</SpeciesData>

			<SpeciesData header={headerDataBehaviour} >
				<p><span class='font-semibold'>Régime : </span>{species.animal_behaviour.alimentation}</p>
				<p><span class='font-semibold'>Actif : </span>{species.animal_behaviour.diurnal}</p>
				<p><span class='font-semibold'>Avec les autres : </span>{species.animal_behaviour.extraspecific_behaviour}</p>
				<p><span class='font-semibold'>Entre eux : </span>{species.animal_behaviour.intraspecific_behaviour}</p>
				<p><span class='font-semibold'>Minimum dans le groupe : </span>{species.animal_behaviour.min_group}</p>
				<p><span class='font-semibold'>Maximum dans le groupe : </span>{species.animal_behaviour.max_group}</p>
				<p>1 male pour {species.animal_behaviour.female_per_male} femelles</p>
			</SpeciesData>
		</div>

	</section>

{/if}
