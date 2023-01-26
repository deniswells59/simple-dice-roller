<script lang="ts">
  export let testId = '';
  export let header = '';
  export let hasSecondaryAction = false;
  export let secondaryAction = () => {};

  import VisibleIcon from '../assets/icons/components/VisibleIcon.svelte';
  import NotVisibleIcon from '../assets/icons/components/NotVisibleIcon.svelte';
  import CogIcon from '../assets/icons/components/CogIcon.svelte';

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
      <div class="flex flex-row w-full items-center justify-between">
        <div class="flex flex-row">
          <h1 class="flex text-2xl self-start">{header}</h1>

          {#if hasSecondaryAction}
            <div
              class="flex items-center w-8 h-8 opacity-40 ml-3 hover:opacity-100 hover:cursor-pointer text-2xl"
              on:click={secondaryAction}
            >
              <CogIcon />
            </div>
          {/if}
        </div>

        <span
          class="w-8 h-8 opacity-40 ml-3 hover:opacity-100 hover:cursor-pointer text-2xl"
          on:click={toggleVisibility}
        >
          {#if contentVisible}
            <NotVisibleIcon />
          {:else}
            <VisibleIcon />
          {/if}
        </span>
      </div>
      <hr class="w-full h-0.5 border-none bg-black" />
    </div>
  {/if}

  {#if contentVisible}
    <slot />
  {/if}
</div>
