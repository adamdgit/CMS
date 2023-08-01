<script lang="ts">
  import { page } from '$app/stores';

  type postsType = {
    id: string,
    title: string,
    content: string,
    creaated_at: Date,
    updated_at: Date,
    likes: number,
    author_ref: string
  }

  export let data;
  const posts: postsType[] = data.posts;
</script>

{#each posts as post}
<div class="posts-wrap">
  <p>{post.title}</p>
  <p>{post.content}</p>
  <p>Likes: {post.likes}</p>
  <p>Last Updated: {post.updated_at.toLocaleString("en-au", {day: '2-digit', month: 'long', year: 'numeric'})}</p>
</div>
{/each}

<style>
  .posts-wrap {
    display: grid;
    background-color: lightblue;
    margin: 10px;
    padding: 1rem;
  }
</style>