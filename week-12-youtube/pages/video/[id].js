import Link from "next/link";
import Image from "next/image";
import prisma from "lib/prisma";
import { getVideo, getVideos } from "lib/data";
import timeago from "lib/timeago";
import Video from "components/Video";
import Heading from "components/Heading";
import { useEffect } from "react";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function SingleVideo({ video, videos }) {
  useEffect(() => {
    const incrementViews = async () => {
      await fetch("/api/view", {
        body: JSON.stringify({
          video: video.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    };
    incrementViews();
  }, []);

  if (!video) return <p className="text-center p-5">Video does not exist 😞</p>;

  return (
    <>
      <Heading />

      <div className="flex">
        <div className="w-full md:w-2/3">
          <div className="bg-black">
            <div className="relative pt-[50%]">
              <ReactPlayer
                className="react-player absolute top-0 left-0"
                url={video.url}
                width="100%"
                height="100%"
                controls={true}
                light={video.thumbnail}
              />
            </div>

            <div className="px-5 mt-5 mb-5">
              <p className="text-2xl font-bold ">{video.title}</p>

              <div className="text-gray-400">
                {video.views + 1} views ·{" "}
                {timeago.format(new Date(video.createdAt))}
              </div>

              <div className="flex items-center border-t border-gray-500 mt-5 pt-5">
                <div className="flex-none mt-2 mr-2">
                  {video.author.image && (
                    <Link href={`/channel/${video.author.username}`}>
                      <Image
                        className="rounded-full cursor-pointer"
                        src={video.author.image}
                        alt={video.author.image}
                        width="50"
                        height="50"
                      />
                    </Link>
                  )}
                </div>
                <div className="flex-auto">
                  <div className="text-gray-200">
                    <Link href={`/channel/${video.author.username}`}>
                      <a className="text-xl">{video.author.name}</a>
                    </Link>
                  </div>
                  <div className="text-gray-400 text-sm">Add # subscribers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:w-1/3">
          <div className="flex flex-wrap">
            {videos.map((video, index) => (
              <div className="w-full" key={index}>
                <Video video={video} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let video = await getVideo(context.params.id, prisma);
  video = JSON.parse(JSON.stringify(video));

  let videos = await getVideos({ take: 3 }, prisma);
  videos = JSON.parse(JSON.stringify(videos));

  return {
    props: {
      video,
      videos,
    },
  };
}
