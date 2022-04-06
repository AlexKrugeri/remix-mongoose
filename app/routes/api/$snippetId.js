import { Body } from "node-fetch";
import { json } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const product = db.data.products?.find((p) => p.id === params.productId);
  return product;
}

export async function action({ request, params }) {
  switch (request.method) {
    case "DELETE": {
      db.data.products = db.data.products.filter(
        (p) => p.id !== params.productId
      );
      db.write();
      return new Response(null, { status: 204 });
    }
    case "PUT": {
      const body = await request.json();
      db.data.products = db.data.products.map((p) => {
        if (p.id == params.productId) {
          return body;
        } else {
          return p;
        }
      });
      db.write();
      return json(body, { status: 201 });
    }
  }
}
