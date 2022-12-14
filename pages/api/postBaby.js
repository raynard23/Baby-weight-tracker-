import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  let { name, age, weight, bio } = req.body;
  // console.log("req", name, age, weight, bio);

  const baby = await prisma.babyList.create({
    data: {
      name: name,
      age: age,
      weight: weight,
      bio: bio,
      date: new Date(),
    },
  });
  res.json(baby);
}
