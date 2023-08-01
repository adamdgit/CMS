<script lang="ts">
  import { page } from "$app/stores";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

{#if $page.data.user}
  <form action="?/createPost" method="post">

    <label for="title">Post Title</label>
    <input id="title" type="text" name="title" />

    {#if form?.postTitle}
      <p class="form-error">Missing post title.</p>
    {/if}

    <label for="body">Post Body</label>
    <textarea id="body" name="body"></textarea>

    {#if form?.postBody}
      <p class="form-error">Missing post body.</p>
    {/if}

    <button class="create-post" type="submit">Create Post</button>
  </form>
{/if}

<style>

  .create-post {
    background-color: #fff;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 150px;
    justify-self: center;
  }

  .create-post:hover {
    background-color: #2c3135;
    color: white;
  }

  form {
    position: absolute;
    padding: 3rem;
    display: grid;
    gap: 1rem;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #eee;
    border-radius: 20px;
    box-shadow: 3px 3px 15px #ccc;
  }

  form label {
    width: 100%;
    max-width: 600px;
    min-width: 300px;
    height: 20px;
  }

  form input {
    height: 40px;
  }

  form textarea {
    width: 100%;
    max-width: 400px;
    min-width: 300px;
    height: 150px;
    max-height: 400px;
    min-height: 40px;
  }

  .form-error {
    color: red;
  }

</style>