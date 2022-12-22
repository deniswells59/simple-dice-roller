<script>
  export let options = [];
</script>

<select class="w-20 border-2 p-3 rounded {$$props.class}">
  {#each options as option}
    <option>{option}</option>
  {/each}
</select>
