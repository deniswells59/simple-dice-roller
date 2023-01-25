<script lang="ts">
  import { rollResults } from '../store';
  import type { RollResult } from '../types/Roll';
  import { ROLL_LIST_TIMEOUT } from '../constants/config';

  import Button from './Button.svelte';
  import { default as RollResultComponent } from './RollResult.svelte';

  let showRollResultList = false;
  let rollListTimeoutID: ReturnType<typeof setTimeout>;
  let prevRolls: RollResult[] = [];
  let latestRollResult: RollResult;

  const handleRollListUpdate = (newRolls: RollResult[]) => {
    if (newRolls.length) {
      latestRollResult = { ...newRolls[newRolls.length - 1] };
      prevRolls = [...newRolls].slice(-3, -1);

      showRollResultList = true;

      if (rollListTimeoutID) {
        clearTimeout(rollListTimeoutID);
      }

      rollListTimeoutID = setTimeout(closeRollList, ROLL_LIST_TIMEOUT);
    }
  };

  const closeRollList = () => {
    showRollResultList = false;
    rollResults.set([]);
  };

  rollResults.subscribe(handleRollListUpdate);
</script>

{#if showRollResultList}
  <div class="fixed bottom-5 right-2 flex flex-col items-end z-10">
    <ul class="flex flex-col items-end">
      {#each prevRolls as rollResult}
        <RollResultComponent {rollResult} />
      {/each}

      <RollResultComponent rollResult={latestRollResult} primary={true} />
    </ul>
    <Button
      onClickHandler={() => closeRollList()}
      cssClass="border-0 w-auto bg-white">Clear X</Button
    >
  </div>
{/if}
