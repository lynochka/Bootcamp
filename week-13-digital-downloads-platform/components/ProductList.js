import Link from "next/link";

export default function ProductList({ products }) {
  return (
    <div className="flex flex-col w-full mt-10">
      {products &&
        products.map((product, index) => (
          <div
            className="flex w-full md:w-2/3 xl:w-1/3 mx-auto px-4 my-2 py-5 border"
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
            <div>
              <Link href={`/product/${product.id}`}>
                <a className="text-sm ml-2 p-2 font-bold uppercase border">
                  View
                </a>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
