import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const iconInclude = {
  mainCategory: true,
  timePeriod: true,
  subIcons: {
    include: {
      subSubIcons: true,
    },
  },
};
const iconIncludeFallback = {
  mainCategory: true,
  timePeriod: true,
  subIcons: true,
};

const subIconInclude = {
  icon: true,
  subSubIcons: true,
};
const subIconIncludeFallback = {
  icon: true,
};

const isSubSubIconsIncludeError = (error) =>
  typeof error?.message === "string" &&
  error.message.includes("Unknown field `subSubIcons`") &&
  error.message.includes("include statement on model `SubIcon`");

const runWithSubSubIconsFallback = async (queryBuilder, fallbackBuilder = queryBuilder) => {
  try {
    return await queryBuilder();
  } catch (error) {
    if (!isSubSubIconsIncludeError(error)) {
      throw error;
    }

    console.warn("⚠️ subSubIcons include failed, using fallback. Error:", error.message);
    return fallbackBuilder();
  }
};

const resolveImagePath = (req) => {
  if (req.file) {
    return `/public/uploads/${req.file.filename}`;
  }

  const imageUrl = req.body.imageUrl || req.body.imgUrl || null;
  if (typeof imageUrl === "string" && imageUrl.startsWith("blob:")) {
    return null;
  }

  return imageUrl;
};

