import Link from "next/link";

export default function ProductList({
  products,
  isDashboard = false,
  includePurchases = false,
}) {
  return (
    <div className="flex flex-col">
      {products &&
        products.map((product, index) => (
          <div
            className="flex flex-row w-full mx-auto px-4 my-2 py-5 border"
            key={index}
          >
            {product.image && (
              <img className="flex-initial w-14 h-14" src={product.image} />
            )}
            <div className="flex-1 ml-3">
              <p>{product.title}</p>
              {product.free ? (
                <span className="bg-white text-black px-1 uppercase font-bold">
                  free
                </span>
              ) : (
                <p>${product.price / 100}</p>
              )}
            </div>
            <div className="flex-none ml-3">
              <div>
                {isDashboard && (
                  <Link href={`/dashboard/product/${product.id}`}>
                    <a className="text-sm border p-2 font-bold uppercase">
                      Edit
                    </a>
                  </Link>
                )}
                <Link href={`/product/${product.id}`}>
                  <a className="text-sm ml-2 p-2 font-bold uppercase border">
                    View
                  </a>
                </Link>
              </div>
              {includePurchases &&
                product.Purchase &&
                product.Purchase.length > 0 && (
                  <p className="mt-3 text-right">
                    {product.Purchase.length} sales
                  </p>
                )}
            </div>
          </div>
        ))}
    </div>
  );
}
