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
    <div>
      <h1>Add snippet</h1>
      <Form method="post">
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          type="text"
          name="title"
          defaultValue={actionData?.values.title}
          id="title"
          className={
            actionData?.errors.title ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.title && (
          <p className="text-red-500">{actionData.errors.title.message}</p>
        )}
        <br />

        <label htmlFor="body" className="block">
          Body
        </label>
        <input
          type="text"
          name="body"
          defaultValue={actionData?.values.body}
          id="body"
          className={actionData?.errors.body ? "border-2 border-red-500" : null}
        />
        {actionData?.errors.body && (
          <p className="text-red-500">{actionData.errors.body.message}</p>
        )}
        <br />

        <label htmlFor="language" className="block">
          Language
        </label>
        <input
          type="text"
          name="language"
          defaultValue={actionData?.values.language}
          id="language"
          className={
            actionData?.errors.language ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.language && (
          <p className="text-red-500">{actionData.errors.language.message}</p>
        )}
        <br />

        <button type="submit">Save</button>
      </Form>
    </div>
  );
}
