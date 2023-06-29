<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData
</script>

<h1>Register</h1>

<form action="?/register" method="post">
  <fieldset>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" />

    <label for="password">Password</label>
    <input type="password" id="password" name="password" />
  </fieldset>

  {#if form?.user}
    <p class="form-error">Username is unavailable.</p>
  {/if}
  <button type="submit">Register</button>
</form>

<style>

  .form-error {
    color: red;
  }

</style>