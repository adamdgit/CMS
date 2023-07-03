<script>
  import { page } from "$app/stores";
</script>

{#if $page.data.user}
  <h1>Welcome {$page.data.user.name}</h1>
{/if}