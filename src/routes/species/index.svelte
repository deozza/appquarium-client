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
	import SpeciesFamily from '../../app/species/global/entities/SpeciesFamily';
	import SpeciesFamiliesUseCase from '../../app/species/global/useCases/speciesNaming/speciesFamilies/UseCase';
	import SpeciesGenresUseCase from '../../app/species/global/useCases/speciesNaming/speciesGenres/UseCase';
	import SpeciesGenre from '../../app/species/global/entities/SpeciesGenre';

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase();
	const speciesFamiliesUseCase: SpeciesFamiliesUseCase = new SpeciesFamiliesUseCase()
	const speciesGenresUseCase: SpeciesGenresUseCase = new SpeciesGenresUseCase()

	const labelGenreName: BaseLabelModel = new BaseLabelModel('Genre', 'genreName');
	const inputGenreName: BaseTextInputModel = new BaseTextInputModel('genreName');
	inputGenreName.datalist = 'listOfSpeciesGenres'

	const labelFamilyName: BaseLabelModel = new BaseLabelModel('Famille', 'familyName');
	const inputFamilyName: BaseTextInputModel = new BaseTextInputModel('familyName');
	inputFamilyName.datalist = 'listOfSpeciesFamilies'

	const labelName: BaseLabelModel = new BaseLabelModel('Nom', 'name');
	const inputName: BaseTextInputModel = new BaseTextInputModel('name');

	const labelOrigin: BaseLabelModel = new BaseLabelModel('Biotope', 'origin');
	const inputOrigin: BaseTextInputModel = new BaseTextInputModel('origin');
	inputOrigin.datalist = 'listOfOrigins'

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

	async function loadSpecies(): Promise<Array<Species>> {
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

	async function loadSpeciesWithFilter(): Promise<Array<Species>>{
		loadingSpecies = true

		const filters: object = {
			origin: inputOrigin.value,
			name: inputName.value,
			species_genre: inputGenreName.value,
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

	async function loadFilters(): Promise<object>{
		const listOfSpeciesFamilies: Result = await speciesFamiliesUseCase.getListOfSpeciesFamilies('', {})
		if (listOfSpeciesFamilies.isFailed()) {
			for (const error of listOfSpeciesFamilies.errors) {
				console.log(error);
			}
		}

		const listOfSpeciesGenres: Result = await speciesGenresUseCase.getListOfSpeciesGenres('', {})
		if (listOfSpeciesGenres.isFailed()) {
			for (const error of listOfSpeciesGenres.errors) {
				console.log(error);
			}
		}

		const listOfSpeciesOrigins: Result = await speciesUseCase.getListOfSpeciesOrigins('')
		if (listOfSpeciesOrigins.isFailed()) {
			for (const error of listOfSpeciesOrigins.errors) {
				console.log(error);
			}
		}

		return {
			listOfSpeciesFamilies: listOfSpeciesFamilies.content,
			listOfSpeciesGenres: listOfSpeciesGenres.content,
			listOfSpeciesOrigins: listOfSpeciesOrigins.content,
		}
	}

	let loadingSpecies: boolean = false
	let listOfSpecies: Promise<Array<Species>> | Array<Species> = loadSpecies();
	let listOfFilters: Promise<object> = loadFilters()

</script>

<section>
	<BaseHeader baseHeaderModel={header} />
</section>

<section class='flex-r justify-between mt-6'>
	<div class='bg-teal-800 flex-1 lg:species-list-fullscreen p-6'>
		<h2 class='text-2xl'>Filtres</h2>
		<form class='min-w-full' on:submit|preventDefault={loadSpeciesWithFilter}>
			<ul class="space-y-6">
				{#await listOfFilters}
				{:then listOfFilters}
					<li class="flex-c">
						<div class="flex-r">
							<BaseLabel baseLabelModel={labelFamilyName} />
							<BaseTextInput baseTextInputModel={inputFamilyName} />
							<datalist id={inputFamilyName.datalist}>
								{#each listOfFilters.listOfSpeciesFamilies as family, index}
									<option value={family.name}>
										{ family.name }
									</option>
								{/each}
							</datalist>
						</div>
					</li>

					<li class="flex-c">
						<div class="flex-r">
							<BaseLabel baseLabelModel={labelGenreName} />
							<BaseTextInput baseTextInputModel={inputGenreName} />
							<datalist id={inputGenreName.datalist}>
								{#each listOfFilters.listOfSpeciesGenres as genre, index}
									<option value={genre.name}>
										{ genre.name }
									</option>
								{/each}
							</datalist>
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
							<datalist id={inputOrigin.datalist}>
								{#each listOfFilters.listOfSpeciesOrigins as origin, index}
									<option value={origin.name}>
										{ origin.name }
									</option>
								{/each}
							</datalist>
						</div>
					</li>
					<li class="flex-c space-y-2">
						<BaseButton baseButtonModel={buttonSubmitFilter} />
					</li>
				{/await}
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