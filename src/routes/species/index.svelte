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
	import SpeciesFamiliesUseCase from '../../app/species/global/useCases/speciesNaming/speciesFamilies/UseCase';
	import SpeciesGenresUseCase from '../../app/species/global/useCases/speciesNaming/speciesGenres/UseCase';
	import BaseOptionModel from '../../components/atoms/input/select/BaseOptionModel';
	import BaseSelectInputModel from '../../components/atoms/input/select/BaseSelectInputModel';
	import BaseSelectInput from '../../components/atoms/input/select/BaseSelectInput.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores'

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase();
	const speciesFamiliesUseCase: SpeciesFamiliesUseCase = new SpeciesFamiliesUseCase();
	const speciesGenresUseCase: SpeciesGenresUseCase = new SpeciesGenresUseCase();

	let speciesConstraints: Constraints = new Constraints();
	speciesConstraints.orderBy = new ConstraintPart('order_by')
		.addConstraint([new ConstraintPart('naming').addConstraint([
			new ConstraintPart('name').addConstraint('asc'),
			new ConstraintPart('species_genre').addConstraint([
				new ConstraintPart('name').addConstraint('asc')
			])
		])
		]);

	onMount(async() => {
		await loadFilters()
		loadingFilters = false
		await loadSpeciesWithFilter(true)
		loadingSpecies = false
	})

	async function loadSpeciesWithFilter(onMount: boolean = false): Promise<Array<Species>> {
		loadingSpecies = true;

		if(onMount === true){
			inputOrigin.value = $page.url.searchParams.get('origin') !== 'null' ? $page.url.searchParams.get('origin') : null
			inputName.value = $page.url.searchParams.get('name') !== 'null' ? $page.url.searchParams.get('name') : null
			inputGenreName.value = $page.url.searchParams.get('genre_name') !== 'null' ? $page.url.searchParams.get('genre_name') : null
			inputFamilyName.value = $page.url.searchParams.get('family_name') !== 'null' ? $page.url.searchParams.get('family_name') : null
		}else{

			inputOrigin.value !== null && inputOrigin.value !== '' ? $page.url.searchParams.set('origin', inputOrigin.value) : $page.url.searchParams.delete('origin')
			inputName.value !== null && inputName.value !== '' ? $page.url.searchParams.set('name', inputName.value) : $page.url.searchParams.delete('name')
			inputGenreName.value !== null && inputGenreName.value !== '' ? $page.url.searchParams.set('genre_name', inputGenreName.value) : $page.url.searchParams.delete('genre_name')
			inputFamilyName.value !== null && inputFamilyName.value !== '' ? $page.url.searchParams.set('family_name', inputFamilyName.value) : $page.url.searchParams.delete('family_name')

			window.history.replaceState({}, '',$page.url.pathname + $page.url.search)
		}

		const filters: object = {
			origin: inputOrigin.value,
			naming: {
				name: inputName.value,
				species_genre: {
					name: inputGenreName.value
				},
				species_family: {
					name: inputFamilyName.value
				}
			}
		};

		speciesConstraints.where = ConstraintBuilder.buildConstraintsFilters(filters);

		const listOfFilteredSpeciesFromAdapter: Result = await speciesUseCase.getListOfSpecies('', speciesConstraints);
		if (listOfFilteredSpeciesFromAdapter.isFailed()) {
			for (const error of listOfFilteredSpeciesFromAdapter.errors) {
				console.log(error);
			}
			listOfSpecies = []
			loadingSpecies = false;
			return listOfSpecies
		}

		listOfSpecies = listOfFilteredSpeciesFromAdapter.content;
		loadingSpecies = false;

		return listOfSpecies;
	}

	async function resetFilters(){
		inputOrigin.value = null
		inputName.value = null
		inputGenreName.value = null
		inputFamilyName.value = null

		await loadSpeciesWithFilter()
	}

	async function loadFilters(): Promise<object> {
		const listOfSpeciesFamilies: Result = await speciesFamiliesUseCase.getListOfSpeciesFamilies('', {});
		if (listOfSpeciesFamilies.isFailed()) {
			for (const error of listOfSpeciesFamilies.errors) {
				console.log(error);
			}
		}

		const listOfSpeciesGenres: Result = await speciesGenresUseCase.getListOfSpeciesGenres('', {});
		if (listOfSpeciesGenres.isFailed()) {
			for (const error of listOfSpeciesGenres.errors) {
				console.log(error);
			}
		}

		const listOfSpeciesOrigins: Result = await speciesUseCase.getListOfSpeciesOrigins('');
		if (listOfSpeciesOrigins.isFailed()) {
			for (const error of listOfSpeciesOrigins.errors) {
				console.log(error);
			}
		}

		const sanitizedListOfSpeciesOrigins: Array<BaseOptionModel> = listOfSpeciesOrigins.content.map((origin: string) => new BaseOptionModel(Species.getTranslatedOrigin(origin.name), origin.name));

		listOfFilters =  {
			listOfSpeciesFamilies: listOfSpeciesFamilies.content,
			listOfSpeciesGenres: listOfSpeciesGenres.content,
			listOfSpeciesOrigins: sanitizedListOfSpeciesOrigins
		};
	}

	let loadingSpecies: boolean = true;
	let loadingFilters: boolean = true;
	let listOfSpecies: Promise<Array<Species>> | Array<Species>;
	let listOfFilters: object;

	const labelGenreName: BaseLabelModel = new BaseLabelModel('Genre', 'genreName');
	const inputGenreName: BaseTextInputModel = new BaseTextInputModel('genreName');
	inputGenreName.datalist = 'listOfSpeciesGenres';

	const labelFamilyName: BaseLabelModel = new BaseLabelModel('Famille', 'familyName');
	const inputFamilyName: BaseTextInputModel = new BaseTextInputModel('familyName');
	inputFamilyName.datalist = 'listOfSpeciesFamilies';

	const labelName: BaseLabelModel = new BaseLabelModel('Nom', 'name');
	const inputName: BaseTextInputModel = new BaseTextInputModel('name');

	const labelOrigin: BaseLabelModel = new BaseLabelModel('Biotope', 'origin');
	const inputOrigin: BaseSelectInputModel = new BaseSelectInputModel('origin');

	const buttonSubmitFilter: BaseButtonModel = new BaseButtonModel('Filtrer')
		.setStyleOrThrowError('success');

	const buttonResetFilter: BaseButtonModel = new BaseButtonModel('Réinitialiser les filtres')
		.setStyleOrThrowError('secondary')
		.setTypeOrThrowError('button')

</script>

<section>
	<BaseHeader baseHeaderModel={header} />
</section>

<section class='flex-r justify-between'>
	<div class='bg-sky-800 w-full lg:flex-1 lg:species-list-fullscreen p-6'>
		<h2 class='text-2xl'>Filtres</h2>
		<form class='min-w-full' on:submit|preventDefault={loadSpeciesWithFilter}>
			<ul class="space-y-6">
				{#if loadingFilters}
				{:else}
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
								<BaseSelectInput baseSelectInputModel={inputOrigin} options={listOfFilters.listOfSpeciesOrigins} />
							</div>
						</li>

					<li class="flex-c space-y-2">
						<div class='flex-c space-y-6'>
							<BaseButton baseButtonModel={buttonSubmitFilter} />
							<BaseButton baseButtonModel={buttonResetFilter} on:click={resetFilters}/>
						</div>
					</li>
				{/if}
			</ul>
		</form>

	</div>
	<div class='flex-r lg:justify-start items-start lg:species-list-fullscreen p-6' style='flex:2'>
		{#if loadingSpecies}
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