import { useState } from "react";
import { amount } from "lib/config";
import prisma from "lib/prisma";
import {
  getUser,
  getVideos,
  getSubscribersCount,
  isSubscribed,
} from "lib/data";
import Videos from "components/Videos";
import LoadMore from "components/LoadMore";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Heading from "components/Heading";
import SubscribedButton from "components/SubscribedButton";
import { useSession, getSession } from "next-auth/react";

export default function Channel({
  user,
  initialVideos,
  subscribers,
  subscribed,
}) {
  const [videos, setVideos] = useState(initialVideos);
  const [reachedEnd, setReachedEnd] = useState(initialVideos.length < amount);
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!user)
    return <p className="text-center p-5">Channel does not exist 😞</p>;

  return (
    <>
      <Head>
        <title>Channel of {user.name}</title>
        <meta name="description" content={`Channel of ${user.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading />
      <div className="flex items-center m-5">
        <div className="flex-none mt-2 mr-2">
          {user.image && (
            <Link href={`/channel/${user.name}`}>
              <Image
                className="rounded-full cursor-pointer"
                src={user.image}
                alt={user.image}
                width="80"
                height="80"
              />
            </Link>
          )}
        </div>
        <div className="flex-auto">
          <div className="text-gray-200">
            <Link href={`/channel/${user.name}`}>
              <a className="text-xl font-bold">{user.name}</a>
            </Link>
          </div>
          <div className="text-gray-400 text-sm">{subscribers} subscribers</div>
        </div>
        <div className="mt-12 mr-5">
          {session && user.id === session.user.id ? (
            <>
              <Link href={`/upload`}>
                <a className="bg-green-500 px-3 py-2 rounded-md">
                  Upload new video
                </a>
              </Link>
            </>
          ) : (
            <SubscribedButton user={user} subscribed={subscribed} />
          )}
        </div>
      </div>

      <div>
        <Videos videos={videos} />
        {!reachedEnd && (
          <LoadMore
            videos={videos}
            setVideos={setVideos}
            setReachedEnd={setReachedEnd}
            author={user}
          />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let user = await getUser(context.params.username, prisma);
  user = JSON.parse(JSON.stringify(user));

  let videos = [];
  if (user) {
    videos = await getVideos({ author: user.id }, prisma);
    videos = JSON.parse(JSON.stringify(videos));
  }

  const subscribers = await getSubscribersCount(
    context.params.username,
    prisma
  );

  const session = await getSession(context);
  let subscribed = null;
  if (session) {
    subscribed = await isSubscribed(session.user.username, user.id, prisma);
  }

  return {
    props: {
      initialVideos: videos,
      user,
      subscribers,
      subscribed,
    },
  };
}
