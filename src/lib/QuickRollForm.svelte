<script lang="ts">
  import Container from './Container.svelte';
  import DiceForm from './DiceForm.svelte';

  import { rollResults } from '../store';
  import { rollDice } from '../utils/rollDice';

  const onRollCustomValues = (quickRoll) => {
    const rollResult = rollDice({
      name: 'Quick Roll',
      ...quickRoll,
    });

    rollResults.update((rollResultsList) => {
      return [...rollResultsList, rollResult];
    });
  };
</script>

<Container header="Quick Roll">
  <DiceForm staticForm={true} onSubmit={onRollCustomValues} />
</Container>
