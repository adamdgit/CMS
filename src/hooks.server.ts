import type { Handle } from "@sveltejs/kit";
import { db } from "$lib";

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('cms-session')

  if (!session) {
    return await resolve(event)
  }

  console.log('hook runs')

  const user = await db.users.findUnique({
    where: { authToken: session },
    select: { username: true, role: true }
  })

  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role.role
    }
  }

  return await resolve(event)
}