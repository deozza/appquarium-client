<script lang="ts">
	import {
		header,
		speciesLeftHeader,
		resultHeader,
		speciesRightHeader,
		headerDataWaterConstraints,
		compareButton
	} from '../../components/pages/matcher/Modeles';
	import BaseHeader from '../../components/atoms/typography/header/BaseHeader.svelte';
	import Species from '../../app/species/global/entities/Species';
	import SpeciesUseCase from '../../app/species/global/useCases/UseCase';
	import Result from '../../app/utils/useCasesResult/Result';
	import { onMount } from 'svelte';
	import BaseButton from '../../components/atoms/button/BaseButton.svelte';
	import BaseSelectInputModel from '../../components/atoms/input/select/BaseSelectInputModel';
	import BaseSelectInput from '../../components/atoms/input/select/BaseSelectInput.svelte';
	import Constraints from '../../app/adapters/hasura/HasuraRequestBuilderV2/Constraints';
	import BaseOptionModel from '../../components/atoms/input/select/BaseOptionModel';
	import ConstraintPart from '../../app/adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase();

	let loadingListOfSpecies: boolean = true;
	let loadingSpeciesToCompare: boolean = false;
	let hasCompared: boolean = false;
	let speciesCompatibilityResult: Result = null;

	let errorMapping: object;

	let listOfSpecies: Array<BaseOptionModel>;

	onMount(async () => {
		listOfSpecies = await loadListOfSpecies();
		loadingListOfSpecies = false
	});

	async function loadListOfSpecies(): Promise<Array<BaseOptionModel>> {
		let speciesConstraints: Constraints = new Constraints();
		speciesConstraints.orderBy = new ConstraintPart('order_by')
			.addConstraint([new ConstraintPart('naming').addConstraint([
				new ConstraintPart('name').addConstraint('asc'),
				new ConstraintPart('species_genre').addConstraint([
					new ConstraintPart('name').addConstraint('asc')
				])
			])
			]);
		const listOfSpeciesFromAdapter: Result = await speciesUseCase.getListOfSpecies('', speciesConstraints);
		if (listOfSpeciesFromAdapter.isFailed()) {
			for (const error of listOfSpeciesFromAdapter.errors) {
				console.log(error);
			}
			return null;
		}

		const options: Array<BaseOptionModel> = listOfSpeciesFromAdapter.content.map((species: Species) => new BaseOptionModel(species.computeName(), species.uuid));

		return options;
	}

	async function loadSpeciesToCompare(uuid: string): Promise<Species> {
		loadingSpeciesToCompare = true
		hasCompared = false

		if(uuid === ''){
			loadingSpeciesToCompare = false
			return null;
		}

		const speciesFromAdapter: Result = await speciesUseCase.getSpeciesByUuid('', uuid);
		if (speciesFromAdapter.isFailed()) {
			for (const error of speciesFromAdapter.errors) {
				console.log(error);
			}
			loadingSpeciesToCompare = false
			return null;
		}

		loadingSpeciesToCompare = false
		return speciesFromAdapter.content;
	}

	async function loadSpeciesLeftAndCompute(uuid: string){
		speciesLeft = await loadSpeciesToCompare(uuid)
		if(speciesLeft !== null){
			speciesLeftHeader.setContent(speciesLeft.computeName())
		}

		if(speciesLeft !== null && speciesRight !== null){
			compareButton.isDisabled = false
		}
	}

	async function loadSpeciesRightAndCompute(uuid: string){
		speciesRight = await loadSpeciesToCompare(uuid)
		if(speciesRight !== null){
			speciesRightHeader.setContent(speciesRight.computeName())
		}

		if(speciesLeft !== null && speciesRight !== null){
			compareButton.isDisabled = false
		}
	}

	function compareSpecies() {
		compareButton.setLoading(true)
		initErrorMapping()
		speciesCompatibilityResult = speciesUseCase.checkSpeciesCompatibility(speciesLeft, speciesRight);

		if (speciesCompatibilityResult.content.water_constraints_errors !== undefined && speciesCompatibilityResult.content.water_constraints_errors !== null) {
			if (speciesCompatibilityResult.content.water_constraints_errors.some(error => error.type.includes('ph'))) {
				errorMapping.waterConstraints.ph = 'text-red-500';
			}

			if (speciesCompatibilityResult.content.water_constraints_errors.some(error => error.type.includes('gh'))) {
				errorMapping.waterConstraints.gh = 'text-red-500';
			}

			if (speciesCompatibilityResult.content.water_constraints_errors.some(error => error.type.includes('temp'))) {
				errorMapping.waterConstraints.temp = 'text-red-500';
			}
		}

		hasCompared = true;
		compareButton.setLoading(false)

	}

	function initErrorMapping(){
		errorMapping = {
			waterConstraints: {
				ph: '',
				gh: '',
				temp: ''
			}
		}
	}

	let inputSpeciesLeft: BaseSelectInputModel = new BaseSelectInputModel('listOfSpeciesLeft');
	let inputSpeciesRight: BaseSelectInputModel = new BaseSelectInputModel('listOfSpeciesRight');
	let speciesLeft: Species = null
	let speciesRight: Species = null

