<script lang="ts">
  import type { Roll } from '../types/Roll';
  import { rollResults, customRolls } from '../store';
  import { rollDice } from '../utils/rollDice';

  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import CustomRollSettings from './CustomRollSettings.svelte';

  let customRollSettingsModalOpen = false;

  const openCustomRollSettingsModal = () => {
    customRollSettingsModalOpen = true;
  };

  const closeCustomRollSettingsModal = () => {
    customRollSettingsModalOpen = false;
  };

  const onCustomClickHandler = (customRoll: Roll) => {
    const rollResult = rollDice({
      name: customRoll.name,
      numOfDice: customRoll.numOfDice,
      diceType: customRoll.diceType,
      modifierOperation: customRoll.modifierOperation,
      modifier: customRoll.modifier,
    });

    rollResults.update((currentRolls) => [...currentRolls, rollResult]);
  };
</script>

<Container
  header="Custom"
  modalOpen={customRollSettingsModalOpen}
  hasSecondaryAction={$customRolls.length ? true : false}
  secondaryAction={openCustomRollSettingsModal}
>
  {#each $customRolls as customRoll}
    <Button
      class="sm:-m-[1px] h-20 -my-[1px] w-full bg-white"
      onClickHandler={() => onCustomClickHandler(customRoll)}
    >
      {customRoll.name}
    </Button>
  {/each}
</Container>

<CustomRollSettings
  settingsModalOpen={customRollSettingsModalOpen}
  closeSettingsModal={closeCustomRollSettingsModal}
/>
