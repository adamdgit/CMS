import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import bcrypt from 'bcrypt'
import { db } from "$lib";
import type { Action, Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  // if user is logged in already, redirect to home
  if (locals.user) {
    throw redirect(302, '/')
  }
}

const login:Action = async ({ cookies, request }) => {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');

  // simple validation
  if (typeof username !== 'string' || typeof password !== 'string'
  || !username || !password) {
    return fail(400, { invalid: true })
  }

  const user = await db.users.findUnique({
    where: { username }
  })

  if (!user) {
    return fail(400, { credentials: true })
  }

  const passwordMatches = await bcrypt.compare(password, user.password)

  if (!passwordMatches) {
    return fail(400, { credentials: true })
  }

  // set new authentication token which also gets stored to cookies
  const authUser = await db.users.update({
    where: { username: user.username },
    data: { authToken: crypto.randomUUID() }
  })

  // set auth token to cookies
  cookies.set('cms-session', authUser.authToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30 // 30 days as seconds
  })

  throw redirect(302, '/');
}

export const actions: Actions = { login };