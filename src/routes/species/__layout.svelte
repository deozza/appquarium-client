<script lang="ts">
	import "../../app.css"
	import {  } from '@fortawesome/fontawesome-free/js/all'
	import Navbar from '../../components/molecules/navbar/Navbar.svelte'

</script>

<main class='bg-gray-900 min-h-screen'>
	<Navbar/>
	<div class='content px-2 sm:px-6 lg:px-8'>
		<slot></slot>
	</div>
</main>