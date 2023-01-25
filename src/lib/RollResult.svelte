<script lang="ts">
  import {
    MODIFIER_OPERATION,
    MODIFIER_SYMBOLS,
    RollResult,
  } from '../types/Roll';

  import DiceTypeIcon from './DiceTypeIcon.svelte';

  export let rollResult: RollResult;
  export let primary = false;

  const STYLE_NONE = 'none';
  const OPACITY_0 = '0';
  const OPACITY_1 = '1';

  // Needed this here even though it's repeated in tailwind.config
  // Not sure why. I'll chalk it up to tailwind being weird
  const MOVE_IN_ANIMATION = 'moveInFromRight .35s ease-out';

  let animationState = STYLE_NONE;
  let opacityState = OPACITY_0;

  const addModifierToString = ({
    stringToConcat,
    modifierOperation,
    modifier,
  }) => {
    if (modifierOperation !== MODIFIER_OPERATION.NONE) {
      const modSymbol = MODIFIER_SYMBOLS[modifierOperation];

      return stringToConcat.concat(`${modSymbol}`, modifier.toString());
    } else {
      return stringToConcat;
    }
  };

  const createEquationString = ({
    list,
    modifierOperation,
    modifier,
  }): string => {
    let rollsAdded = list.join('+');

    const equation = addModifierToString({
      stringToConcat: rollsAdded,
      modifierOperation,
      modifier,
    });

    return equation;
  };

  const createLegendString = ({
    list,
    diceType,
    modifierOperation,
    modifier,
  }): string => {
    const diceAmount = list.length;
    const diceTypeText = `d${diceType}`;

    let diceString = `${diceAmount}${diceTypeText}`;

    const legend = addModifierToString({
      stringToConcat: diceString,
      modifierOperation,
      modifier,
    });

    return legend;
  };

  const animateElement = () => {
    // Remove Animation (Resets element)
    animationState = STYLE_NONE;
    opacityState = OPACITY_0;

    setTimeout(() => {
      // Add Animation (Triggers animation)
      animationState = MOVE_IN_ANIMATION;
      opacityState = OPACITY_1;
    }, 50);
  };

  // Reactive Statements
  $: {
    if (rollResult && primary) {
      animateElement();
    }
  }
  $: ({ name, diceType, list, modifierOperation, modifier, value } =
    rollResult);
  $: {
    console.log('@@ RENDERING NEW RESULT - diceType: ', rollResult.diceType);
  }
</script>

<li
  class={`flex justify-center items-center shadow-lg my-1 border bg-black text-white last:w-80 max-w-80 ${
    primary && 'animate-moveInFromRight'
  }`}
  style={primary
    ? `animation: ${animationState}; opacity: ${opacityState};`
    : ''}
>
  <div
    class={`flex flex-row justify-between w-full h-full overflow-hidden my-2 mx-3 ${
      primary && 'm-4'
    }`}
  >
    <div class="flex flex-col overflow-hidden justify-center">
      <div class="text-sm ">{name}</div>

      {#if primary}
        <div
          class="text-lg my-2 overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {#key diceType}
            <DiceTypeIcon typeOfDice={diceType} whiteFill={true} />
          {/key}
          <div class="inline tracking-[.25em]">
            {createEquationString({ list, modifierOperation, modifier })}
          </div>
        </div>
        <div class="text-stone-700">
          {createLegendString({ list, diceType, modifierOperation, modifier })}
        </div>
      {/if}
    </div>

    <div
      class={`flex justify-center items-center ml-4 text-lg ${
        primary && 'ml-4 text-4xl'
      }`}
    >
      <div class={`mx-1 bg-white w-px ${primary ? 'h-12' : 'h-6'}`} />
      <div class={`ml-4 ${primary && 'mx-1'}`}>{value}</div>
    </div>
  </div>
</li>
