<script>
  export let testId = '';
</script>

<div
  class={`flex content-center justify-center flex-wrap px-[10px] ${$$props.class && $$props.class}`}
  {...$$restProps}
  data-testid={testId}
>
  <slot />
</div>
