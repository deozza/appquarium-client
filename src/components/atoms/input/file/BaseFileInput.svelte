<script lang="ts">
    import BaseFileInputModel from "./BaseFileInputModel";

    export let baseFileInputModel: BaseFileInputModel

    function handleInput(e) {
        baseFileInputModel.value = e.target.files[0];
    }
</script>

<div>
    <input
            accept={baseFileInputModel.accept.join(',')}
            class="w-full py-2 px-3"
            class:border-red-500={baseFileInputModel.error === true}
            class:text-red-500={baseFileInputModel.error === true}
            id={baseFileInputModel.id}
            name={baseFileInputModel.name}
            on:change={handleInput}
            readonly={baseFileInputModel.readonly === true ? 'readonly' : ''}
            required={baseFileInputModel.required === true ? 'required' : ''}
            type="file"
    >

    {#if baseFileInputModel.error}
        <span class="text-red-500">{baseFileInputModel.errorMessage}</span>
    {/if}
</div>

<style>
    div {
        flex: 2
    }
</style>