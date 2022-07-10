import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Heading({ subscriptions }) {
  const router = useRouter();

  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 h-16 pt-5 px-5 bg-black">
      <div className="flex justify-between">
        <div className="text-xl">
          {router.asPath === "/" ? (
            <p>YouTube clone</p>
          ) : (
            <Link href={`/`}>
              <a className="underline">Home</a>
            </Link>
          )}
        </div>

        <div className="grow"></div>

        {session &&
          (router.asPath === "/subscriptions" ? (
            <a>
              <p className="mr-3 font-bold">Subscriptions</p>
            </a>
          ) : (
            <Link href={`/subscriptions`}>
              <a>
                <p className="mr-3 underline">Subscriptions</p>
              </a>
            </Link>
          ))}

        {session.user && (
          <Link href={`/channel/${session.user.username}`}>
            <a className="flex">
              <Image
                className="rounded-full cursor-pointer"
                src={session.user.image}
                alt={session.user.image}
                width="35"
                height="35"
              />

              <p className="ml-1 mr-3">{session.user.name}</p>
            </a>
          </Link>
        )}
        <a
          className="border px-4 py-1 font-bold rounded-full"
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
        >
          {session ? "logout" : "login"}
        </a>
      </div>
    </header>
  );
}
