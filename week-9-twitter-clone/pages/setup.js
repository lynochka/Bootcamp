import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import prisma from "lib/prisma";
import { getUserNames } from "lib/data";

export default function Setup({ userNames }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [name, setName] = useState("");

  if (!session || !session.user) return null;
  if (loading) return null;

  if (!loading && session.user.name) {
    router.push("/home");
  }

  return (
    <form
      className="mt-10 ml-20"
      onSubmit={async (e) => {
        e.preventDefault();

        if (userNames.includes(name)) {
          alert(`${name} already exists!`);
          return;
        }

        await fetch("/api/setup", {
          body: JSON.stringify({
            name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        session.user.name = name;
        router.push("/home");
      }}
    >
      <div className="flex-1 mb-5">
        <div className="flex-1 mb-5">Username</div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1"
        />
      </div>

      <button className="border px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover">
        Save
      </button>
    </form>
  );
}

export async function getServerSideProps() {
  let userNames = await getUserNames(prisma);

  return {
    props: {
      userNames,
    },
  };
}
