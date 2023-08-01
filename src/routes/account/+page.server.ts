import { redirect, fail} from "@sveltejs/kit";
import type { Actions, Action } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib";

let userId: string;

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/')
  }
  userId = locals.user.id;
}

const createPost: Action = async ({ request }) => {
  const data = await request.formData()
  const postTitle = data.get('title')
  const postBody = data.get('body')

  // validate title
  if (typeof postTitle !== 'string' || !postTitle) {
    return fail(400, { postTitle: true })
  }

  // validate body
  if (typeof postBody !== 'string' || !postBody) {
    return fail(400, { postBody: true })
  }

  // if no errors, create post and return postid
  const blogID = await db.posts.create({
    data: {
      title: postTitle,
      content: postBody,
      author_ref: userId
    }, 
    select: { id: true }
  })

  throw redirect(303, `/blog/${blogID.id}`)
}

export const actions: Actions = { createPost }