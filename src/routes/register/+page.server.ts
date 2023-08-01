import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Action, Actions } from "@sveltejs/kit";
import bcrypt from 'bcrypt'
import { db } from "$lib";

export const load: PageServerLoad = async ({ locals }) => {
  // if (locals.user) {
  //   throw redirect(302, '/')
  // }
}

const register: Action = async ({ request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')

  // simple validation
  if (typeof username !== 'string' || typeof password !== 'string'
    || !username || !password) {
    return fail(400, { user: true })
  }

  // check if username exists
  const user = await db.users.findUnique({
    where: { username }
  })

  // user already exists
  if (user) {
    return fail(400, { user: true })
  }

  // if no errors, register user
  await db.users.create({
    data: {
      username: username,
      password: await bcrypt.hash(password, 10),
      authToken: crypto.randomUUID(),
      roleId: 2 // 1 = Admin, 2 = User, 3 = Moderator
    }
  })

  throw redirect(303, './login')
}

export const actions: Actions = { register }