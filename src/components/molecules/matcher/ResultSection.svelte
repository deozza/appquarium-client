<script lang="ts">
	import BaseHeader from '../../atoms/typography/header/BaseHeader.svelte';
	import Result from '../../../app/utils/useCasesResult/Result';
	import { resultHeader } from '../../pages/matcher/Modeles';

	export let speciesCompatibilityResult: Result
</script>

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