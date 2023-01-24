<script lang="ts">
  export let rollResult;
  export let animate = true;

  const STYLE_NONE = 'none';
  const OPACITY_0 = '0';
  const OPACITY_1 = '1';
  const MOVE_IN_ANIMATION = 'moveInFromRight .25s ease-out';

  let animationState = STYLE_NONE;
  let opacityState = OPACITY_0;

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
    }
  }
</script>

<li
  class="flex justify-center items-center shadow-lg my-4 border bg-black text-white last:w-80 last:h-16 w-40 h-8"
  style={animate ? `animation: ${animationState}; opacity: ${opacityState};` : ''}
>
  <div>
    <p>{rollResult.name}</p>
    <p>{rollResult.value}</p>
  </div>
</li>
