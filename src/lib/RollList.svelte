<script lang="ts">
  import { rollResults } from '../store';
  import type { RollResult } from '../types/Roll';
  import Button from './Button.svelte';

  const ROLL_LIST_TIMEOUT = 60000;
  let showRollList = false;
  let rollListTimeoutID;

  const handleRollListUpdate = (newRolls: RollResult[]) => {
    if (newRolls.length) {
      showRollList = true;

      if (rollListTimeoutID) {
        clearTimeout(rollListTimeoutID);
      }

      rollListTimeoutID = setTimeout(closeRollList, ROLL_LIST_TIMEOUT);
    }
  };

  const closeRollList = () => {
    showRollList = false;
    rollResults.set([]);
  };

  rollResults.subscribe(handleRollListUpdate);
</script>

{#if showRollList}
  <div class="absolute bottom-10 right-10 flex flex-col items-end">
    <ul class="flex flex-col items-end">
      {#each $rollResults.slice(-3) as roll}
        <li
          class="flex justify-center items-center shadow-lg my-4 border bg-black text-white last:w-80 last:h-16 w-40 h-8"
        >
          <div>
            <p>{roll.value}</p>
          </div>
        </li>
      {/each}
    </ul>
    <Button onClickHandler={() => closeRollList()} cssClass="border-0 w-auto">Clear X</Button>
  </div>
{/if}
