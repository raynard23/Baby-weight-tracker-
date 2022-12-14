import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const user = await prisma.User.findUnique();
  res.json(user);

  // 2023-01-11T13:52:28.102Z
}
