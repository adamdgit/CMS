<script>
  import { page } from "$app/stores";
  import '../styles.css'
  import logo from "$lib/logo.webp"
</script>

<svelte:head>
  <title>CMS app</title>
</svelte:head>

<header>

  <a href="/">
    <img class="logo" src={logo} alt="logo" />
  </a>

  {#if !$page.data.user}
  <nav>
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </nav>
  {/if}

  {#if $page.data.user}
  <div class="profile">
    <svg xmlns="http://www.w3.org/2000/svg" height="80px" fill="currentcolor" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
    <a href="/account">{$page.data.user.name}</a>
    <form action="/logout" method="post">
      <button class="logout" type="submit">Logout</button>
    </form>
  </div>
  {/if}

</header>


<main>
  <slot />
</main>

<style>

  a:visited, a {
    color: #eee;
  }

  header {
    display: flex;
    justify-content: space-between;
    background-color: #2c3135;
    padding: 3rem;
    color: #eee;
  }

  .logo {
    border-radius: 50%;
    height: 130px;
    width: 130px;
  }

  .profile {
    display: grid;
    justify-items: center;
  }

  .logout {
    padding: 10px;
    border-radius: 5px;
  }

  .logout:hover {
    background-color: #ccc;
  }

  main {
    padding: 3rem;
  }

</style>