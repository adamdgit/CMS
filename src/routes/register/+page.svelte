<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData
</script>

<h1>Register</h1>

<form action="?/register" method="post">
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" />
  </div>

  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" />
  </div>

  {#if form?.user}
    <p class="form-error">Username is unavailable.</p>
  {/if}
  <button type="submit">Register</button>
</form>

<style>

  h1 {
    text-align: center;
  }

  form {
    position: absolute;
    padding: 3rem;
    display: grid;
    justify-items: center;
    height: 300px;
    width: 100%;
    min-width: 300px;
    max-width: 400px;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #eee;
    border-radius: 20px;
    box-shadow: 3px 3px 15px #ccc;
  }

  form button {
    width: 120px;
    height: 40px;
    justify-self: center;
  }

  form label {
    width: 100%;
    max-width: 400px;
    height: 20px;
  }

  form input {
    width: 100%;
    max-width: 400px;
    height: 40px;
  }

  .form-error {
    color: red;
  }

</style>