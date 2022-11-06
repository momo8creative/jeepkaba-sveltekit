import { PUBLIC_API_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import { invalid } from "@sveltejs/kit";
import bcrypt from "bcrypt";

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request, fetch, url }) => {
    const formData = await request.formData();

    let username = formData.get("username").toString().trim();
    let password = formData.get("password").toString().trim();

    const q = {
      action: "login",
      sheet: "user",
      data: { username },
    };

    const url_api = PUBLIC_API_URL + "?q=" + JSON.stringify(q);
    const res = await fetch(url_api);
    const user = await res.json();
    console.log(user);

    if (!user || user.error)
      return invalid(400, {
        username,
        error: true,
        message: "Nama salah !",
      });

    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword)
      return invalid(400, {
        username,
        error: true,
        message: "Nama atau sandi salah !",
      });

    if (url.searchParams.has("redirectTo"))
      throw redirect(303, url.searchParams.get("redirectTo"));

    return {
      success: true,
    };
  },

  register: async ({ request, fetch, url }) => {
    const formData = await request.formData();

    let username = formData.get("username").toString().trim();
    let password = formData.get("password").toString().trim();
    password = await bcrypt.hash(password, 10);

    const q = {
      action: "register",
      sheet: "user",
      data: {
        username,
        password,
        id: crypto.randomUUID(),
      },
    };

    const url_api = PUBLIC_API_URL + "?q=" + JSON.stringify(q);
    const res = await fetch(url_api);
    const result = await res.json();

    console.log(result);
    if (result.error) return invalid(400, { ...result, username });

    if (url.searchParams.has("redirectTo")) {
      throw redirect(303, url.searchParams.get("redirectTo"));
    }

    return {
      success: true,
    };
  },
};
