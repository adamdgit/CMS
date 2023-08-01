import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib";

export const load: PageServerLoad = async ({ params }) => {
  let id = params.slug;

  // check if username exists
  const blogPost = await db.posts.findUnique({
    where: { id }
  })

  if (!blogPost) {
    return fail(400, { invalid: "Post not found" })
  }

  const author = await db.users.findUnique({
    select: { username: true },
    where: { id: blogPost.author_ref }
  })

  console.log(author)
  
  return ({ blogPost, author });
}
