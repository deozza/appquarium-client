<script lang="ts">
    import BasePillModel from "./BasePillModel";

    export let basePillModel: BasePillModel
</script>

<span class="pill pill-{basePillModel.style}">
    {basePillModel.content}
</span>