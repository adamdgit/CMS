<script>
  import { page } from '$app/stores';

  export let data;
</script>

<h1>{$page.status}</h1>

<p>{$page.params.slug}</p>

<p>{data.blogPost?.title}</p>
<p>{data.blogPost?.content}</p>
<p>{data.user.name}</p>