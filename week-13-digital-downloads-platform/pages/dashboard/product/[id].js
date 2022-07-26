import { getProduct } from "lib/data";
import prisma from "lib/prisma";
import { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Heading from "components/Heading";
import ProductForm from "components/ProductForm";

export default function Product({ product }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState(product.title);
  const [image, setImage] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price / 100);
  const [free, setFree] = useState(product.free);

  if (!product) {
    return null;
  }

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (session && !session.user.name) {
    router.push("/setup");
  }
  const onSave = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("id", product.id);
    body.append("image", image);
    body.append("product", newProduct);
    body.append("title", title);
    body.append("free", free);
    body.append("price", price);
    body.append("description", description);

    await fetch("/api/edit", {
      body,
      method: "POST",
    });

    router.push("/dashboard");
  };

  return (
    <div>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />

      <ProductForm
        title={title}
        setTitle={setTitle}
        image={image}
        setImage={setImage}
        product={newProduct}
        setProduct={setNewProduct}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        free={free}
        setFree={setFree}
        onSave={onSave}
        productUrl={product.url}
        imageUrl={product.image}
        id={product.id}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { props: {} };

  let product = await getProduct(context.params.id, prisma);
  product = JSON.parse(JSON.stringify(product));

  if (!product) return { props: {} };

  if (session.user.id !== product.author.id) return { props: {} }; //NOT OUR PRODUCT!

  return {
    props: {
      product,
    },
  };
}
