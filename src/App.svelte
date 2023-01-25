<script lang="ts">
  import './app.css';

  import DiceButtons from './lib/DiceButtons.svelte';
  import Page from './lib/Page.svelte';
  import RollResultList from './lib/RollResultList.svelte';
  import QuickRollForm from './lib/QuickRollForm.svelte';
  import CustomFormModal from './lib/CustomFormModal.svelte';
</script>

<Page>
  <QuickRollForm />
  <DiceButtons />
  <RollResultList />

  <CustomFormModal />
</Page>
