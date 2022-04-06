import { useLoaderData, Link, useSearchParams } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snippet.find();
  return snippets;
}

export default function Index() {
  const snippets = useLoaderData();
  const [params] = useSearchParams();
  const searchValue = params.get("query");

  const filteredSnippets = snippets.filter((snippet) => {
    if (searchValue === null) {
      return snippet;
    } else {
      return snippet.title.toLowerCase().includes(searchValue);
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Snippets Library</h1>
      <h2 className="text-lg font-bold mb-3">
        From now on, only painful snippets:
      </h2>
      <ul className="ml-5 list-disc">
        {filteredSnippets.map((snippet) => {
          return (
            <li key={snippet._id}>
              <Link
                to={`/snippets/${snippet._id}`}
                className="text-blue-600 hover:underline"
              >
                {snippet.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
