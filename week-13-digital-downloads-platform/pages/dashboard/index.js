import prisma from "lib/prisma";
import { getProducts, getPurchases } from "lib/data";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import Heading from "components/Heading";
import ProductList from "components/ProductList";
import { PlusCircleIcon } from "@heroicons/react/solid";

export default function Dashboard({ products, purchases }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!session) {
    router.push("/");
  }

  if (session && !session.user.name) {
    router.push("/setup");
  }
  return (
    <div>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />

      <div className="w-2/3 mx-auto">
        <h1 className="text-center mt-20 mb-10 text-xl">Dashboard</h1>

        <div className="flex flex-col mb-4">
          <h2 className="text-center text-xl mb-4 ">
            Your products
            <Link href={`/dashboard/new`}>
              <PlusCircleIcon className="inline ml-2 h-8 w-8 text-blue-500 cursor-pointer" />
            </Link>
          </h2>

          <ProductList
            products={products}
            isDashboard={true}
            includePurchases={true}
          />
        </div>

        {purchases.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-center text-xl mb-4">Purchases</h2>
            {purchases.map((purchase, index) => (
              <div
                className="border flex justify-between w-full  mx-auto px-4 my-2 py-5 "
                key={index}
              >
                {purchase.product.image && (
                  <img
                    src={purchase.product.image}
                    className="w-14 h-14 flex-initial"
                  />
                )}
                <div className="flex-1 ml-3">
                  <p>{purchase.product.title}</p>
                  {parseInt(purchase.amount) === 0 ? (
                    <span className="bg-white text-black px-1 uppercase font-bold">
                      free
                    </span>
                  ) : (
                    <p>${purchase.amount / 100}</p>
                  )}
                </div>
                <div>
                  <a
                    href={purchase.product.url}
                    className="text-sm border p-2 font-bold uppercase"
                  >
                    Get files
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) return { props: {} };
  let products = await getProducts(
    { author: session.user.id, includePurchases: true },
    prisma
  );
  products = JSON.parse(JSON.stringify(products));

  let purchases = await getPurchases({ author: session.user.id }, prisma);
  purchases = JSON.parse(JSON.stringify(purchases));

  return {
    props: {
      products,
      purchases,
    },
  };
}
