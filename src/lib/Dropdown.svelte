<script>
  export let options = [];
</script>

<select>
  {#each options as option}
    <option>{option}</option>
  {/each}
</select>
