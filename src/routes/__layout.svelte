<script lang="ts">
	import "../app.css"
	import {  } from '@fortawesome/fontawesome-free/js/all'
	import Navbar from '../components/molecules/navbar/Navbar.svelte'

</script>

<main class='bg-gray-900'>
	<Navbar/>
	<div class='content'>
		<slot></slot>
	</div>
</main>