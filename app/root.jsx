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
      <body className=" text-white font-sans p-4 bg-slate-800">
        <header className="pb-3 mb-4 border-b-4">
          <Link to="/" className="hover:underline text-white">
            Home
          </Link>
          <Link to="/snippets/new" className="ml-3 hover:underline text-white">
            Add snippet
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
