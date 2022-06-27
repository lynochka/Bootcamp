import timeago from "lib/timeago";
import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <div className="flex flex-col border border-3 border-black p-10 bg-gray-200 mx-20 my-10">
      <div className=" text-gray-800">
        <Link href={`/r/${post.subredditName}`}>
          <a className="mr-2 underline">/r/{post.subredditName}</a>
        </Link>
        Posted by
        <Link href={`/u/${post.author.name}`}>
          <a className="ml-1 underline">{post.author.name}</a>
        </Link>
        <Link href={`/r/${post.subredditName}/comments/${post.id}`}>
          <a className="mx-2 underline">
            {timeago.format(new Date(post.createdAt))}
          </a>
        </Link>
      </div>

      <Link href={`/r/${post.subredditName}/comments/${post.id}`}>
        <a className="text-2xl font-bold color-primary mt-5">{post.title}</a>
      </Link>
      {post.image && (
        <Image
          className="object-left"
          alt={post.title}
          src={post.image}
          width={500}
          height={500}
          objectFit="contain"
        />
      )}
      <p className="text-base font-normal color-primary mt-2">{post.content}</p>
    </div>
  );
}
