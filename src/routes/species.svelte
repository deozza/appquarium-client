<script lang="ts">

	import BaseHeaderModel from '../components/atoms/typography/header/BaseHeaderModel';
	import BaseHeader from '../components/atoms/typography/header/BaseHeader.svelte';
	import SpeciesList from '../components/molecules/speciesList/SpeciesList.svelte';

	const header: BaseHeaderModel = new BaseHeaderModel('Liste des espèces')
		.setDisplaySizeOrTrowError('xxl')
		.setSizeOrTrowError('h2')
		.setColorOrTrowError('white')

	export let listStyle: string = 'square'

</script>

<section class='flex-c space-y-6 w-full'>
	<BaseHeader baseHeaderModel={header} />
	<div class='flex-r max-w-full'>
		<SpeciesList {listStyle} />
		<SpeciesList {listStyle} />
		<SpeciesList {listStyle} />
		<SpeciesList {listStyle} />
		<SpeciesList {listStyle} />
	</div>
</section>

