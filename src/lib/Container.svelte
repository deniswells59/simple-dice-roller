<script lang="ts">
  export let testId = '';
  export let header = '';

  import eyeIcon from '../assets/eye-off.svg';

  let contentVisible = true;

  const toggleVisibility = () => {
    contentVisible = !contentVisible;
  };
</script>

<div
  class={`flex content-center justify-start flex-wrap px-[10px] ${
    $$props.class ? $$props.class : ''
  }`}
  data-testid={testId}
>
  {#if header}
    <div class="flex flex-col w-full my-4">
      <div class="flex flex-row w-full items-center">
        <h1 class="flex text-2xl self-start">{header}</h1>
        <img
          class="w-8 h-8 opacity-40 ml-3 hover:opacity-100 hover:cursor-pointer"
          on:click={toggleVisibility}
          alt="Visibility Icon"
          src={eyeIcon}
        />
      </div>
      <hr class="w-full h-0.5 border-none bg-black" />
    </div>
  {/if}

  {#if contentVisible}
    <slot />
  {/if}
</div>
