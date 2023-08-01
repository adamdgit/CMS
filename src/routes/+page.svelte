<script lang="ts">
  import { page } from '$app/stores';

  type postsType = {
    id: string,
    title: string,
    content: string,
    created_at: Date,
    updated_at: Date,
    likes: number,
    author_ref: string
  }

  export let data;
  const posts: postsType[] | undefined = data.posts;
</script>

<h1>Adams Blog</h1>

<h2>Latest Posts</h2>

{#if !posts}

  <h3>No posts found.</h3>

  {:else}
  {#each posts as post}
  <div class="posts-wrap">
    <a href={`/blog/${post.id}`}>{post.title}</a>
    <p>{post.content}</p>
    <p>Likes: {post.likes}</p>
    <p>Last Updated: {post.updated_at.toLocaleString("en-au", {day: '2-digit', month: 'long', year: 'numeric'})}</p>
  </div>
  {/each}

{/if}

<style>
  .posts-wrap {
    display: grid;
    background-color: lightblue;
    margin: 10px;
    padding: 1rem;
  }
</style>