import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Job = ({ job, isDashboard }) => {
  const router = useRouter();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  return (
    <div className="mb-4 mt-20 pl-16 pr-16">
      <Link href={`/job/${job.id}`}>
        <a className="text-xl font-bold underline">{job.title}</a>
      </Link>
      <h2 className="text-base font-normal mt-3">{job.description}</h2>

      <div className="mt-4">
        {isDashboard && (
          <button
            className="bg-black text-white uppercase text-sm p-2 mr-5"
            onClick={async () => {
              setIsButtonLoading(true);
              await fetch("/api/job", {
                body: JSON.stringify({
                  id: job.id,
                  task: job.published ? "unpublish" : "publish",
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "PUT",
              });
              setIsButtonLoading(false);
              router.reload(window.location.pathname);
            }}
          >
            {isButtonLoading ? "... " : ""}
            {job.published ? "✅ Published" : "❌ Unpublished"}
          </button>
        )}

        <div className="inline">
          Posted by&nbsp;
          <span>
            <Link href={`/company/${job.author.id}`}>
              <a>
                <span className="text-base font-medium color-primary underline">
                  {job.author.name}
                </span>
              </a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Job;
