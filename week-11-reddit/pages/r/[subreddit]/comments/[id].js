import Link from "next/link";
import prisma from "lib/prisma";
import {
  getVotes,
  getVote,
  getPostWithCommentsFromSubreddit,
  getSubreddit,
} from "lib/data";
import timeago from "lib/timeago";
import { useSession, getSession } from "next-auth/react";
import NewComment from "components/NewComment";
import Comments from "components/Comments";
import { useRouter } from "next/router";

export default function Post({ subreddit, post, votes, vote }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) {
    return null;
  }

  if (!subreddit)
    return <p className="text-center p-5">Subreddit does not exist 😞</p>;

  if (!post) return <p className="text-center p-5">Post does not exist 😞</p>;

  const sendVote = async (up) => {
    await fetch("/api/vote", {
      body: JSON.stringify({
        post: post.id,
        up,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    router.reload(window.location.pathname);
  };

  return (
    <>
      <header className="bg-black text-white h-12 pt-3 px-5 pb-2">
        <Link href={`/`}>
          <a className="underline">Home</a>
        </Link>
      </header>

      <header className="flex bg-black text-white h-12 pt-3 px-5 pb-2">
        <Link href={`/r/${subreddit.name}`}>
          <a className="text-center underline">/r/{subreddit.name}</a>
        </Link>
        <p className="ml-4 text-left grow">{subreddit.description}</p>
      </header>

      <div className="flex flex-row mx-20 my-10 p-10 px-6 border border-3 border-black bg-gray-200 ">
        <div className="flex flex-col pt-6 pr-8 text-center">
          <div
            className="cursor-pointer"
            onClick={async (e) => {
              e.preventDefault();
              sendVote(true);
            }}
          >
            {vote?.up ? "⬆️" : "↑"}
          </div>
          <div>{votes}</div>
          <div
            className="cursor-pointer"
            onClick={async (e) => {
              e.preventDefault();
              sendVote(false);
            }}
          >
            {!vote || vote?.up ? "↓" : "⬇️"}
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <div className="text-gray-800">
            <Link href={`/u/${post.author.name}`}>
              <a className="ml-1 underline">{post.author.name}</a>
            </Link>
            <span className="mx-2 underline">
              {timeago.format(new Date(post.createdAt))}
            </span>
          </div>
          <a className="text-2xl font-bold color-primary mt-5">{post.title}</a>
          {post.image && (
            <img className="object-scale-down h-64 mt-2" src={post.image} />
          )}
          <p className="text-base font-normal color-primary mt-2">
            {post.content}
          </p>
          {session ? (
            <NewComment post={post} />
          ) : (
            <p className="mt-5">
              <Link href="/api/auth/signin">
                <a className="mr-1 underline">Login</a>
              </Link>
              to add a comment
            </p>
          )}
          <Comments comments={post.comments} post={post} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const subreddit = await getSubreddit(context.params.subreddit, prisma);

  let post = null;
  if (subreddit) {
    post = await getPostWithCommentsFromSubreddit(
      parseInt(context.params.id),
      subreddit.name,
      prisma
    );
    post = JSON.parse(JSON.stringify(post));
  }

  let votes = await getVotes(parseInt(context.params.id), prisma);
  votes = JSON.parse(JSON.stringify(votes));

  let vote = await getVote(
    parseInt(context.params.id),
    session?.user.id,
    prisma
  );
  vote = JSON.parse(JSON.stringify(vote));

  return {
    props: {
      subreddit,
      post,
      vote,
      votes,
    },
  };
}
