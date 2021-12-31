<script lang="ts">
    import BaseTextInputModel from "./BaseTextInputModel";

    export let baseTextInputModel: BaseTextInputModel

    function handleInput(e) {
        baseTextInputModel.value = e.target.value;
    }
</script>

<div>
    <input
            class="w-full py-2 px-3 border rounded-md border-black px-2"
            class:border-red-500={baseTextInputModel.error === true}
            class:text-red-500={baseTextInputModel.error === true}
            id={baseTextInputModel.id}
            list={baseTextInputModel.datalist !== null ? baseTextInputModel.datalist : null}
            maxlength={baseTextInputModel.maxlength}
            minlength={baseTextInputModel.minlength}
            name={baseTextInputModel.name}
            on:change
            on:focusout
            on:input={handleInput}
            placeholder={baseTextInputModel.placeholder}
            readonly={baseTextInputModel.readonly === true ? 'readonly' : ''}
            required={baseTextInputModel.required === true ? 'required' : ''}
            type={baseTextInputModel.type}
            value={baseTextInputModel.value}
    >

    {#if baseTextInputModel.error}
        <span class="text-red-500">{baseTextInputModel.errorMessage}</span>
    {/if}
</div>

<style>
    div {
        flex: 2
    }
</style>