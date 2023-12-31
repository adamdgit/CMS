import { redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  throw redirect(302, '/')
}

export const actions: Actions = {
  default({ cookies }) {
    cookies.set('cms-session', '', {
      path: '/',
      expires: new Date(0)
    })

    throw redirect(302, '/login')
  }
}