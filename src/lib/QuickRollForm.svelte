<script lang="ts">
  import Container from './Container.svelte';
  import Button from './Button.svelte';
  import DiceForm from './DiceForm.svelte';

  import type { Roll } from '../types/Roll';

  import { rollResults } from '../store';
  import { rollDice } from '../utils/rollDice';

  const onRollCustomValues = (quickRoll: Roll) => {
    const rollResult = rollDice({
      ...quickRoll,
      name: 'Quick Roll',
    });

    rollResults.update((rollResultsList) => {
      return [...rollResultsList, rollResult];
    });
  };
</script>

<Container header="Quick Roll">
  <DiceForm
    containerStyles="py-4 my-1"
    staticForm={true}
    onSubmit={onRollCustomValues}
    showCloseButton={false}
    clearFormOnSubmit={false}
  >
    <Button slot="actions" type="submit" class="w-full mt-6 mb-2" primaryAction
      >Roll</Button
    >
  </DiceForm>
</Container>
