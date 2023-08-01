import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib";

let userId: string;

export const load: PageServerLoad = async ({ locals }) => {

  userId = locals.user.id;

  // check if username exists
  const posts = await db.posts.findMany({
    where: { author_ref: userId }
  })

  if (!posts) {
    return fail(400, { invalid: "No posts found" })
  }

  return ({ posts });
}
