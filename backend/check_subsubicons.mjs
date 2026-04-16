import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if subSubIcon table has data
    const count = await prisma.subSubIcon.count();
    console.log("SubSubIcon total count:", count);

    if (count > 0) {
      const items = await prisma.subSubIcon.findMany({ take: 5 });
      console.log("Sample SubSubIcons:", JSON.stringify(items, null, 2));
    }

    // Now try the include that the controller uses
    console.log("\n--- Testing subIcon include with subSubIcons ---");
    const subIcon = await prisma.subIcon.findFirst({
      include: {
        subSubIcons: true,
        icon: true,
      },
    });
    console.log("SubIcon keys:", Object.keys(subIcon || {}));
    console.log("Has subSubIcons?", "subSubIcons" in (subIcon || {}));
    console.log("subSubIcons length:", subIcon?.subSubIcons?.length);

    // Find a subIcon that actually has subSubIcons
    const subIconWithChildren = await prisma.subIcon.findFirst({
      where: {
        subSubIcons: {
          some: {},
        },
      },
      include: {
        subSubIcons: true,
        icon: true,
      },
    });
    console.log("\n--- SubIcon WITH subSubIcons ---");
    if (subIconWithChildren) {
      console.log("Found:", subIconWithChildren.title_en);
      console.log("subSubIcons count:", subIconWithChildren.subSubIcons.length);
      console.log("subSubIcons:", JSON.stringify(subIconWithChildren.subSubIcons.slice(0, 2), null, 2));
    } else {
      console.log("❌ NO subIcon has any subSubIcons in the database!");
    }
  } catch (e) {
    console.error("Error:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
