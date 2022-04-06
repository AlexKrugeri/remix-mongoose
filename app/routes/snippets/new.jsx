import { Form, redirect, json, useActionData } from "remix";
import connectDb from "~/db/connectDb.server";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  try {
    const newSnippet = await db.models.Snippet.create({
      title: form.get("title"),
      body: form.get("body"),
      language: form.get("language"),
    });
    return redirect(`/snippets/${newSnippet._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export default function CreateSnippet() {
  const actionData = useActionData();
  return (
    <div className="p-8  w-1/2">
      <h1>Add snippet</h1>
      <Form method="post" className="mt-10 p-10 bg-slate-100 flex flex-col">
        <label
          htmlFor="title"
          className="block text-slate-800 font-bold text-2xl"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={actionData?.values.title}
          id="title"
          className={
            actionData?.errors.title ? "border-2 border-red-500" : "px-4 py-2"
          }
        />
        {actionData?.errors.title && (
          <p className="text-red-500">{actionData.errors.title.message}</p>
        )}
        <br />

        <label
          htmlFor="body"
          className="block text-slate-800 font-bold text-2xl"
        >
          Body
        </label>
        <input
          type="text"
          name="body"
          defaultValue={actionData?.values.body}
          id="body"
          className={
            actionData?.errors.body ? "border-2 border-red-500" : "px-4 py-2"
          }
        />
        {actionData?.errors.body && (
          <p className="text-red-500">{actionData.errors.body.message}</p>
        )}
        <br />

        <label
          htmlFor="language"
          className="block text-slate-800 font-bold text-2xl"
        >
          Language
        </label>
        <input
          type="text"
          name="language"
          defaultValue={actionData?.values.language}
          id="language"
          className={
            actionData?.errors.language
              ? "border-2 border-red-500"
              : "px-4 py-2"
          }
        />
        {actionData?.errors.language && (
          <p className="text-red-500">{actionData.errors.language.message}</p>
        )}
        <br />

        <button
          type="submit"
          className="w-fit inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-slate-800 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        >
          SAVE
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </button>
      </Form>
    </div>
  );
}
