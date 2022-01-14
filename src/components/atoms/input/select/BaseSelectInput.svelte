<script lang="ts">

    import BaseSelectInputModel from '../select/BaseSelectInputModel';
    import BaseOptionModel from './BaseOptionModel';

    export let baseSelectInputModel: BaseSelectInputModel
    export let options: Array<BaseOptionModel>

    function handleInput(e) {
        baseSelectInputModel.value = e.target.value;
    }
</script>

<div>
    <select
      class="w-full py-2 px-3 border rounded-md border-black px-2 text-black"
      class:border-red-500={baseSelectInputModel.error === true}
      class:text-red-500={baseSelectInputModel.error === true}
      id={baseSelectInputModel.id}
      name={baseSelectInputModel.name}
      on:change={handleInput}
      on:focusout
      readonly={baseSelectInputModel.readonly === true ? 'readonly' : ''}
      required={baseSelectInputModel.required === true ? 'required' : ''}
    >
        <option value=''></option>
        {#each options as option, index}
            <option value={option.value}>
                { option.name }
            </option>
        {/each}
    </select>

    {#if baseSelectInputModel.error}
        <span class="text-red-500">{baseSelectInputModel.errorMessage}</span>
    {/if}
</div>

<style>
    div {
        flex: 2
    }
</style>