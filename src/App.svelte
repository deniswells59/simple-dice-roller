<script lang="ts">
  import './app.css';

  import DiceButtons from './lib/DiceButtons.svelte';
  import Page from './lib/Page.svelte';
  import RollResultList from './lib/RollResultList.svelte';
  import CustomForm from './lib/CustomForm.svelte';
</script>

<Page>
  <CustomForm staticForm={true} />
  <DiceButtons />
  <RollResultList />
  <CustomForm />
</Page>
