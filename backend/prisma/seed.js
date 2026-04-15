import { PrismaClient } from "@prisma/client";
import {
  mainCategories,
  emergencyNumbers,
  timePeriods,
  icons,
  animalSubIcons,
  getDressedSubIcons,
  familySubIcons,
  feelingsSubIcons,
  foodAndDrinkSubIcons,
  drinkingSubIcons,
  sleepingSubIcons,
  transportSubIcons,
  callSubIcons,
  talkSubIcons,
  listenSubIcons,
  homeSubIcons,
  placesSubIcons,
  breakfastSubIcons,
  lunchSubIcons,
  dinnerSubIcons,
  snackSubIcons,
  tvSubIcons,
  playSubIcons,
  musicSubIcons,
  questionsSubIcons,
  relationsSubIcons,
  timesSubIcons,
  toolsSubIcons,
  verbsSubIcons,
  memoriesSubIcons,
  neighboursSubIcons,
  medicineSubIcons,
  doctorSubIcons,
  afraidSubIcons,
} from "./data.js";
import { subSubIconsMap } from "./subSubIconData.js";

const prisma = new PrismaClient({ log: ["error", "warn"] });

const subIconsMap = {
  Animals: animalSubIcons,
  "Get Dressed": getDressedSubIcons,
  Family: familySubIcons,
  Feelings: feelingsSubIcons,
  "Food and Drink": foodAndDrinkSubIcons,
  Drinking: drinkingSubIcons,
  Sleeping: sleepingSubIcons,
  Transport: transportSubIcons,
  Call: callSubIcons,
  Talk: talkSubIcons,
  Listen: listenSubIcons,
  Home: homeSubIcons,
  places: placesSubIcons,
  Breakfast: breakfastSubIcons,
  Lunch: lunchSubIcons,
  Dinner: dinnerSubIcons,
  Snack: snackSubIcons,
  TV: tvSubIcons,
  Play: playSubIcons,
  Music: musicSubIcons,
  Questions: questionsSubIcons,
  Relations: relationsSubIcons,
  Times: timesSubIcons,
  Tools: toolsSubIcons,
  Verbs: verbsSubIcons,
  "Reminder Mee": memoriesSubIcons,
  Neighbours: neighboursSubIcons,
  Medicine: medicineSubIcons,
  Doctor: doctorSubIcons,
  Afraid: afraidSubIcons,
};

const getSubSubKey = (subIcon) => `${subIcon.category}::${subIcon.title_en}`;

async function seedMainCategories() {
  console.log("Seeding main categories...");

  for (const category of mainCategories) {
    await prisma.mainCategory.upsert({
      where: { name: category.name },
      update: {
        title_en: category.title_en,
        title_ar: category.title_ar,
        title_fr: category.title_fr,
        title_es: category.title_es,
        imgUrl: category.imgUrl ?? null,
      },
      create: {
        name: category.name,
        title_en: category.title_en,
        title_ar: category.title_ar,
        title_fr: category.title_fr,
        title_es: category.title_es,
        imgUrl: category.imgUrl ?? null,
      },
    });
  }
}

async function seedTimePeriods() {
  console.log("Seeding time periods...");

  for (const period of timePeriods) {
    const category = await prisma.mainCategory.findUnique({
      where: { name: period.mainCategory },
    });

    if (!category) {
      console.warn(`Skipping time period "${period.name}" because category "${period.mainCategory}" was not found.`);
      continue;
    }

    await prisma.timePeriod.upsert({
      where: {
        name_mainCategoryId: {
          name: period.name,
          mainCategoryId: category.id,
        },
      },
      update: {
        title_en: period.title_en,
        title_ar: period.title_ar,
        title_fr: period.title_fr,
        title_es: period.title_es,
        imgUrl: period.imgUrl ?? null,
        order: period.order,
      },
      create: {
        name: period.name,
        title_en: period.title_en,
        title_ar: period.title_ar,
        title_fr: period.title_fr,
        title_es: period.title_es,
        imgUrl: period.imgUrl ?? null,
        order: period.order,
        mainCategoryId: category.id,
      },
    });
  }
}

async function seedEmergencyNumbers() {
  console.log("Seeding emergency numbers...");

  for (const emergency of emergencyNumbers) {
    await prisma.emergencyNumber.upsert({
      where: { number: emergency.number },
      update: {
        label_en: emergency.label_en,
        label_ar: emergency.label_ar,
        label_fr: emergency.label_fr,
        label_es: emergency.label_es,
      },
      create: emergency,
    });
  }
}

