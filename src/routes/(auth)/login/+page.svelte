<script>
  import { page } from "$app/stores";
  export let form;
  let loading = false;

  let redirectTo = $page.url.searchParams.has("redirectTo")
    ? "&redirectTo=" + $page.url.searchParams.get("redirectTo")
    : "";

  const submitForm = () => {
    form = null;
    loading = true;
  };
</script>

{#if loading}
  <section
    class="fixed inset-0 flex justify-center items-center bg-black/50 text-white font-bold "
  >
    <div
      class="flex justify-center items-center text-4xl w-3/6 aspect-square rounded-full border-2 border-black/25 bg-black/25"
    >
      <span>Loading...</span>
    </div>
  </section>
{/if}

<form
  on:submit={submitForm}
  class="m-8 bg-white border-2 border-slate-300 p-4 flex flex-col gap-4"
  method="POST"
  action={`?/login${redirectTo}`}
>
  <h1 class="text-4xl font-bold text-slate-800">LOGIN</h1>

  {#if form?.error}
    <section class="bg-red-200 px-4 py-2 text-red-700">
      <h2 class="text-2xl font-semibold">Error !</h2>
      <p class="opacity-80">{form?.message}</p>
    </section>
  {/if}

  {#each [{ label: "Nama", type: "text", name: "username" }, { label: "Sandi", type: "password", name: "password" }] as field}
    <div>
      <label for={field.name}>{field.label}</label>
      <input
        class="w-full text-xl px-2 py-1 bg-slate-200"
        type={field.type}
        name={field.name}
        id={field.name}
        value={form?.[field.name] ?? ""}
        required
      />
    </div>
  {/each}

  <div>
    <button
      class="bg-slate-500  text-white text-xl font-semibold px-4 py-2 w-full"
      type="submit"
      name="login">Masuk</button
    >
  </div>
  <div class="text-center">------- atau -------</div>
  <div>
    <button
      class="border-2 border-slate-500   text-xl font-semibold px-4 py-2 w-full"
      formaction={`?/register${redirectTo}`}
      type="submit"
      name="register">Daftar</button
    >
  </div>
</form>
