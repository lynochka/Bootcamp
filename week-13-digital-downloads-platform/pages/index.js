import Head from "next/head";
import Link from "next/link";

import { getProducts } from "lib/data";
import prisma from "lib/prisma";

import Heading from "components/Heading";
import ProductList from "components/ProductList";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />

      <div className="w-2/3 mx-auto">
        <h1 className="flex justify-center mt-20 text-xl">Welcome!</h1>
        <h1 className="flex justify-center mt-20 text-xl">
          Explore the most popular products
        </h1>

        <ProductList products={products} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let products = await getProducts({ take: 3 }, prisma);
  products = JSON.parse(JSON.stringify(products));

  return {
    props: {
      products,
    },
  };
}