async function seedIcons() {
  console.log("Seeding icons...");

  for (const icon of icons) {
    const mainCategory = await prisma.mainCategory.findUnique({
      where: { name: icon.mainCategory },
    });

    if (!mainCategory) {
      console.warn(`Skipping icon "${icon.title_en}" because main category "${icon.mainCategory}" was not found.`);
      continue;
    }

    let timePeriodId = null;

    if (icon.timePeriod) {
      const period = await prisma.timePeriod.findFirst({
        where: {
          name: icon.timePeriod,
          mainCategoryId: mainCategory.id,
        },
      });
      timePeriodId = period?.id ?? null;
    }

    await prisma.icon.upsert({
      where: {
        title_en_category: {
          title_en: icon.title_en,
          category: icon.category,
        },
      },
      update: {
        title_ar: icon.title_ar || "",
        title_fr: icon.title_fr || "",
        title_es: icon.title_es || "",
        expression_en: icon.expression_en || "",
        expression_ar: icon.expression_ar || "",
        expression_fr: icon.expression_fr || "",
        expression_es: icon.expression_es || "",
        imgUrl: icon.imgUrl || null,
        iconName: icon.iconName || null,
        mainCategoryId: mainCategory.id,
        timePeriodId,
      },
      create: {
        title_en: icon.title_en,
        title_ar: icon.title_ar || "",
        title_fr: icon.title_fr || "",
        title_es: icon.title_es || "",
        expression_en: icon.expression_en || "",
        expression_ar: icon.expression_ar || "",
        expression_fr: icon.expression_fr || "",
        expression_es: icon.expression_es || "",
        imgUrl: icon.imgUrl || null,
        iconName: icon.iconName || null,
        category: icon.category || "",
        mainCategoryId: mainCategory.id,
        timePeriodId,
      },
    });
  }
}

async function seedSubIcons() {
  console.log("Seeding sub-icons...");

  const dbIcons = await prisma.icon.findMany();

  for (const dbIcon of dbIcons) {
    const subIcons = subIconsMap[dbIcon.category];
    if (!subIcons?.length) continue;

    for (const subIcon of subIcons) {
      await prisma.subIcon.upsert({
        where: {
          title_en_iconId: {
            title_en: subIcon.title_en,
            iconId: dbIcon.id,
          },
        },
        update: {
          title_ar: subIcon.title_ar || "",
          title_fr: subIcon.title_fr || "",
          title_es: subIcon.title_es || "",
          expression_en: subIcon.expression_en || "",
          expression_ar: subIcon.expression_ar || "",
          expression_fr: subIcon.expression_fr || "",
          expression_es: subIcon.expression_es || "",
          imgUrl: subIcon.imgUrl || "",
          category: subIcon.category || dbIcon.category,
        },
        create: {
          title_en: subIcon.title_en || "",
          title_ar: subIcon.title_ar || "",
          title_fr: subIcon.title_fr || "",
          title_es: subIcon.title_es || "",
          expression_en: subIcon.expression_en || "",
          expression_ar: subIcon.expression_ar || "",
          expression_fr: subIcon.expression_fr || "",
          expression_es: subIcon.expression_es || "",
          imgUrl: subIcon.imgUrl || "",
          category: subIcon.category || dbIcon.category,
          icon: {
            connect: { id: dbIcon.id },
          },
        },
      });
    }
  }
}

async function seedSubSubIcons() {
  console.log("Seeding sub-sub-icons...");

  const dbSubIcons = await prisma.subIcon.findMany();

  for (const dbSubIcon of dbSubIcons) {
    const subSubIcons = subSubIconsMap[getSubSubKey(dbSubIcon)];
    if (!subSubIcons?.length) continue;

    for (const subSubIcon of subSubIcons) {
      await prisma.subSubIcon.upsert({
        where: {
          title_en_subIconId: {
            title_en: subSubIcon.title_en,
            subIconId: dbSubIcon.id,
          },
        },
        update: {
          title_ar: subSubIcon.title_ar || "",
          title_fr: subSubIcon.title_fr || "",
          title_es: subSubIcon.title_es || "",
          expression_en: subSubIcon.expression_en || "",
          expression_ar: subSubIcon.expression_ar || "",
          expression_fr: subSubIcon.expression_fr || "",
          expression_es: subSubIcon.expression_es || "",
          imgUrl: subSubIcon.imgUrl || null,
          category: subSubIcon.category || dbSubIcon.category,
        },
        create: {
          title_en: subSubIcon.title_en || "",
          title_ar: subSubIcon.title_ar || "",
          title_fr: subSubIcon.title_fr || "",
          title_es: subSubIcon.title_es || "",
          expression_en: subSubIcon.expression_en || "",
          expression_ar: subSubIcon.expression_ar || "",
          expression_fr: subSubIcon.expression_fr || "",
          expression_es: subSubIcon.expression_es || "",
          imgUrl: subSubIcon.imgUrl || null,
          category: subSubIcon.category || dbSubIcon.category,
          subIcon: {
            connect: { id: dbSubIcon.id },
          },
        },
      });
    }
  }
}

async function main() {
  await seedMainCategories();
  await seedTimePeriods();
  await seedEmergencyNumbers();
  await seedIcons();
  await seedSubIcons();
  await seedSubSubIcons();
  console.log("Seeding finished successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
