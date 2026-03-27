/*import { PrismaClient } from "@prisma/client";
import { icons, subIconsData } from "./data.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding main icons...");

  // Insert main icons with upsert
  await Promise.all(
    icons.map(async (icon) => {
      try {
        // Validation: must have either iconName or imgUrl
        if ((!icon.iconName && !icon.imgUrl) || (icon.iconName && icon.imgUrl)) {
          throw new Error(
            `Icon "${icon.title_en}" must have either iconName or imgUrl, not both or neither.`
          );
        }

        await prisma.icon.upsert({
          where: { title_en: icon.title_en },
          update: {},
          create: {
            title_en: icon.title_en,
            title_ar: icon.title_ar || "",
            title_fr: icon.title_fr || "",
            title_es: icon.title_es || "",
            expression_en: icon.expression_en || "",
            expression_ar: icon.expression_ar || "",
            expression_fr: icon.expression_fr || "",
            expression_es: icon.expression_es || "",
            iconName: icon.iconName || null,
            imgUrl: icon.imgUrl || null,
            category: icon.category || "",
          },
        });

        console.log(`Main icon created/upserted: ${icon.title_en}`);
      } catch (err) {
        console.error(`Error creating main icon ${icon.title_en}:`, err.message);
      }
    })
  );

  console.log("Main icons created.");

  // Fetch all main icons to link sub-icons
  const mainIcons = await prisma.icon.findMany();

  console.log("Seeding sub icons...");

  await Promise.all(
    mainIcons.map(async (mainIcon) => {
      const subIcons = subIconsData[mainIcon.title_en];
      if (!subIcons) return;

      await Promise.all(
        subIcons.map(async (s) => {
          try {
            await prisma.subIcon.upsert({
              where: { title_en_iconId: { title_en: s.title_en, iconId: mainIcon.id } },
              update: {},
              create: {
                title_en: s.title_en,
                title_ar: s.title_ar || "",
                title_fr: s.title_fr || "",
                title_es: s.title_es || "",
                imageUrl: s.img || "",
                expression_en: `${mainIcon.expression_en} - ${s.title_en}`,
                expression_ar: `${mainIcon.expression_ar} - ${s.title_ar}`,
                expression_fr: `${mainIcon.expression_fr} - ${s.title_fr}`,
                expression_es: `${mainIcon.expression_es} - ${s.title_es}`,
                icon: { connect: { id: mainIcon.id } },
              },
            });

            console.log(
              `Sub icon created/upserted: ${s.title_en} for main icon: ${mainIcon.title_en}`
            );
          } catch (err) {
            console.error(`Error creating sub icon ${s.title_en}:`, err.message);
          }
        })
      );
    })
  );

  console.log("All sub icons created.");
}

main()
  .catch((err) => console.error("Seed script failed:", err))
  .finally(async () => {
    await prisma.$disconnect();
  });*/
  /*import { PrismaClient } from "@prisma/client";
import { icons, subIconsData } from "./data.js";

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

async function main() {
  console.log("🌱 Seeding main icons...");

  // ===== MAIN ICONS =====
  for (const icon of icons) {
    try {
      // validation
      if ((!icon.iconName && !icon.imgUrl) || (icon.iconName && icon.imgUrl)) {
        throw new Error(
          `Icon "${icon.title_en}" must have either iconName OR imgUrl`
        );
      }

      await prisma.icon.upsert({
        where: { title_en: icon.title_en },
        update: {},
        create: {
          title_en: icon.title_en,
          title_ar: icon.title_ar || "",
          title_fr: icon.title_fr || "",
          title_es: icon.title_es || "",
          expression_en: icon.expression_en || "",
          expression_ar: icon.expression_ar || "",
          expression_fr: icon.expression_fr || "",
          expression_es: icon.expression_es || "",
          iconName: icon.iconName || null,
          imgUrl: icon.imgUrl || null,
          category: icon.category || "",
        },
      });

      console.log(`✅ Main icon: ${icon.title_en}`);
    } catch (err) {
      console.error(`❌ Main icon error (${icon.title_en}):`, err.message);
    }
  }

  console.log("✅ Main icons done");

  // ===== FETCH MAIN ICONS =====
  const mainIcons = await prisma.icon.findMany();

  console.log("🌱 Seeding sub icons...");

  // ===== SUB ICONS =====
  for (const mainIcon of mainIcons) {
    const subIcons = subIconsData[mainIcon.title_en];
    if (!subIcons) continue;

    for (const s of subIcons) {
      try {
        await prisma.subIcon.upsert({
          where: {
            title_en_iconId: {
              title_en: s.title_en,
              iconId: mainIcon.id,
            },
          },
          update: {},
          create: {
            title_en: s.title_en,
            title_ar: s.title_ar || "",
            title_fr: s.title_fr || "",
            title_es: s.title_es || "",
            imageUrl: s.img || "",
            expression_en: `${mainIcon.expression_en} - ${s.title_en}`,
            expression_ar: `${mainIcon.expression_ar} - ${s.title_ar}`,
            expression_fr: `${mainIcon.expression_fr} - ${s.title_fr}`,
            expression_es: `${mainIcon.expression_es} - ${s.title_es}`,
            icon: {
              connect: { id: mainIcon.id },
            },
          },
        });

        console.log(
          `✅ Sub icon: ${s.title_en} → ${mainIcon.title_en}`
        );
      } catch (err) {
        console.error(
          `❌ Sub icon error (${s.title_en}):`,
          err.message
        );
      }
    }
  }

  console.log("🎉 All seeding completed successfully");
}

main()
  .catch((err) => {
    console.error("🔥 Seed failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
*/
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

