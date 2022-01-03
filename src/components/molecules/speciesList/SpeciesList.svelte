<script lang="ts">
	import {  } from '@fortawesome/fontawesome-free/js/all'

	import BaseHeader from '../../atoms/typography/header/BaseHeader.svelte';
	import BaseHeaderModel from '../../atoms/typography/header/BaseHeaderModel';

	import {goto} from '$app/navigation';

	export let listStyle: string ='square'

	const header: BaseHeaderModel = new BaseHeaderModel('Poecilia Reticulata')
		.setSizeOrTrowError("h3")
		.setDisplaySizeOrTrowError('lg')
		.setColorOrTrowError('white')

</script>

{#if listStyle === 'square'}
	<div class='flex-c max-w-xs m-3 rounded-b-lg hover:shadow-lg hover:shadow-indigo-500/50 hover:cursor-pointer' on:click={(e) => goto('/species/coucou-oui')}>
		<img src='https://www.fishipedia.fr/wp-content/uploads/2015/11/Guppy-Tuxedo-Silver-725x483.jpg' alt=''>
		<div class='flex-r justify-around bg-gray-700 p-6 rounded-b-lg w-full' >
			<BaseHeader baseHeaderModel={header} />
			<i class='fa-solid fa-fish fa-lg' style='color: cyan;'></i>
		</div>
	</div>
{:else}
	<div class='flex-r w-full h-32 m-3 rounded-r-lg hover:shadow-lg hover:shadow-indigo-500/50 hover:cursor-pointer' on:click={(e) => goto('/species/coucou-oui')}>
		<img class='h-32 w-auto' src='https://www.fishipedia.fr/wp-content/uploads/2015/11/Guppy-Tuxedo-Silver-725x483.jpg' alt=''>
		<div style='flex: 2' class='bg-gray-700 rounded-r-lg h-full'>
			<div class='ml-6 mt-2'>

				<BaseHeader baseHeaderModel={header} />
				<div class='flex-r justify-start space-x-6 items-start'>
					<ul>
						<li>Difficulté: débutant</li>
						<li>Origine : amérique centrale</li>
					</ul>
					<ul>
						<li>pH: 6-8</li>
						<li>GH: 10-20</li>
						<li>Température: 24-28</li>
					</ul>

				</div>
			</div>

		</div>
	</div>
{/if}