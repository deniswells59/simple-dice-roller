<script>
  export let cssClass = '';
</script>

<div class={`flex content-center justify-center flex-wrap px-[10px] ${cssClass}`} {...$$restProps}>
  <slot />
</div>
