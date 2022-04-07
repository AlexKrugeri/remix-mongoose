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
  const sort = params.get("sort");

  const filteredSnippets = snippets
    .sort((a, b) => {
      if (sort === null) {
        return 0;
      }
      if (sort === "title") {
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      }
    })
    .filter((snippet) => {
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
      <div className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
        <ul>
          {filteredSnippets.map((snippet) => {
            return (
              <li key={snippet._id}>
                <Link
                  to={`/snippets/${snippet._id}`}
                  className="block px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-500 cursor-pointer"
                >
                  {snippet.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
