<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  export let onClickHandler = () => {};
  export let primaryAction = false;
  export let testId = '';
</script>

<button
  class={`p-2 border-2 border-black hover:cursor-pointer -my-[1px] md:m-2 md:w-80 ${
    primaryAction
      ? 'bg-black text-white hover:bg-[#3c3c3c]'
      : 'bg-white hover:bg-[#d1d1d1]'
  } ${$$props.class ? $$props.class : ''}`}
  data-testid={testId}
  on:click={onClickHandler}><slot /></button
>
