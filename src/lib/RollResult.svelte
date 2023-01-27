<script lang="ts">
  import {
    MODIFIER_OPERATION,
    MODIFIER_SYMBOLS,
    RollResult,
  } from '../types/Roll';

  import DiceTypeIcon from '../assets/icons/components/DiceTypeIcon.svelte';

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

  const getModifierList = ({ modifierOperation, modifier }) => {
    if (modifierOperation !== MODIFIER_OPERATION.NONE) {
      const modSymbol = MODIFIER_SYMBOLS[modifierOperation];

      return [modSymbol, modifier];
    } else {
      return [];
    }
  };

  const createEquationString = ({
    list,
    modifierOperation,
    modifier,
  }): string[] => {
    // Start with list: ['1', '2', '3']
    // Create tuples: [['1', '+'], ['2', '+'], ['3', '+']]
    const listOfNumAndSymbolTuples = list.map((num: string) => [num, '+']);

    // Flatten tuples: ['1', '+', '2', '+', '3', '+']
    const flattenedNumAndSymbolTuples = [].concat(...listOfNumAndSymbolTuples);

    // Remove hanging addition symbol: ['1', '+', '2', '+', '3']
    const removedLastSymbol = flattenedNumAndSymbolTuples.slice(0, -1);

    const modifierList = getModifierList({
      modifierOperation,
      modifier,
    });

    const equation = [...removedLastSymbol, ...modifierList];

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

    const modifierList = getModifierList({
      modifierOperation,
      modifier,
    });

    const modifierString = modifierList.join('');
    const legend = `${diceString}${modifierString}`;

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
          <div class="inline">
            {#each createEquationString( { list, modifierOperation, modifier } ) as term}
              <span class="mx-0.5 first:ml-0">{term}</span>
            {/each}
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
