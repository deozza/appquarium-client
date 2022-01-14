<script lang="ts">
	import { header, listStyle, dummyLoading } from '../../components/pages/species/index/Modeles';
	import ConstraintBuilder from '../../app/species/global/adapters/Constraints';

	import BaseHeader from '../../components/atoms/typography/header/BaseHeader.svelte';
	import SpeciesList from '../../components/molecules/speciesList/SpeciesList.svelte';
	import Species from '../../app/species/global/entities/Species';
	import SpeciesUseCase from '../../app/species/global/useCases/UseCase';
	import Result from '../../app/utils/useCasesResult/Result';
	import SpeciesListLoading from '../../components/molecules/speciesList/SpeciesListLoading.svelte';
	import BaseLabelModel from '../../components/atoms/input/BaseLabelModel';
	import BaseTextInputModel from '../../components/atoms/input/text/BaseTextInputModel';
	import BaseLabel from '../../components/atoms/input/BaseLabel.svelte';
	import BaseTextInput from '../../components/atoms/input/text/BaseTextInput.svelte';
	import BaseButtonModel from '../../components/atoms/button/BaseButtonModel';
	import BaseButton from '../../components/atoms/button/BaseButton.svelte';
	import Constraints from '../../app/adapters/hasura/HasuraRequestBuilderV2/Constraints';
	import ConstraintPart from '../../app/adapters/hasura/HasuraRequestBuilderV2/ConstraintPart';

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase();

	const labelFamilyName: BaseLabelModel = new BaseLabelModel('Famille', 'familyName');
	const inputFamilyName: BaseTextInputModel = new BaseTextInputModel('familyName');

	const labelName: BaseLabelModel = new BaseLabelModel('Nom', 'name');
	const inputName: BaseTextInputModel = new BaseTextInputModel('name');

	const labelOrigin: BaseLabelModel = new BaseLabelModel('Biotope', 'origin');
	const inputOrigin: BaseTextInputModel = new BaseTextInputModel('origin');

	const buttonSubmitFilter: BaseButtonModel = new BaseButtonModel('Filtrer')
		.setStyleOrThrowError('success');

	let speciesConstraints: Constraints = new Constraints()
	speciesConstraints.orderBy = new ConstraintPart('order_by')
		.addConstraint([new ConstraintPart('naming').addConstraint([
				new ConstraintPart('name').addConstraint('asc'),
				new ConstraintPart('species_genre').addConstraint([
					new ConstraintPart('name').addConstraint('asc')
				])
			])
		])

	async function getSpecies(): Promise<Array<Species>> {
		loadingSpecies = true
		const listOfSpeciesFromHasura: Result = await speciesUseCase.getListOfSpecies('', speciesConstraints);
		if (listOfSpeciesFromHasura.isFailed()) {
			for (const error of listOfSpeciesFromHasura.errors) {
				console.log(error);
			}
			loadingSpecies = false
			return listOfSpecies;
		}
		listOfSpecies = listOfSpeciesFromHasura.content;
		loadingSpecies = false

		return listOfSpecies;
	}

	async function getSpeciesWithFilter(): Promise<Array<Species>>{
		loadingSpecies = true

		const filters: object = {
			origin: inputOrigin.value,
			name: inputName.value,
			species_family: inputFamilyName.value
		}

		const constraintBuilder = new ConstraintBuilder()
		speciesConstraints.where = constraintBuilder.buildConstraintsFilters(filters)

		const listOfFilteredSpeciesFromAdapter: Result = await speciesUseCase.getListOfSpecies('', speciesConstraints)
		if (listOfFilteredSpeciesFromAdapter.isFailed()) {
			for (const error of listOfFilteredSpeciesFromAdapter.errors) {
				console.log(error);
			}
			loadingSpecies = false

		}

		listOfSpecies = listOfFilteredSpeciesFromAdapter.content
		loadingSpecies = false

		return listOfSpecies
	}

	let loadingSpecies: boolean = false
	let listOfSpecies: Promise<Array<Species>> | Array<Species> = getSpecies();


</script>

<section>
	<BaseHeader baseHeaderModel={header} />
</section>

<section class='flex-r justify-between mt-6'>
	<div class='bg-teal-800 flex-1 lg:species-list-fullscreen p-6'>
		<h2 class='text-2xl'>Filtres</h2>
		<form class='min-w-full' on:submit|preventDefault={getSpeciesWithFilter}>
			<ul class="space-y-6">
				<li class="flex-c">
					<div class="flex-r">
						<BaseLabel baseLabelModel={labelFamilyName} />
						<BaseTextInput baseTextInputModel={inputFamilyName} />
					</div>
				</li>

				<li class="flex-c">
					<div class="flex-r">
						<BaseLabel baseLabelModel={labelName} />
						<BaseTextInput baseTextInputModel={inputName} />
					</div>
				</li>

				<li class="flex-c">
					<div class="flex-r">
						<BaseLabel baseLabelModel={labelOrigin} />
						<BaseTextInput baseTextInputModel={inputOrigin} />
					</div>
				</li>
				<li class="flex-c space-y-2">
					<BaseButton baseButtonModel={buttonSubmitFilter} />
				</li>
			</ul>
		</form>

	</div>
	<div class='flex-r justify-start items-start lg:species-list-fullscreen p-6' style='flex:2'>
		{#if loadingSpecies === true}
			<SpeciesListLoading {listStyle} {dummyLoading}/>
		{:else }
			{#each listOfSpecies as species }
				<SpeciesList {listStyle} {species}/>
			{/each}
		{/if}
	</div>
</section>

<style>
    li > div {
        padding: 0.5em;
        align-items: normal;
        width: 98%;
    }
</style>