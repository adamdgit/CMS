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
  let posts: postsType[] | undefined = data.posts;

  async function updateLikes(id: string, userId: string, type: string) {
    const response = await fetch("/api/updateLikes", {
      method: "POST",
      body: JSON.stringify({id: id, userId: userId, type: type}),
      headers: {
        'content-type': 'application/json'
      }
    });

    // returns update of either like or dislike
    const {message, update} = await response.json()

    // hydrate the likes for the user if an update is returned
    if (update) {
      posts = posts?.map(post => {
        if (post.id === id) {
          return {
            ...post, 
            likes: update === "like" ? post.likes +1 : update === "dislike" ? post.likes -1 : post.likes
          }
        }
        return post
      }) as postsType[] | undefined
    }

    console.log(message)
  };

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
      <span class="likes-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" fill="hotpink" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
        {post.likes}
        <button on:click={e => updateLikes(post.id, $page.data.user.id, "like")} class="vote like">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M466.3 286.7C475 271.8 480 256 480 236.9c0-44-37.2-85.6-85.8-85.6H357.7c4.9-12.8 8.9-28.1 8.9-46.5C366.6 31.9 328.9 0 271.3 0c-61.6 0-58.1 94.9-71.8 108.6-22.7 22.7-49.6 66.4-68.8 83.4H32c-17.7 0-32 14.3-32 32v240c0 17.7 14.3 32 32 32h64c14.9 0 27.4-10.2 31-24 44.5 1 75.1 39.9 177.8 39.9 7.2 0 15.2 0 22.2 0 77.1 0 112-39.4 112.9-95.3 13.3-18.4 20.3-43.1 17.3-67 9.9-18.5 13.7-40.3 9-63zm-61.8 53.8c12.6 21.1 1.3 49.4-13.9 57.6 7.7 48.8-17.6 65.9-53.1 65.9h-37.8c-71.6 0-118-37.8-171.6-37.8V240h10.9c28.4 0 68-70.9 94.5-97.5 28.4-28.4 18.9-75.6 37.8-94.5 47.3 0 47.3 33 47.3 56.7 0 39.2-28.4 56.7-28.4 94.5h104c21.1 0 37.7 18.9 37.8 37.8 .1 18.9-12.8 37.8-22.3 37.8 13.5 14.6 16.4 45.2-5.2 65.6zM88 432c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24z"/></svg>
        </button>
        <button on:click={e => updateLikes(post.id, $page.data.user.id, "dislike")} class="vote dislike">
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M466.3 225.3c4.7-22.6 .9-44.5-9-63 3-23.9-4-48.6-17.3-67C439 39.4 404.1 0 327 0c-7 0-15 0-22.2 0C201.2 0 169 40 128 40h-10.8c-5.6-5-13-8-21.2-8H32C14.3 32 0 46.3 0 64v240c0 17.7 14.3 32 32 32h64c11.8 0 22.2-6.4 27.7-16h7.1c19.1 17 46 60.7 68.8 83.4 13.7 13.7 10.2 108.6 71.8 108.6 57.6 0 95.3-31.9 95.3-104.7 0-18.4-3.9-33.7-8.9-46.5h36.5c48.6 0 85.8-41.6 85.8-85.6 0-19.2-5-35-13.7-49.8zM64 296c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm330.2 16.7H290.2c0 37.8 28.4 55.4 28.4 94.5 0 23.8 0 56.7-47.3 56.7-18.9-18.9-9.5-66.2-37.8-94.5C206.9 342.9 167.3 272 138.9 272H128V85.8c53.6 0 100-37.8 171.6-37.8h37.8c35.5 0 60.8 17.1 53.1 65.9 15.2 8.2 26.5 36.4 13.9 57.6 21.6 20.4 18.7 51.1 5.2 65.6 9.5 0 22.4 18.9 22.3 37.8-.1 18.9-16.7 37.8-37.8 37.8z"/></svg>
        </button>
      </span>
      <p class="updated">{post.updated_at.toLocaleString("en-au", {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'})}</p>
    </div>
  </div>
  {/each}

{/if}

<style>

  .vote {
    width: 16px;
    height: 16px;
    background: white;
  }

  .like:hover { fill: #52aadd; }
  .dislike:hover { fill: #c53636; }

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