</script>
<section>
	<BaseHeader baseHeaderModel={header} />
</section>

{#if loadingListOfSpecies === true}
	chargement...
{:else}

	<div class='lg:hidden bg-teal-800 rounded-lg pb-6'>
		<section class='flex-r justify-between p-3'>
			<div class='flex-c w-1/3 ml-1'>
				<BaseSelectInput baseSelectInputModel={inputSpeciesLeft} options={listOfSpecies} on:change={async (e) => await loadSpeciesLeftAndCompute(e.target.value)} }/>
			</div>
			<div></div>
			<div class='flex-c w-1/3 mr-1'>
				<BaseSelectInput baseSelectInputModel={inputSpeciesRight} options={listOfSpecies} on:change={async (e) => loadSpeciesRightAndCompute(e.target.value) } />
			</div>
		</section>
		<section class='flex-r justify-between my-3'>
			<div class='flex-c w-1/3 ml-1'>
				{#if speciesLeft !== undefined && speciesLeft !== null}
					<BaseHeader baseHeaderModel={speciesLeftHeader} />
					<img src={speciesLeft.images[0].url} alt={speciesLeft.images[0].title}>
					<a href={speciesLeft.computeLinkToSpecies()} class='underline'>En savoir plus</a>
				{/if}
			</div>
			<div>
			</div>
			<div class='flex-c w-1/3 mr-1'>
				{#if speciesRight !== undefined && speciesRight !== null}
					<BaseHeader baseHeaderModel={speciesRightHeader} />
					<img src={speciesRight.images[0].url} alt={speciesRight.images[0].title}>
					<a href={speciesRight.computeLinkToSpecies()} class='underline'>En savoir plus</a>
				{/if}
			</div>
		</section>

		<section class='flex-c my-3'>
			<BaseButton baseButtonModel={compareButton} on:click={compareSpecies}/>
		</section>

		{#if hasCompared}

			<section class='flex-c my-3 text-center'>
				<BaseHeader baseHeaderModel={resultHeader} />
				{#if speciesCompatibilityResult.isSuccessful()}
					<i class='fa fa-check-circle fa-5x text-green-500 mb-3'></i>
					<p>Ces deux espèces peuvent être mises dans le même aquarium</p>
				{:else}
					<i class='fa fa-times-circle fa-5x text-red-500 mb-3'></i>
					<p>Ces deux espèces ne doivent pas être mises dans le même aquarium</p>
				{/if}

			</section>

			<section class='w-full flex-c p-3'>
				<BaseHeader baseHeaderModel={headerDataWaterConstraints} />

				{#if speciesCompatibilityResult.isFailed() && speciesCompatibilityResult.content.water_constraints_errors !== null }
					<i class='fa fa-times-circle fa-3x text-red-500 mb-3'></i>
				{:else}
					<i class='fa fa-check-circle fa-3x text-green-500 mb-3'></i>
				{/if}
					<div class='flex-r w-full justify-between'>
						<div class='flex-c'>
							<p class='{errorMapping.waterConstraints.ph}'>{speciesLeft.water_constraints.ph_min} - {speciesLeft.water_constraints.ph_max}</p>
							<p class='{errorMapping.waterConstraints.gh}'>{speciesLeft.water_constraints.gh_min} - {speciesLeft.water_constraints.gh_max}</p>
							<p class='{errorMapping.waterConstraints.temp}'>{speciesLeft.water_constraints.temp_min} - {speciesLeft.water_constraints.temp_max}°C</p>
						</div>
						<div class='flex-c'>
							<p class='{errorMapping.waterConstraints.ph}'><span class='font-semibold'>pH</span></p>
							<p class='{errorMapping.waterConstraints.gh}'><span class='font-semibold'>GH</span></p>
							<p class='{errorMapping.waterConstraints.temp}'><span class='font-semibold'>Température</span></p>
						</div>
						<div class='flex-c'>
							<p class='{errorMapping.waterConstraints.ph}'>{speciesRight.water_constraints.ph_min} - {speciesRight.water_constraints.ph_max}</p>
							<p class='{errorMapping.waterConstraints.gh}'>{speciesRight.water_constraints.gh_min} - {speciesRight.water_constraints.gh_max}</p>
							<p class='{errorMapping.waterConstraints.temp}'>{speciesRight.water_constraints.temp_min} - {speciesRight.water_constraints.temp_max}°C</p>
						</div>
					</div>

			</section>
		{/if}

	</div>
<!--
	<div class='lg:block hidden'>
		<div class='flex-c'>
			<section class='flex-r justify-around w-full p-6'>
				<div class='w-1/5 flex-c'>
					<BaseHeader baseHeaderModel={speciesLeftHeader} />
					<img src={speciesLeft.images[0].url} alt={speciesLeft.images[0].title}>
					<a href={speciesLeft.computeLinkToSpecies()} class='underline'>En savoir plus</a>
				</div>
				<div class='w-1/5'>

				</div>
				<div class='w-1/5 flex-c'>
					<BaseHeader baseHeaderModel={speciesRightHeader} />
					<img src={speciesRight.images[0].url} alt={speciesRight.images[0].title}>
					<a href={speciesRight.computeLinkToSpecies()} class='underline'>En savoir plus</a>
				</div>
			</section>

			<section class='flex-c my-3'>
				<BaseButton baseButtonModel={compareButton} on:click={compareSpecies}/>
			</section>
			{#if hasCompared}


			<section class='flex-c'>
				<BaseHeader baseHeaderModel={resultHeader} />
				{#if speciesCompatibilityResult.isSuccessful()}
					<i class='fa fa-check-circle fa-5x text-green-500 mb-3'></i>
					<p>Ces deux espèces peuvent être mises dans le même aquarium</p>
				{:else}
					<i class='fa fa-times-circle fa-5x text-red-500 mb-3'></i>
					<p>Ces deux espèces ne doivent pas être mises dans le même aquarium</p>
				{/if}
			</section>

			<section class='flex-r justify-around w-full p-6'>
				<div class='bg-gray-500 w-1/5 p-3 flex-c rounded-lg'>
					<div class='flex-c items-start w-full'>
						<p class='{errorMapping.waterConstraints.ph}'><span class='font-semibold'>pH : </span>entre {speciesLeft.water_constraints.ph_min} et {speciesLeft.water_constraints.ph_max}</p>
						<p class='{errorMapping.waterConstraints.gh}'><span class='font-semibold'>GH : </span>entre {speciesLeft.water_constraints.gh_min} et {speciesLeft.water_constraints.gh_max}</p>
						<p class='{errorMapping.waterConstraints.temp}'><span class='font-semibold'>Température : </span>entre {speciesLeft.water_constraints.temp_min} et {speciesLeft.water_constraints.temp_max}°C</p>
					</div>
				</div>
				<div class='bg-teal-800 w-1/5 p-3 flex-c rounded-lg'>
					<BaseHeader baseHeaderModel={headerDataWaterConstraints} />
					<div class='flex-c w-full'>
						{#if speciesCompatibilityResult.isFailed() && speciesCompatibilityResult.content.water_constraints_errors !== null }
							<i class='fa fa-times-circle fa-3x text-red-500 mb-3'></i>
						{:else}
							<i class='fa fa-check-circle fa-3x text-green-500 mb-3'></i>
						{/if}
					</div>
				</div>
				<div class='bg-gray-500 w-1/5 p-3 flex-c rounded-lg'>
					<div class='flex-c items-start w-full'>
						<p class='{errorMapping.waterConstraints.ph}'><span class='font-semibold'>pH : </span>entre {speciesRight.water_constraints.ph_min} et {speciesRight.water_constraints.ph_max}</p>
						<p class='{errorMapping.waterConstraints.gh}'><span class='font-semibold'>GH : </span>entre {speciesRight.water_constraints.gh_min} et {speciesRight.water_constraints.gh_max}</p>
						<p class='{errorMapping.waterConstraints.temp}'><span class='font-semibold'>Température : </span>entre {speciesRight.water_constraints.temp_min} et {speciesRight.water_constraints.temp_max}°C</p>
					</div>
				</div>
			</section>
			{/if}

		</div>

	</div>
	-->
{/if}
