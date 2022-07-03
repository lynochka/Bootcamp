import Link from "next/link";
import { useRouter } from "next/router";

export default function Heading() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 h-16 pt-5 px-5 bg-black">
      <div className="text-xl">
        {router.asPath === "/" ? (
          <p>YouTube clone</p>
        ) : (
          <Link href={`/`}>
            <a className="underline">Home</a>
          </Link>
        )}
      </div>
    </header>
  );
}
