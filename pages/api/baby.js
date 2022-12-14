// export default function handler(req, res) {

//   res.status(200).json({ name: "John Doe" });

// }

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const baby = await prisma.babyList.findMany();
  res.json(baby);
}
