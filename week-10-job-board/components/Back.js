import Link from "next/link";

const Back = () => {
  return (
    <div className="text-center p-4 m-4">
      <Link href={`/`}>
        <a href="" className="mb-10 text-sm font-bold underline">
          back
        </a>
      </Link>
    </div>
  );
};

export default Back;
