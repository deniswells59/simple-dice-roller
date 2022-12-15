<script lang="ts">
  import { rolls } from '../store';
  import type { Roll } from '../types/Roll';

  const ROLL_LIST_TIMEOUT = 100000;
  let showRollList = false;
  let rollListTimeoutID;

  const handleRollListUpdate = (newRolls: Roll[]) => {
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
    rolls.set([]);
  };

  rolls.subscribe(handleRollListUpdate);
</script>

{#if showRollList}
  <div class="absolute bottom-10 right-10 flex flex-col items-end">
    <ul class="flex flex-col items-end">
      {#each $rolls.slice(-3) as roll}
        <li
          class="flex justify-center items-center shadow-lg my-4 border last:w-80 last:h-16 w-40 h-8"
        >
          <div>
            <p>{roll.value}</p>
          </div>
        </li>
      {/each}
    </ul>
    <button on:click={() => closeRollList()}>Clear X</button>
  </div>
{/if}
