import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import styles from "~/tailwind.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "icon",
    href: "/favicon.ico?v=cache",
  },
];

export function meta() {
  return {
    charset: "utf-8",
    title: "SnipLog",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className=" text-slate-800 font-sans flex flex-row">
        <header className="p-6 mb-4 border-b-4 h-screen bg-slate-400 flex flex-row items-top justify-between w-60">
          <Link
            to="/"
            className="hover:underline text-slate-800 font-bold text-2xl"
          >
            Home
          </Link>
          <Link
            to="/snippets/new"
            className="ml-3 hover:underline text-slate-800"
          >
            <button class="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-slate-800 rounded-lg focus:shadow-outline hover:bg-indigo-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
