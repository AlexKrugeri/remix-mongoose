import {
  useLoaderData,
  useCatch,
  json,
  Link,
  redirect,
  Form,
  useActionData,
  path,
} from "remix";
import connectDb from "~/db/connectDb.server.js";
import Button from "~/components/Button.jsx";

export async function loader({ params }) {
  const db = await connectDb();
  const snippet = await db.models.Snippet.findById(params.snippetId);
  if (!snippet) {
    throw new Response(`Couldn't find snippet with id ${params.snippetId}`, {
      status: 404,
    });
  }
  return json(snippet);
}

export async function action({ request, params }) {
  const form = await request.formData();
  const db = await connectDb();
  const id = params.snippetId;
  console.log(id);
  try {
    await db.models.Snippet.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          title: form.get("title"),
          body: form.get("body"),
          language: form.get("language"),
        },
      }
    );
    return redirect(`/`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export default function EditSnippet() {
  const actionData = useActionData();

  return (
    <div className="p-8  w-1/2">
      <h1>Edit snippet</h1>
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

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="text-red-500 font-bold">
      {error.name}: {error.message}
    </h1>
  );
}
