<script lang="ts">
	import NavbarLinkModel from './NavbarLinkModel';

	export let navbarLink: NavbarLinkModel
	export let currentRoute: string
	export let isMobile: boolean = false
</script>


{#if isMobile === true}
	<a href={navbarLink.href} class="{currentRoute === navbarLink.href ? 'bg-sky-900 text-white' : 'text-gray-300 hover:bg-sky-700 hover:text-white'} px-3 py-2 rounded-md text-base font-medium block " aria-current="{currentRoute === navbarLink.href ? 'page' : ''}">{navbarLink.title}</a>
{:else}
	<a href={navbarLink.href} class="{currentRoute === navbarLink.href ? 'bg-sky-900 text-white' : 'text-gray-300 hover:bg-sky-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium" aria-current="{currentRoute === navbarLink.href ? 'page' : ''}">{navbarLink.title}</a>
{/if}

