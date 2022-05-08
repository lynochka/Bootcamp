import { useState, useEffect } from "react";

export default function DogImage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await res.json();
      setImage(data.message);
    }
    getData();
  }, []);

  return <img src={image} />;
}