// ─────────────────────────────────────────────
//  Map: icon category → its sub-icons array
// ─────────────────────────────────────────────
const subIconsMap = {
  "Animals":        animalSubIcons,
  "Get Dressed":    getDressedSubIcons,
  "Family":         familySubIcons,
  "Feelings":       feelingsSubIcons,
  "Food and Drink": foodAndDrinkSubIcons,
  "Drinking":       drinkingSubIcons,
  "Sleeping":       sleepingSubIcons,
  "Transport":      transportSubIcons,
  "Call":           callSubIcons,
  "Talk":           talkSubIcons,
  "Listen":         listenSubIcons,
  "Home":           homeSubIcons,
  "places":         placesSubIcons,
  "Breakfast":      breakfastSubIcons,
  "Lunch":          lunchSubIcons,
  "Dinner":         dinnerSubIcons,
  "Snack":          snackSubIcons,
  "TV":             tvSubIcons,
  "Play":           playSubIcons,
  "Music":          musicSubIcons,
  "Questions":      questionsSubIcons,
  "Relations":      relationsSubIcons,
  "Times":          timesSubIcons,
  "Tools":          toolsSubIcons,
  "Verbs":          verbsSubIcons,
  "Reminder Mee":   memoriesSubIcons,
  "Neighbours":     neighboursSubIcons,
  "Medicine":       medicineSubIcons,
  "Doctor":         doctorSubIcons,
  "Afraid":         afraidSubIcons,
};

const prisma = new PrismaClient({ log: ["error", "warn"] });

