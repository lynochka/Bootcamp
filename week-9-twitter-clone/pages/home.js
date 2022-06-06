import { useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NewTweet from "components/NewTweet";
import Tweets from "components/Tweets";
import LoadMore from "components/LoadMore";

import prisma from "lib/prisma";
import { getTweets } from "lib/data";

export default function Home({ initialTweets }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  const [tweets, setTweets] = useState(initialTweets);

  if (loading) {
    return <p>...</p>;
  }

  if (!session) {
    router.push("/");
  }

  if (session && !session.user.name) {
    router.push("/setup");
  }

  return (
    <>
      <NewTweet tweets={tweets} setTweets={setTweets} />
      <Tweets tweets={tweets} />
      <LoadMore tweets={tweets} setTweets={setTweets} />
    </>
  );
}

export async function getServerSideProps() {
  let tweets = await getTweets(prisma, 2);

  tweets = JSON.parse(JSON.stringify(tweets)); // serialize dates

  return {
    props: {
      initialTweets: tweets,
    },
  };
}
