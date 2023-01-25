<script lang="ts">
  import { MODIFIER_OPERATION, MODIFIER_SYMBOLS } from '../types/Roll';

  export let rollResult;
  export let animate = true;

  const STYLE_NONE = 'none';
  const OPACITY_0 = '0';
  const OPACITY_1 = '1';

  // Needed this here even though it's repeated in tailwind.config
  // Not sure why. I'll chalk it up to tailwind being weird
  const MOVE_IN_ANIMATION = 'moveInFromRight .35s ease-out';

  let animationState = STYLE_NONE;
  let opacityState = OPACITY_0;

  const addModifierToString = ({ stringToConcat, modifierOperation, modifier }) => {
    if (modifierOperation !== MODIFIER_OPERATION.NONE) {
      const modSymbol = MODIFIER_SYMBOLS[modifierOperation];

      return stringToConcat.concat(`${modSymbol}`, modifier.toString());
    } else {
      return stringToConcat;
    }
  };

  const createEquationString = ({ list, modifierOperation, modifier }): string => {
    let rollsAdded = list.join('+');

    const equation = addModifierToString({
      stringToConcat: rollsAdded,
      modifierOperation,
      modifier,
    });

    return equation;
  };

  const createLegendString = ({ list, diceType, modifierOperation, modifier }): string => {
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
    if (rollResult && animate) {
      animateElement();
    }
  }
  $: ({ name, diceType, list, modifierOperation, modifier, value } = rollResult);
</script>

<li
  class={`flex justify-center items-center shadow-lg my-4 border bg-black text-white last:w-80 w-40 ${
    animate && 'animate-moveInFromRight'
  }`}
  style={animate ? `animation: ${animationState}; opacity: ${opacityState};` : ''}
>
  <div class="flex flex-row justify-between m-4 w-full h-full overflow-hidden">
    <div class="flex flex-col overflow-hidden">
      <div class="text-sm">{name}</div>
      <div class="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
        <div class="inline">{`D${diceType}`}</div>
        <div class="inline tracking-[.25em]">
          {createEquationString({ list, modifierOperation, modifier })}
        </div>
      </div>
      <div class="text-stone-700">
        {createLegendString({ list, diceType, modifierOperation, modifier })}
      </div>
    </div>

    <div class="flex justify-center items-center text-2xl mx-4">
      <div class="mx-1">=</div>
      <div class="mx-1 ml-4">{value}</div>
    </div>
  </div>
</li>
