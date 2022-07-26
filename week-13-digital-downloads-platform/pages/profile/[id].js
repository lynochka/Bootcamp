import Head from "next/head";

import prisma from "lib/prisma";
import { getProducts, getUser } from "lib/data";

import Heading from "components/Heading";
import ProductList from "components/ProductList";

export default function Profile({ user, products }) {
  return (
    <div>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />

      <h1 className="text-center mt-20 text-xl">
        Products made by {user.name}
      </h1>

      <ProductList products={products} />
    </div>
  );
}

export async function getServerSideProps(context) {
  let user = await getUser(context.params.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  let products = await getProducts({ author: context.params.id }, prisma);
  products = JSON.parse(JSON.stringify(products));

  return {
    props: {
      user,
      products,
    },
  };
}
