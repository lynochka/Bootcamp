import { useState } from "react";

export default function ProductForm({
  id,
  title,
  setTitle,
  image,
  setImage,
  description,
  setDescription,
  price,
  setPrice,
  free,
  setFree,
  onSave,
  productUrl,
  imageUrl,
}) {
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);
  const [product, setProduct] = useState(null);
  const [changedLink, setChangedLink] = useState(false);

  return (
    <div className="w-2/3 mx-auto">
      <form className="flex flex-col mt-10 justify-center" onSubmit={onSave}>
        <div className="text-center mb-4">
          <div className="mb-7">
            <div className="mb-2">Product title (required)</div>
            <input
              className="w-2/3 border p-1 text-black mb-2"
              value={title}
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
                value={price}
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
            value={description}
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
                  setNewImageUrl(URL.createObjectURL(event.target.files[0]));
                }
              }}
            />
          </label>
          {newImageUrl && (
            <img className="mx-auto w-20 h-20" src={newImageUrl} />
          )}
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
                  setChangedLink(true);
                }
              }}
            />
            {productUrl && !changedLink && (
              <a className="underline" href={productUrl}>
                Link
              </a>
            )}
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
          {id ? "Save changes" : "Create product"}
        </button>
      </form>
    </div>
  );
}