async function main() {

  // ─────────────────────────────────────────────
  //  1. MAIN CATEGORIES
  // ─────────────────────────────────────────────
  /*console.log("🌱 Seeding main categories...");
  for (const cat of mainCategories) {
    await prisma.mainCategory.upsert({
      where:  { name: cat.name },
      update: {},
      create: { name: cat.name },
    });
  }
  console.log("✅ Main categories done");*/
 

// ─────────────────────────────────────────────
//  1. MAIN CATEGORIES
// ─────────────────────────────────────────────
console.log("🌱 Seeding main categories...");
for (const cat of mainCategories) {
  await prisma.mainCategory.upsert({
    where:  { name: cat.name },
    update: {
      title_en: cat.title_en,
      title_ar: cat.title_ar,
      title_fr: cat.title_fr,
      title_es: cat.title_es,
      imgUrl:   cat.imgUrl ?? null,
    },
    create: {
      name:     cat.name,
      title_en: cat.title_en,
      title_ar: cat.title_ar,
      title_fr: cat.title_fr,
      title_es: cat.title_es,
      imgUrl:   cat.imgUrl ?? null,
    },
  });
}
console.log("✅ Main categories done");
 
// ─────────────────────────────────────────────
//  2. TIME PERIODS
// ─────────────────────────────────────────────
console.log("🌱 Seeding time periods...");
 
for (const tp of timePeriods) {
  const category = await prisma.mainCategory.findUnique({
    where: { name: tp.mainCategory },
  });
 
  if (!category) {
    console.log(`❌ Category not found: ${tp.mainCategory}`);
    continue;
  }
 
  await prisma.timePeriod.upsert({
    where: {
      name_mainCategoryId: {
        name:           tp.name,
        mainCategoryId: category.id,
      },
    },
    update: {
      title_en: tp.title_en,
      title_ar: tp.title_ar,
      title_fr: tp.title_fr,
      title_es: tp.title_es,
      imgUrl:   tp.imgUrl ?? null,
    },
    create: {
      name:           tp.name,
      title_en:       tp.title_en,
      title_ar:       tp.title_ar,
      title_fr:       tp.title_fr,
      title_es:       tp.title_es,
      imgUrl:         tp.imgUrl ?? null,
      order:          tp.order,
      mainCategoryId: category.id,
    },
  });
 
  console.log(`✅ TimePeriod: ${tp.name}`);
}
 
console.log("✅ Time periods done");
 

  // ─────────────────────────────────────────────
  //  2. TIME PERIODS
  // ─────────────────────────────────────────────
  /*console.log("🌱 Seeding time periods...");
  /*for (const tp of timePeriods) {
    await prisma.timePeriod.upsert({
      where:  { name: tp.name },
      update: {},
      create: {
        name:         tp.name,
        order:        tp.order,
        mainCategory: tp.mainCategory,
      },
    });
  }*
 console.log("🌱 Seeding time periods...");

for (const tp of timePeriods) {
  const category = await prisma.mainCategory.findUnique({
    where: { name: tp.mainCategory },
  });

  if (!category) {
    console.log(`❌ Category not found: ${tp.mainCategory}`);
    continue;
  }

  await prisma.timePeriod.upsert({
    where: {
      name_mainCategoryId: {
        name: tp.name,
        mainCategoryId: category.id,
      },
    },
    update: {},
    create: {
      name: tp.name,
      order: tp.order,
      mainCategoryId: category.id,
    },
  });

  console.log(`✅ TimePeriod: ${tp.name}`);
}

console.log("✅ Time periods done");*/

  // ─────────────────────────────────────────────
  //  3. EMERGENCY NUMBERS
  // ─────────────────────────────────────────────
  console.log("🌱 Seeding emergency numbers...");
  for (const en of emergencyNumbers) {
    await prisma.emergencyNumber.upsert({
      where:  { number: en.number },
      update: {},
      create: {
        number:   en.number,
        label_en: en.label_en,
        label_ar: en.label_ar,
        label_fr: en.label_fr,
        label_es: en.label_es,
      },
    });
  }
  console.log("✅ Emergency numbers done");

  // ─────────────────────────────────────────────
  //  4. MAIN ICONS
  // ─────────────────────────────────────────────
  console.log("🌱 Seeding main icons...");
  /*for (const icon of icons) {
    try {
      await prisma.icon.upsert({
        where: {
          title_en_category: {
            title_en: icon.title_en,
            category: icon.category,
          },
        },
        update: {},
        create: {
          title_en:      icon.title_en,
          title_ar:      icon.title_ar      || "",
          title_fr:      icon.title_fr      || "",
          title_es:      icon.title_es      || "",
          expression_en: icon.expression_en || "",
          expression_ar: icon.expression_ar || "",
          expression_fr: icon.expression_fr || "",
          expression_es: icon.expression_es || "",
          imgUrl:        icon.imgUrl        || null,
          iconName:      icon.iconName      || null,
          category:      icon.category      || "",
          timePeriod:    icon.timePeriod    || null,
          mainCategory:  icon.mainCategory  || "",
        },
      });
      console.log(`✅ Icon: ${icon.title_en} [${icon.category}]`);
    } catch (err) {
      console.error(`❌ Icon error (${icon.title_en}):`, err.message);
    }
  }*/
 console.log("🌱 Seeding main icons...");

for (const icon of icons) {
  try {
    const mainCategory = await prisma.mainCategory.findUnique({
      where: { name: icon.mainCategory },
    });

    if (!mainCategory) {
      console.log(`❌ MainCategory not found: ${icon.mainCategory}`);
      continue;
    }

    let timePeriod = null;
    if (icon.timePeriod) {
      timePeriod = await prisma.timePeriod.findFirst({
        where: { name: icon.timePeriod },
      });
    }

    await prisma.icon.upsert({
      where: {
        title_en_category: {
          title_en: icon.title_en,
          category: icon.category,
        },
      },
      update: {},
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
        timePeriodId: timePeriod?.id || null,
      },
    });

    console.log(`✅ Icon: ${icon.title_en}`);
  } catch (err) {
    console.error(`❌ Icon error (${icon.title_en}):`, err.message);
  }
}

  console.log("✅ Main icons done");

  // ─────────────────────────────────────────────
  //  5. SUB-ICONS
  // ─────────────────────────────────────────────
  console.log("🌱 Seeding sub-icons...");

  const dbIcons = await prisma.icon.findMany();

  for (const dbIcon of dbIcons) {
    const subIcons = subIconsMap[dbIcon.category];
    if (!subIcons || subIcons.length === 0) continue;

    for (const s of subIcons) {
      try {
        await prisma.subIcon.upsert({
          where: {
            title_en_iconId: {
              title_en: s.title_en,
              iconId:   dbIcon.id,
            },
          },
          update: {},
          create: {
            title_en:      s.title_en      || "",
            title_ar:      s.title_ar      || "",
            title_fr:      s.title_fr      || "",
            title_es:      s.title_es      || "",
            expression_en: s.expression_en || "",
            expression_ar: s.expression_ar || "",
            expression_fr: s.expression_fr || "",
            expression_es: s.expression_es || "",
            imgUrl:        s.imgUrl        || "",
            category:      s.category      || "",
            icon: { connect: { id: dbIcon.id } },
          },
        });
        console.log(`✅ SubIcon: ${s.title_en} → ${dbIcon.title_en}`);
      } catch (err) {
        console.error(`❌ SubIcon error (${s.title_en} → ${dbIcon.title_en}):`, err.message);
      }
    }
  }

  console.log("🎉 All seeding completed successfully!");
}

main()
  .catch((err) => {
    console.error("🔥 Seed failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
