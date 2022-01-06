<script lang="ts">
    import BaseHeaderModel from "./BaseHeaderModel";
    import Theme from "../../../utils/Theme";

    export let baseHeaderModel: BaseHeaderModel
</script>

{#if baseHeaderModel.getSize() === Theme.HEADER_SIZES().h1 }
    <h1 class="{baseHeaderModel.getDisplaySize()} {baseHeaderModel.getColor()} {baseHeaderModel.additionalClasses} font-bold">{baseHeaderModel.getContent()}
        <slot></slot>
    </h1>
{:else if baseHeaderModel.getSize() === Theme.HEADER_SIZES().h2}
    <h2 class="{baseHeaderModel.getDisplaySize()} {baseHeaderModel.getColor()} {baseHeaderModel.additionalClasses} font-bold">{baseHeaderModel.getContent()}
        <slot></slot>
    </h2>
{:else if baseHeaderModel.getSize() === Theme.HEADER_SIZES().h3}
    <h3 class="{baseHeaderModel.getDisplaySize()} {baseHeaderModel.getColor()} {baseHeaderModel.additionalClasses} font-bold">{baseHeaderModel.getContent()}
        <slot></slot>
    </h3>
{:else if baseHeaderModel.getSize() === Theme.HEADER_SIZES().h4}
    <h4 class="{baseHeaderModel.getDisplaySize()} {baseHeaderModel.getColor()} {baseHeaderModel.additionalClasses} font-bold">{baseHeaderModel.getContent()}
        <slot></slot>
    </h4>
{:else if baseHeaderModel.getSize() === Theme.HEADER_SIZES().h5}
    <h5 class="{baseHeaderModel.getDisplaySize()} {baseHeaderModel.getColor()} {baseHeaderModel.additionalClasses} font-bold">{baseHeaderModel.getContent()}
        <slot></slot>
    </h5>
{:else}
    <h6 class="{baseHeaderModel.getDisplaySize()} {baseHeaderModel.getColor()} {baseHeaderModel.additionalClasses} font-bold">{baseHeaderModel.getContent()}
        <slot></slot>
    </h6>
{/if}
