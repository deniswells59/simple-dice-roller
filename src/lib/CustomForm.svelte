<script>
  import { DICE_LIST } from '../types/Roll';

  import Button from './Button.svelte';
  import Container from './Container.svelte';
  import Dropdown from './Dropdown.svelte';
  import Input from './Input.svelte';

  let customRollInputOpen = true;

  const buttonCss = 'sm:w-64 sm:-m-[1px] h-20 w-full bg-white m-12';

  const customButtonClickHandler = () => {
    customRollInputOpen = true;
  };
</script>

<Container cssClass="m-10">
  <Button cssClass={buttonCss} onClickHandler={() => customButtonClickHandler()}>Custom</Button>
</Container>

{#if customRollInputOpen}
  <Container>
    <Input placeholder="Name" type="text" />
    <Input placeholder="Number of Dice" type="number" />
    <Dropdown options={Object.keys(DICE_LIST)} />
    <Dropdown options={['+', '-', 'None']} />
    <Input placeholder="Modifier" type="number" />
  </Container>
{/if}
