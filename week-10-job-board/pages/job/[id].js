import { getSession } from "next-auth/react";
import { getJob, alreadyApplied } from "lib/data";
import prisma from "lib/prisma";
import Link from "next/link";
import Back from "components/Back";

export default function Job({ job, applied }) {
  return (
    <div className="flex flex-col w-2/3 mx-auto">
      <Back />
      <div className="text-center p-4 m-4">
        <div className="text-4xl font-bold">{job.title}</div>
      </div>

      <div className="mb-4 mt-20 pl-16 pr-16">
        <p className="text-base font-normal mt-3">{job.description}</p>
        {applied ? (
          <div className="mt-20 flex justify-center ">
            <Link href={`/dashboard`}>
              <button className=" border  px-8 py-2 mt-0  font-bold rounded-full bg-black text-white ">
                You already applied!
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-20 flex justify-center ">
            <Link href={`/job/${job.id}/apply`}>
              <button className=" border  px-8 py-2 mt-0  font-bold rounded-full bg-black text-white ">
                Apply to this job
              </button>
            </Link>
          </div>
        )}
        <div className="mt-4">
          Posted by{" "}
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
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let job = await getJob(context.params.id, prisma);
  job = JSON.parse(JSON.stringify(job));

  const applied = await alreadyApplied(
    session.user.id,
    context.params.id,
    prisma
  );

  return {
    props: {
      job,
      applied,
    },
  };
}
