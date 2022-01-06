<script lang="ts">
	import {headerMain, headerLastSpeciesComment, headerLastSpecies, headerDataComment, paragraphDataComment, listStyle, dummyLoading} from '../components/pages/index/Modeles';

	import BaseHeader from '../components/atoms/typography/header/BaseHeader.svelte';
	import SpeciesList from '../components/molecules/speciesList/SpeciesList.svelte';
	import Species from '../app/species/global/entities/Species';
	import SpeciesUseCase from '../app/species/global/useCases/UseCase';
	import Result from '../app/utils/useCasesResult/Result';
	import SpeciesListLoading from '../components/molecules/speciesList/SpeciesListLoading.svelte';
	import BaseParagraph from '../components/atoms/typography/paragraph/BaseParagraph.svelte';
	import Stats from '../components/molecules/index/stats/Stats.svelte';

	export let listOfSpecies: Array<Species> = [];

	const speciesUseCase: SpeciesUseCase = new SpeciesUseCase();

	async function getSpecies(): Promise<Array<Species>> {
		const listOfSpeciesFromHasura: Result = await speciesUseCase.getListOfSpecies('');
		if (listOfSpeciesFromHasura.isFailed()) {
			for (const error of listOfSpeciesFromHasura.errors) {
				console.log(error);
			}
			return listOfSpecies;
		}
		listOfSpecies = listOfSpeciesFromHasura.content;

		return listOfSpecies;
	}
</script>

<section class='flex-c w-full h-[90vh] space-y-6'>
	<BaseHeader baseHeaderModel={headerMain} />
	<p class='text-semibold text-xl lg:text-3xl text-center'>Gérer un aquarium n'a jamais été aussi simple</p>
	<Stats />
</section>

<section class='flex-r justify-between w-full h-full lg:h-[50vh]'>
	<div class='w-full lg:w-1/2 h-full order-1 lg:order-1 flex-c'>
		<BaseHeader baseHeaderModel={headerLastSpeciesComment} />
	</div>
	<div class='w-full lg:w-1/2 h-full order-2 lg:order-2 flex-c bg-sky-800'>
		<BaseHeader baseHeaderModel={headerLastSpecies} />
		<div class='flex-r w-full'>
			{#await getSpecies()}
				<SpeciesListLoading {listStyle} {dummyLoading}/>
			{:then listOfSpecies}
				{#each listOfSpecies as species }
					<SpeciesList {listStyle} {species}/>
				{/each}
				<a href='/species'>
					<div class='flex-c w-48 m-3 rounded-b-lg transition-shadow duration-300'>
						<div class="flex-c bg-gray-400 w-full h-32">
							<i class='fa fa-arrow-circle-right fa-4x text-gray-500'></i>
						</div>
						<div class='flex-r justify-around bg-gray-500 p-6 h-20 rounded-b-lg w-full' >
							<div class="flex-c">
								<p class='text-lg font-bold'>Voir plus</p>
							</div>
						</div>
					</div>
				</a>
			{:catch errors}
			{/await}
		</div>
	</div>
</section>

<section class='flex-r justify-between w-full h-full lg:h-[50vh]'>
	<div class='w-full lg:w-1/2 h-full order-1 lg:order-2 flex-c'>
		<BaseHeader baseHeaderModel={headerDataComment} />
		<BaseParagraph baseParagraphModel={paragraphDataComment} />
	</div>
	<div class='w-full lg:w-1/2 h-full order-2 lg:order-1 flex-c bg-teal-800'>
		<div class='flex-r w-full'>

		</div>
	</div>
</section>