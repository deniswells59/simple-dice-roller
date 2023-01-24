<script lang="ts">
  import { MODIFIER_SYMBOLS } from '../types/Roll';

  export let rollResult;
  export let animate = true;

  const STYLE_NONE = 'none';
  const OPACITY_0 = '0';
  const OPACITY_1 = '1';
  const MOVE_IN_ANIMATION = 'moveInFromRight .25s ease-out';

  let animationState = STYLE_NONE;
  let opacityState = OPACITY_0;

  let { name, diceType, list, modifierOperation, modifier, value } = rollResult;

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

  $: {
    if (rollResult && animate) {
      animateElement();
      console.log('@@rollResult', rollResult);
    }
  }
  // $: rollResult && ({ name } = rollResult);
</script>

<!-- last:h-16 h-8" -->
<li
  class="flex justify-center items-center shadow-lg my-4 border bg-[#172026] text-white last:w-80 w-40"
  style={animate ? `animation: ${animationState}; opacity: ${opacityState};` : ''}
>
  <div class="flex flex-row justify-between m-4 w-full h-full overflow-hidden">
    <div class="flex flex-col overflow-hidden">
      <div class="text-sm">{name}</div>
      <div class="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
        <div class="inline">{`D${diceType}`}</div>
        <div class="inline">{list.join(' + ')}</div>
      </div>
      <div class="text-stone-700">
        {`${list.length}d${diceType}${MODIFIER_SYMBOLS[modifierOperation]}${modifier}`}
      </div>
    </div>

    <div class="flex justify-center items-center text-2xl mx-4">
      <div class="mx-1">=</div>
      <div class="mx-1 ml-4">{value}</div>
    </div>
  </div>
</li>
