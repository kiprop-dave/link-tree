import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    if (!email) {
      return fail(400, { email, missing: true })
    }
    if (email?.toString()?.length < 1) {
      return fail(400, { email, missing: true });
    }
    console.log("login", email, password);
    // TODO login the user
    throw redirect(303, '/');
  },
  register: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get("confirmPassword");
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!email || !emailRegex.test(email.toString())) {
      return fail(400, { email, invalid: true, register: true })
    }
    if (!password || !passwordRegex.test(password.toString())) {
      console.log(password)
      return fail(400, { password, email, badPassword: true, register: true })
    }
    if (!confirmPassword || confirmPassword.toString() !== password.toString()) {
      return fail(400, { confirmPassword, password, email, mismatch: true, register: true })
    }
    console.log("register", email, password);
    // TODO register the user
    throw redirect(303, '/');
  }
} satisfies Actions;

