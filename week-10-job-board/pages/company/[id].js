import { getCompanyJobs, getCompany } from "lib/data";
import prisma from "lib/prisma";
import Link from "next/link";
import Job from "components/Job";
import Back from "components/Back";

export default function Company({ company, jobs }) {
  return (
    <div>
      <Back />

      <div className="text-center p-4 m-4">
        <div className="text-4xl font-bold">Profile of {company.name}</div>
      </div>

      <div className="mb-4 mt-20 pl-16 pr-16">
        <p className="text-center text-xl font-bold">Company jobs</p>
        {jobs.map((job, index) => (
          <Job key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let company = await getCompany(params.id, prisma);
  let jobs = await getCompanyJobs(params.id, prisma);
  company = JSON.parse(JSON.stringify(company));
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      jobs,
      company,
    },
  };
}
