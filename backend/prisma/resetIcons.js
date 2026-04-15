import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.subSubIcon.deleteMany();
  await prisma.subIcon.deleteMany();
  await prisma.icon.deleteMany();
  console.log("تم مسح كل الأيقونات ومحتواها الفرعي!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
  });
