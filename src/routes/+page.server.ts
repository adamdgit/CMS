import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib";

export const load: PageServerLoad = async ({ locals }) => {

  // get 10 most recent posts
  const posts = await db.posts.findMany({ 
    take: 10,
    orderBy: { created_at: 'desc' }
  });

  if (!posts) {
    return fail(400, { invalid: "No posts found" })
  }

  return ({ posts });
}
