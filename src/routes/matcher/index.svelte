<script lang="ts">
	import {header, speciesLeftHeader, resultHeader, speciesRightHeader, headerDataWaterConstraints} from '../../components/pages/matcher/Modeles';
	import BaseHeader from '../../components/atoms/typography/header/BaseHeader.svelte';


</script>
<section>
	<BaseHeader baseHeaderModel={header} />
</section>

<div class='lg:hidden bg-teal-800 rounded-lg'>
 <section class='flex-r justify-between'>
	 <div class='flex-c w-1/3 ml-3'>
		 <BaseHeader baseHeaderModel={speciesLeftHeader} />
		 <img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Poecilia_reticulata_-_Guppy%2C_male%2C_cobra-green_morph.jpg" alt="alt">
		 <a href='' class='underline'>En savoir plus</a>
	 </div>
	 <div class='flex-c w-1/3 mr-3'>
		 <BaseHeader baseHeaderModel={speciesRightHeader} />
		 <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Corydoras_panda_Dornenwolf.jpg" alt="alt">
		 <a href='' class='underline'>En savoir plus</a>
	 </div>
 </section>

 <section class='w-full p-3 flex-c'>
	 <BaseHeader baseHeaderModel={headerDataWaterConstraints} />
	 <i class='fa fa-times-circle fa-3x text-red-500 mb-3'></i>

	 <div class='flex-r w-full justify-between'>
		 <div class='flex-c'>
			 <p>6 - 8</p>
			 <p>10 - 20</p>
			 <p>24 - 28°C</p>
		 </div>
		 <div class='flex-c'>
			 <p><span class='font-semibold'>pH</span></p>
			 <p><span class='font-semibold'>GH</span></p>
			 <p><span class='font-semibold'>Température</span></p>
		 </div>
		 <div class='flex-c'>
			 <p>6 - 8</p>
			 <p>10 - 20</p>
			 <p>24 - 28°C</p>
		 </div>
	 </div>
 </section>

	<section class='w-full p-3 flex-c'>
		<BaseHeader baseHeaderModel={headerDataWaterConstraints} />
		<i class='fa fa-check-circle fa-3x text-green-500 mb-3'></i>

		<div class='flex-r w-full justify-between'>
			<div class='flex-c'>
				<p>Actif</p>
				<p>Surface</p>
				<p>Omnivore</p>
			</div>
			<div class='flex-c'>
				<p><span class='font-semibold'>Comportement</span></p>
				<p><span class='font-semibold'>Habitat</span></p>
				<p><span class='font-semibold'>Régime</span></p>
			</div>
			<div class='flex-c'>
				<p>Timide</p>
				<p>Fond</p>
				<p>Végétarien</p>
			</div>
		</div>
	</section>

	<section class='w-full p-3 flex-c'>
		<BaseHeader baseHeaderModel={headerDataWaterConstraints} />
		<i class='fa fa-warning fa-3x text-orange-500 mb-3'></i>

		<div class='flex-r w-full justify-between'>
			<div class='flex-c'>
				<p>Actif</p>
				<p>Surface</p>
				<p>Omnivore</p>
			</div>
			<div class='flex-c'>
				<p><span class='font-semibold'>Comportement</span></p>
				<p><span class='font-semibold'>Habitat</span></p>
				<p><span class='font-semibold'>Régime</span></p>
			</div>
			<div class='flex-c'>
				<p>Timide</p>
				<p>Fond</p>
				<p>Végétarien</p>
			</div>
		</div>
	</section>
</div>

<div class='lg:block hidden'>
	<div class='flex-c'>
		<section class='flex-r justify-around w-full p-6'>
			<div class='w-1/5 flex-c'>
				<BaseHeader baseHeaderModel={speciesLeftHeader} />
				<img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Poecilia_reticulata_-_Guppy%2C_male%2C_cobra-green_morph.jpg" alt="alt">
				<a href='' class='underline'>En savoir plus</a>
			</div>
			<div class='w-1/5'>

			</div>
			<div class='w-1/5 flex-c'>
				<BaseHeader baseHeaderModel={speciesRightHeader} />
				<img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Corydoras_panda_Dornenwolf.jpg" alt="alt">
				<a href='' class='underline'>En savoir plus</a>
			</div>
		</section>

		<section class='flex-r'>
			<BaseHeader baseHeaderModel={resultHeader} />
		</section>

		<section class='flex-r justify-around w-full p-6'>
			<div class='bg-gray-500 w-1/5 p-3 flex-c rounded-lg'>
				<div class='flex-c items-start w-full'>
					<p><span class='font-semibold'>pH : </span>entre 6 et 8</p>
					<p><span class='font-semibold'>GH : </span>entre 10 et 20</p>
					<p><span class='font-semibold'>Température : </span>entre 24 et 28°C</p>
				</div>
			</div>
			<div class='bg-teal-800 w-1/5 p-3 flex-c rounded-lg'>
				<BaseHeader baseHeaderModel={headerDataWaterConstraints} />
				<div class='flex-c w-full'>
					<i class='fa fa-times-circle fa-3x text-red-500'></i>
				</div>
			</div>
			<div class='bg-gray-500 w-1/5 p-3 flex-c rounded-lg'>
				<div class='flex-c items-start w-full'>
					<p><span class='font-semibold'>pH : </span>entre 6 et 8</p>
					<p><span class='font-semibold'>GH : </span>entre 10 et 20</p>
					<p><span class='font-semibold'>Température : </span>entre 24 et 28°C</p>
				</div>
			</div>
		</section>

		<section class='flex-r justify-around w-full p-6'>
			<div class='bg-gray-500 w-1/5 p-3 flex-c rounded-lg'>
				<div class='flex-c items-start w-full'>
					<p><span class='font-semibold'>pH : </span>entre 6 et 8</p>
					<p><span class='font-semibold'>GH : </span>entre 10 et 20</p>
					<p><span class='font-semibold'>Température : </span>entre 24 et 28°C</p>
				</div>
			</div>
			<div class='bg-teal-800 w-1/5 p-3 flex-c rounded-lg'>
				<div class='flex-c w-full'>
					<BaseHeader baseHeaderModel={headerDataWaterConstraints} />
					<i class='fa fa-times-circle fa-3x text-red-500'></i>
				</div>
			</div>
			<div class='bg-gray-500 w-1/5 p-3 flex-c rounded-lg'>
				<div class='flex-c items-start w-full'>
					<p><span class='font-semibold'>pH : </span>entre 6 et 8</p>
					<p><span class='font-semibold'>GH : </span>entre 10 et 20</p>
					<p><span class='font-semibold'>Température : </span>entre 24 et 28°C</p>
				</div>
			</div>
		</section>
	</div>

</div>
