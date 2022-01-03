<script lang="ts">
	export let listStyle: string ='square'

</script>

{#if listStyle === 'square'}
	<div class='flex-c max-w-xs m-3 rounded-b-lg hover:shadow-lg hover:shadow-indigo-500/50'>
		<img src='https://www.fishipedia.fr/wp-content/uploads/2015/11/Guppy-Tuxedo-Silver-725x483.jpg' alt=''>
		<div class='flex-c bg-gray-700 p-6 rounded-b-lg w-full'>
			<h2>Poecilia Reticulata</h2>
		</div>
	</div>
{:else}
	<div class='flex-r w-full h-32 m-3 rounded-r-lg hover:shadow-lg hover:shadow-indigo-500/50'>
		<img class='h-32 w-auto' src='https://www.fishipedia.fr/wp-content/uploads/2015/11/Guppy-Tuxedo-Silver-725x483.jpg' alt=''>
		<div style='flex: 2' class='bg-gray-700 rounded-r-lg h-full'>
			<div class='ml-6 mt-2'>

				<h2 class='text-2xl mb-3'>Poecilia Reticulata</h2>
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