export const getAllIcons = async (req, res) => {
  try {
    const { category } = req.query;

    const icons = await runWithSubSubIconsFallback(
      () =>
        prisma.icon.findMany({
          where: category ? { category } : {},
          include: iconInclude,
        }),
      () =>
        prisma.icon.findMany({
          where: category ? { category } : {},
          include: iconIncludeFallback,
        }),
    );

    res.json(icons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching icons", error: error.message });
  }
};

export const getIconById = async (req, res) => {
  try {
    const icon = await runWithSubSubIconsFallback(
      () =>
        prisma.icon.findUnique({
          where: { id: Number(req.params.id) },
          include: iconInclude,
        }),
      () =>
        prisma.icon.findUnique({
          where: { id: Number(req.params.id) },
          include: iconIncludeFallback,
        }),
    );

    if (!icon) {
      return res.status(404).json({ message: "Icon not found" });
    }

    res.json(icon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching icon", error: error.message });
  }
};

export const createIcon = async (req, res) => {
  try {
    const {
      title_en,
      title_ar,
      title_fr,
      title_es,
      expression_en,
      expression_ar,
      expression_fr,
      expression_es,
      imgUrl,
      iconName,
      category,
      mainCategoryId,
      timePeriodId,
    } = req.body;

    if (!title_en || !category || !mainCategoryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const iconData = {
      title_en,
      title_ar: title_ar || "",
      title_fr: title_fr || "",
      title_es: title_es || "",
      expression_en: expression_en || "",
      expression_ar: expression_ar || "",
      expression_fr: expression_fr || "",
      expression_es: expression_es || "",
      imgUrl: imgUrl || null,
      iconName: iconName || null,
      category,
      mainCategory: {
        connect: { id: Number(mainCategoryId) },
      },
      timePeriod: timePeriodId
        ? {
            connect: { id: Number(timePeriodId) },
          }
        : undefined,
    };

    const icon = await runWithSubSubIconsFallback(
      () =>
        prisma.icon.create({
          data: iconData,
          include: iconInclude,
        }),
      () =>
        prisma.icon.create({
          data: iconData,
          include: iconIncludeFallback,
        }),
    );

    res.status(201).json(icon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating icon", error: error.message });
  }
};

export const updateIcon = async (req, res) => {
  try {
    const where = { id: Number(req.params.id) };
    const icon = await runWithSubSubIconsFallback(
      () =>
        prisma.icon.update({
          where,
          data: req.body,
          include: iconInclude,
        }),
      () =>
        prisma.icon.update({
          where,
          data: req.body,
          include: iconIncludeFallback,
        }),
    );

    res.json(icon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating icon", error: error.message });
  }
};

export const deleteIcon = async (req, res) => {
  try {
    await prisma.subSubIcon.deleteMany({
      where: {
        subIcon: {
          iconId: Number(req.params.id),
        },
      },
    });
    await prisma.subIcon.deleteMany({
      where: { iconId: Number(req.params.id) },
    });
    await prisma.icon.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Icon deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting icon", error: error.message });
  }
};

export const getSubIconById = async (req, res) => {
  try {
    const where = { id: Number(req.params.subIconId) };
    const subIcon = await runWithSubSubIconsFallback(
      () =>
        prisma.subIcon.findUnique({
          where,
          include: subIconInclude,
        }),
      () =>
        prisma.subIcon.findUnique({
          where,
          include: subIconIncludeFallback,
        }),
    );

    if (!subIcon) {
      return res.status(404).json({ message: "SubIcon not found" });
    }

    res.json(subIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching subIcon", error: error.message });
  }
};

export const createSubIcon = async (req, res) => {
  try {
    const {
      title_en,
      title_ar,
      title_fr,
      title_es,
      expression_en,
      expression_ar,
      expression_fr,
      expression_es,
      category,
    } = req.body;

    const subIconData = {
      title_en,
      title_ar: title_ar || "",
      title_fr: title_fr || "",
      title_es: title_es || "",
      expression_en: expression_en || "",
      expression_ar: expression_ar || "",
      expression_fr: expression_fr || "",
      expression_es: expression_es || "",
      imgUrl: resolveImagePath(req) || "",
      category: category || "",
      icon: {
        connect: { id: Number(req.params.iconId) },
      },
    };

    const subIcon = await runWithSubSubIconsFallback(
      () =>
        prisma.subIcon.create({
          data: subIconData,
          include: subIconInclude,
        }),
      () =>
        prisma.subIcon.create({
          data: subIconData,
          include: subIconIncludeFallback,
        }),
    );

    res.status(201).json(subIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating subIcon", error: error.message });
  }
};

export const updateSubIcon = async (req, res) => {
  try {
    const where = { id: Number(req.params.id) };
    const data = {
      ...req.body,
      ...(resolveImagePath(req) ? { imgUrl: resolveImagePath(req) } : {}),
    };
    const subIcon = await runWithSubSubIconsFallback(
      () =>
        prisma.subIcon.update({
          where,
          data,
          include: subIconInclude,
        }),
      () =>
        prisma.subIcon.update({
          where,
          data,
          include: subIconIncludeFallback,
        }),
    );

    res.json(subIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating subIcon", error: error.message });
  }
};

export const deleteSubIcon = async (req, res) => {
  try {
    await prisma.subIcon.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "SubIcon deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting subIcon", error: error.message });
  }
};

export const getSubSubIconById = async (req, res) => {
  try {
    const subSubIcon = await prisma.subSubIcon.findUnique({
      where: { id: Number(req.params.subSubIconId) },
      include: {
        subIcon: {
          include: {
            icon: true,
          },
        },
      },
    });

    if (!subSubIcon) {
      return res.status(404).json({ message: "SubSubIcon not found" });
    }

    res.json(subSubIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching subSubIcon", error: error.message });
  }
};

export const createSubSubIcon = async (req, res) => {
  try {
    const {
      title_en,
      title_ar,
      title_fr,
      title_es,
      expression_en,
      expression_ar,
      expression_fr,
      expression_es,
      category,
    } = req.body;

    const subSubIcon = await prisma.subSubIcon.create({
      data: {
        title_en,
        title_ar: title_ar || "",
        title_fr: title_fr || "",
        title_es: title_es || "",
        expression_en: expression_en || "",
        expression_ar: expression_ar || "",
        expression_fr: expression_fr || "",
        expression_es: expression_es || "",
        imgUrl: resolveImagePath(req),
        category: category || "",
        subIcon: {
          connect: { id: Number(req.params.subIconId) },
        },
      },
    });

    res.status(201).json(subSubIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating subSubIcon", error: error.message });
  }
};

export const updateSubSubIcon = async (req, res) => {
  try {
    const subSubIcon = await prisma.subSubIcon.update({
      where: { id: Number(req.params.id) },
      data: {
        ...req.body,
        ...(resolveImagePath(req) ? { imgUrl: resolveImagePath(req) } : {}),
      },
    });

    res.json(subSubIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating subSubIcon", error: error.message });
  }
};

export const deleteSubSubIcon = async (req, res) => {
  try {
    await prisma.subSubIcon.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "SubSubIcon deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting subSubIcon", error: error.message });
  }
};
