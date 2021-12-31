<script lang="ts">
    import BaseLabelModel from "./BaseLabelModel";

    export let baseLabelModel: BaseLabelModel
</script>

<label class="flex-1" for="{baseLabelModel.forInput}">{baseLabelModel.name}</label>
