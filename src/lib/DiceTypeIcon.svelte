<script lang="ts">
  import { DICE_ASSETS_BY_TYPE } from '../constants/assets';

  export let typeOfDice;
  export let whiteFill = false;

  console.log('@@typeOfDice:', typeOfDice);
  const { asset, styleOverride } = DICE_ASSETS_BY_TYPE[typeOfDice];
</script>

<span
  class={`inline-block h-[36px] w-[32px] relative mb-[-12px]`}
  style={`background: ${
    whiteFill ? asset.whiteFill : asset.blackFill
  } no-repeat; ${styleOverride}`}
/>
