<script>
  import { rolls } from '../store';

  const watch = rolls.subscribe((rolls) => {
    console.log('rolls:', rolls);
  });
</script>

{#if $rolls.length}
  <ul class="absolute bottom-10 right-10">
    {#each $rolls.slice(-3) as roll}
      <li>
        <div class="flex justify-center items-center shadow-lg my-4 w-80 h-16 border">
          <p>{roll.value}</p>
        </div>
      </li>
    {/each}
  </ul>
{/if}
