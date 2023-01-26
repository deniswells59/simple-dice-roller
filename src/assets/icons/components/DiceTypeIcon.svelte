<script lang="ts">
  import type { DiceList } from '../../../types/Roll';
  import { DICE_ASSETS_BY_TYPE } from '../diceIcons';

  export let typeOfDice: DiceList;
  export let whiteFill = false;

  const { asset, styleOverride } = DICE_ASSETS_BY_TYPE[typeOfDice];
</script>

<span
  class={`inline-block h-[36px] w-[32px] relative mb-[-12px]`}
  style={`background: ${
    whiteFill ? asset.whiteFill : asset.blackFill
  } no-repeat; ${styleOverride}`}
/>
