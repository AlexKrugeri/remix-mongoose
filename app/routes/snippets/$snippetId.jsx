import { useLoaderData, useCatch, json, Link, redirect, path } from "remix";
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

export const action = async function ({ request, params }) {
  const db = await connectDb();
  const snippet = await db.models.Snippet.findById(params.snippetId);
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    await db.models.Snippet.deleteOne(snippet);
    return redirect("/");
  }
};

export default function SnippetPage() {
  const snippet = useLoaderData();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{snippet.title}</h1>
      <code>
        <pre>{snippet.body}</pre>
      </code>
      <p>{snippet.language}</p>

      <form
        method="post"
        className="mt-5 pt-2 border-t border-gray-200 flex items-center  "
      >
        <input type="hidden" name="_method" value="delete" />
        <Button type="submit" destructive>
          DELETE
        </Button>

        <Link to={`edit`} className="font-semibold">
          <h3 className="m-6">EDIT</h3>
        </Link>
      </form>
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
