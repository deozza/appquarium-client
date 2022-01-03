<script lang="ts">

	import NavbarModel from './NavbarModel';
	import NavbarLink from './link/NavbarLink.svelte';
	import NavbarLinkModel from './link/NavbarLinkModel';
	import { page } from '$app/stores';

	export let navbarModele: NavbarModel = new NavbarModel('home');
	navbarModele
		.addLink(new NavbarLinkModel('/', 'Accueil', 'home'))
		.addLink(new NavbarLinkModel('/species', 'Espèces', 'species'))

	function mobileMenuHandler() {
		navbarModele.showMobileMenu = !navbarModele.showMobileMenu;
	}

</script>

<nav class="bg-gray-800 mb-6">
	<div class="px-2 sm:px-6 lg:px-8">
		<div class="relative flex items-center justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" on:click={mobileMenuHandler}>
					<span class="sr-only">Open main menu</span>
					<!--
						Icon when menu is closed.

						Heroicon name: outline/menu

						Menu open: "hidden", Menu closed: "block"
					-->
					<svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
					<!--
						Icon when menu is open.

						Heroicon name: outline/x

						Menu open: "block", Menu closed: "hidden"
					-->
					<svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0 flex items-center">
					<p class='text-white font-bold text-2xl'>Appquarium</p>
				</div>
				<div class="w-full hidden sm:block sm:ml-6">
					<div class="w-full justify-center flex space-x-4">
						{#each navbarModele.links as link}
							<NavbarLink navbarLink={link} currentRoute={$page.url.pathname}/>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if navbarModele.showMobileMenu === true}
		<!-- Mobile menu, show/hide based on menu state. -->
		<div class="sm:hidden" id="mobile-menu">
			<div class="px-2 pt-2 pb-3 space-y-1">
				{#each navbarModele.links as link}
					<NavbarLink navbarLink={link} currentRoute={$page.url.pathname} isMobile={true}/>
				{/each}
			</div>
		</div>
	{/if}
</nav>
