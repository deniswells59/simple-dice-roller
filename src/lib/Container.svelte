<script>
  export let cssClass = '';
  export let testId = '';
</script>

<div
  class={`flex content-center justify-center flex-wrap px-[10px] ${cssClass}`}
  {...$$restProps}
  data-testid={testId}
>
  <slot />
</div>
