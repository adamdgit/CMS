import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib";

export const load: PageServerLoad = async ({ params }) => {
  let id = params.slug;
  console.log(id)

  // check if username exists
  const blogPost = await db.posts.findUnique({
    where: { id }
  })

  if (!blogPost) {
    return fail(400, { invalid: "Post not found" })
  }

  const author = await db.users.findUnique({
    where: { id: blogPost?.author_ref }
  })
  
  return ( { blogPost, author } );
}
