<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>CMS app</title>
</svelte:head>

<nav>
  {#if !$page.data.user}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  {/if}

  {#if $page.data.user}
    <a href="/account">Account</a>
    <form action="/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  {/if}
</nav>

<main>
  <slot />
</main>