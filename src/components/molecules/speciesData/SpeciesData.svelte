<script lang="ts">
	import BaseHeaderModel from '../../atoms/typography/header/BaseHeaderModel';
	import BaseHeader from '../../atoms/typography/header/BaseHeader.svelte';

	export let header: BaseHeaderModel;
</script>

<div class='bg-gray-500 w-full lg:w-1/3 m-3 lg:m-1 p-3 flex-c rounded-lg'>
	<BaseHeader baseHeaderModel={header} />
	<div class='flex-c items-start w-full'>
		<slot></slot>
	</div>
</div>