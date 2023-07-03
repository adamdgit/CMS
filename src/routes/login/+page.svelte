<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<div class="login-wrap">
  <h1>Login</h1>

  <form action="?/login" method="post">
    <label for="username">
      Username
      <input type="text" id="username" name="username" />
    </label>
  
    <label for="password">
      Password
      <input type="password" id="password" name="password" />
    </label>
  
    {#if form?.invalid}
      <p class="form-error">Username and password fields are required.</p>
    {/if}
  
    {#if form?.credentials}
      <p class="form-error">Invalid login credentials.</p>
    {/if}
  
    <button type="submit">Login</button>
  </form>
</div>

<style>

  .login-wrap {
    display: grid;
    padding: 3rem;
    margin: 20vh auto 0 auto;
    width: 350px;
    height: 250px;
    background: #eee;
    border-radius: 20px;
    box-shadow: 3px 3px 15px #ccc;
  }

  h1 {
    text-align: center;
    margin: unset;
  }

  form {
    display: grid;
    justify-items: center;
    gap: 1rem;
  }

  form button {
    width: 120px;
    height: 40px;
    justify-self: center;
    border-radius: 5px;
    border: 1px solid #333;
    cursor: pointer;
  }

  form label {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  form input {
    height: 25px;
  }

  .form-error {
    color: red;
  }

</style>