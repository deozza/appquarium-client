<script lang="ts">
	export let listStyle: string ='square'
	export let dummyLoading: number = 1

</script>
{#each Array(dummyLoading) as _, i}
	{#if listStyle === 'square'}

	<div class='animate-pulse flex-c w-48 m-3 rounded-b-lg'>
		<div class="flex-c bg-gray-400 w-full h-32">
			<i class='fa fa-camera-retro fa-6x'></i>
		</div>
		<div class='flex-r justify-around bg-gray-700 p-6 h-20 rounded-b-lg w-full' >
			<div class="flex-1 space-y-6 py-1">
				<div class="space-y-3">
					<div class="grid grid-cols-3 gap-4">
						<div class="h-2 bg-white rounded col-span-2"></div>
						<div class="h-2 bg-white rounded col-span-1"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	{:else}
		<div class='animate-pulse flex-r w-full h-32 m-3 rounded-r-lg'>
			<div class="flex-c bg-gray-400 h-32 w-48">
				<i class='fa fa-camera-retro fa-6x'></i>
			</div>
			<div style='flex: 2' class='bg-gray-700 rounded-r-lg h-full'>
				<div class='ml-6 mt-2'>

					<div class="flex-1 space-y-6 py-1">
						<div class="space-y-3">
							<div class="grid grid-cols-3 gap-4">
								<div class="h-2 bg-white rounded col-span-1"></div>
							</div>
							<div class="grid grid-cols-4 gap-4">
								<div class="h-2 bg-white rounded col-span-1"></div>
								<div class="h-2 bg-white rounded col-span-1"></div>
							</div>
							<div class="grid grid-cols-4 gap-4">
								<div class="h-2 bg-white rounded col-span-1"></div>
								<div class="h-2 bg-white rounded col-span-1"></div>
							</div>

							<div class="grid grid-cols-4 gap-4">
								<div class="h-2 bg-gray-700 rounded col-span-1"></div>
								<div class="h-2 bg-white rounded col-span-1"></div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	{/if}
{/each}