<script lang="ts">
  export let onClickHandler = () => {};
  export let primaryAction = false;
  export let testId = '';
</script>

<button
  class={`p-2 border-2 border-black ${primaryAction ? 'bg-black text-white' : ''} ${
    $$props.class ? $$props.class : ''
  }`}
  data-testid={testId}
  on:click={onClickHandler}><slot /></button
>
