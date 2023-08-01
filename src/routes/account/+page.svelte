<script>
  import { page } from "$app/stores";
</script>

{#if $page.data.user}
  posts ...
{/if}