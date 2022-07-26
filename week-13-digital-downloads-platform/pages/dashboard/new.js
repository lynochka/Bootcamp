import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import Heading from "components/Heading";

export default function NewProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [free, setFree] = useState(false);

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />

      <h1 className="text-center mt-20 text-xl">Add a new product</h1>

      <div className="w-2/3 mx-auto">
        <form
          className="flex flex-col mt-10 justify-center"
          onSubmit={async (e) => {
            e.preventDefault();

            const body = new FormData();
            body.append("image", image);
            body.append("product", product);
            body.append("title", title);
            body.append("free", free);
            body.append("price", price);
            body.append("description", description);

            await fetch("/api/new", {
              body,
              method: "POST",
            });

            router.push(`/dashboard`);
          }}
        >
          <div className="text-center mb-4">
            <div className="mb-7">
              <div className="mb-2">Product title (required)</div>
              <input
                className="w-2/3 border p-1 text-black mb-2"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-7">
              <div className="flex-1 mb-2">
                Product price in $ (required if not free)
              </div>
              {!free && (
                <input
                  className="border p-1 text-black mb-4"
                  pattern="^\d*(\.\d{0,2})?$"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              )}
              <span className="ml-2 mb-4">
                <input
                  type="checkbox"
                  checked={free}
                  onChange={(e) => setFree(!free)}
                />
                <label className="ml-2 text-sm">
                  {!free ? "Check if the product is free" : "Checked as free"}
                </label>
              </span>
            </div>

            <div className="mb-2">Description</div>
            <textarea
              className="w-full border p-1 text-black"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="text-center text-sm text-gray-400 mb-7">
            <label className="font-medium cursor-pointer my-3">
              <p>Product image {image && "✅"}</p>
              <p> (800 x 450 suggested)</p>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    if (event.target.files[0].size > 3072000) {
                      alert("Maximum size allowed is 3MB");
                      return false;
                    }
                    setImage(event.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
          <div className="text-center text-sm text-gray-400">
            <label className="font-medium cursor-pointer my-3">
              <p>Product {product && "✅"}</p>
              <p>(required)</p>
              <input
                type="file"
                className="hidden"
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    if (event.target.files[0].size > 20480000) {
                      alert("Maximum size allowed is 20MB");
                      return false;
                    }
                    setProduct(event.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
          <button
            disabled={title && product && (free || price) ? false : true}
            className={`border px-8 py-2 mt-10 font-bold  ${
              title && (free || price)
                ? ""
                : "cursor-not-allowed text-gray-800 border-gray-800"
            }`}
          >
            Create product
          </button>
        </form>
      </div>
    </>
  );
}
