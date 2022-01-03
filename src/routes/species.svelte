<script lang="ts">

	import BaseHeaderModel from '../components/atoms/typography/header/BaseHeaderModel';
	import BaseHeader from '../components/atoms/typography/header/BaseHeader.svelte';
	import SpeciesList from '../components/molecules/speciesList/SpeciesList.svelte';
	import Species from '../app/species/global/entities/Species';
	import SpeciesUseCase from '../app/species/global/useCases/UseCase';
	import Result from '../app/utils/useCasesResult/Result';

	const header: BaseHeaderModel = new BaseHeaderModel('Liste des espèces')
		.setDisplaySizeOrTrowError('xxl')
		.setSizeOrTrowError('h2')
		.setColorOrTrowError('white')

	export let listStyle: string = 'square'

	export let listOfSpecies: Array<Species> = []

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase()

	async function getSpecies(): Promise<Array<Species>> {
		const listOfSpeciesFromHasura: Result = await speciesUseCase.getListOfSpecies('')
		if (listOfSpeciesFromHasura.isFailed()) {
			for (const error of listOfSpeciesFromHasura.errors) {
				console.log(error)
			}
			return listOfSpecies
		}
		listOfSpecies = listOfSpeciesFromHasura.content

		return listOfSpecies
	}

</script>

<section class='flex-c space-y-6 w-full'>
	<BaseHeader baseHeaderModel={header} />

	<div class='flex-r max-w-full'>
		{#await getSpecies()}
			<p>chargemenet</p>
			{:then listOfSpecies}
				{#each listOfSpecies as species }
					<SpeciesList {listStyle} {species}/>
				{/each}
			{:catch errors}
			{/await}

	</div>
</section>

