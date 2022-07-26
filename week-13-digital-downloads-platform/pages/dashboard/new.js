import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Heading from "components/Heading";
import ProductForm from "components/ProductForm";

export default function NewProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [free, setFree] = useState(false);

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
  }

  const onSave = async (e) => {
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
  };

  return (
    <>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />

      <h1 className="text-center mt-20 text-xl">Add a new product</h1>
      <ProductForm
        title={title}
        setTitle={setTitle}
        image={image}
        setImage={setImage}
        product={product}
        setProduct={setProduct}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        free={free}
        setFree={setFree}
        onSave={onSave}
      />
    </>
  );
}
