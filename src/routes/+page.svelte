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

    <div class="post-details">
      <p class="likes-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
        {post.likes}
      </p>
      <p class="updated">{post.updated_at.toLocaleString("en-au", {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</p>
    </div>
  </div>
  {/each}

{/if}

<style>

  .posts-wrap {
    display: grid;
    border: 4px solid #2c3135;
    padding: 1.4rem;
    margin-bottom: 1rem;
    gap: .8rem;
  }

  .posts-wrap a {
    font-size: 1.2rem;
  }

  .post-details {
    display: flex;
    justify-content: space-between;
  }

  .likes-wrap {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .updated {
    font-size: .8rem;
    font-style: italic;
  }

</style>