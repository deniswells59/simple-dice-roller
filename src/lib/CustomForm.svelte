<script>
  import { DICE_LIST } from '../types/Roll';

  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import Dropdown from './Dropdown.svelte';
  import Input from './Input.svelte';

  let customRollFormOpen = true;

  const customButtonClickHandler = () => {
    customRollFormOpen = true;
  };
</script>

<Container>
  <Button
    class="min-h-[10%] w-full my-8 bg-white"
    onClickHandler={() => customButtonClickHandler()}
  >
    {#if !customRollFormOpen}
      + Custom
    {:else}
      <Input class="w-full my-4" placeholder="Name" type="text" />
      <table>
        <tr>
          <th>#</th>
          <th>Dice</th>
          <th>Mod</th>
          <th>Mod Num</th>
        </tr>
        <tr class="w-full">
          <td class="w-[20%]">
            <Input class="w-full text-center" placeholder="Number of Dice" type="number" />
          </td>
          <td class="w-[20%]">
            <Dropdown class="w-full text-center" options={Object.keys(DICE_LIST)} />
          </td>
          <td class="w-[20%]">
            <Dropdown class="w-ful text-center" options={['+', '-', 'None']} />
          </td>
          <td class="w-[20%]">
            <Input class="w-full text-center" placeholder="Modifier" type="number" />
          </td>
        </tr>
      </table>
    {/if}
  </Button>
</Container>
