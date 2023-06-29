<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<h1>Login</h1>

<form action="?/login" method="post">
  <fieldset>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" />

    <label for="password">Password</label>
    <input type="password" id="password" name="password" />
  </fieldset>

  {#if form?.invalid}
    <p class="form-error">Username and password fields are required.</p>
  {/if}

  {#if form?.credentials}
    <p class="form-error">Invalid login credentials.</p>
  {/if}

  <button type="submit">Login</button>
</form>

<style>

  .form-error {
    color: red;
  }

</style>