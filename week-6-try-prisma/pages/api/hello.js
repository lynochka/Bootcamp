// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "lib/prisma";

export default async (req, res) => {
  const data = req.body;

  switch (req.method) {
    case "GET":
      try {
        const result = await prisma.car.findMany();
        res.status(200).json(result);
      } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured." });
      }
      break;
  }
};
