<script>
  export let testId = '';
</script>

<div
  class={`flex content-center justify-center flex-wrap px-[10px] ${
    $$props.class ? $$props.class : ''
  }`}
  data-testid={testId}
>
  <slot />
</div>
