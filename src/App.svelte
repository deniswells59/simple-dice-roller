<script lang="ts">
  import './app.css';

  import DiceButtons from './lib/DiceButtons.svelte';
  import Page from './lib/Page.svelte';
  import RollList from './lib/RollList.svelte';
  import CustomForm from './lib/CustomForm.svelte';
</script>

<Page>
  <DiceButtons />
  <RollList />
  <CustomForm />
</Page>
