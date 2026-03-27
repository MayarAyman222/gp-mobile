
/*import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ====== ICON APIs ======

// Get all icons or filter by category
export const getAllIcons = async (req, res) => {
  try {
    const { category } = req.query;

    let icons;
    if (category) {
      icons = await prisma.icon.findMany({
        where: { category },
        include: { subIcons: true },
      });
    } else {
      icons = await prisma.icon.findMany({
        include: { subIcons: true },
      });
    }

    res.json(icons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icons", error: err.message });
  }
};

// Get single icon by ID
export const getIconById = async (req, res) => {
  try {
    const { id } = req.params;
    const icon = await prisma.icon.findUnique({
      where: { id: parseInt(id) },
      include: { subIcons: true },
    });

    if (!icon) return res.status(404).json({ message: "Icon not found" });

    if (icon.subIcons && icon.subIcons.length > 0) {
      return res.json({ type: "dashboard", icon, subIcons: icon.subIcons });
    } else {
      return res.json({ type: "details", icon });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icon", error: err.message });
  }
};

// Create new icon
export const createIcon = async (req, res) => {
  try {
    const { title, expression, iconName, category } = req.body;

    if (!title || !expression || !iconName || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIcon = await prisma.icon.create({
      data: { title, expression, iconName, category },
    });

    res.status(201).json(newIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating icon", error: error.message });
  }
};

// Update icon
export const updateIcon = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, expression, iconName, category } = req.body;

    const updatedIcon = await prisma.icon.update({
      where: { id: parseInt(id) },
      data: { title, expression, iconName, category },
    });

    res.json(updatedIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating icon", error: error.message });
  }
};

// Delete icon
export const deleteIcon = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.icon.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Icon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting icon", error: error.message });
  }
};

// ====== SUBICON APIs ======

// Get single SubIcon by ID
export const getSubIconById = async (req, res) => {
  try {
    const { subIconId } = req.params;
    const subIcon = await prisma.subIcon.findUnique({
      where: { id: parseInt(subIconId) },
      include: { icon: true }, // optional: include parent icon
    });

    console.log("Fetched SubIcon:", subIcon);
    if (!subIcon) return res.status(404).json({ message: "SubIcon not found" });
    res.json(subIcon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching subIcon", error: err.message });
  }
};

// Create SubIcon under a specific Icon
export const createSubIcon = async (req, res) => {
  try {
    const { iconId } = req.params;
    const { title, expression, iconName } = req.body;

    if (!title || !expression || !iconName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSubIcon = await prisma.subIcon.create({
      data: {
        title,
        expression,
        iconName,
        icon: { connect: { id: parseInt(iconId) } },
      },
    });

    res.status(201).json(newSubIcon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating subIcon", error: err.message });
  }
};

// Update SubIcon
export const updateSubIcon = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, expression, iconName } = req.body;

    const updatedSubIcon = await prisma.subIcon.update({
      where: { id: parseInt(id) },
      data: { title, expression, iconName },
    });

    res.json(updatedSubIcon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating subIcon", error: err.message });
  }
};

// Delete SubIcon
export const deleteSubIcon = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.subIcon.delete({ where: { id: parseInt(id) } });
    res.json({ message: "SubIcon deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting subIcon", error: err.message });
  }
};
*/
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ====== ICON APIs ======

// Get all icons
export const getAllIcons = async (req, res) => {
  try {
    const { category } = req.query;

    const icons = await prisma.icon.findMany({
      where: category ? { category } : {},
      include: {
        subIcons: true,
        mainCategory: true,
        timePeriod: true,
      },
    });

    res.json(icons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icons", error: err.message });
  }
};

// Get icon by ID
export const getIconById = async (req, res) => {
  try {
    const { id } = req.params;

    const icon = await prisma.icon.findUnique({
      where: { id: Number(id) },
      include: {
        subIcons: true,
        mainCategory: true,
        timePeriod: true,
      },
    });

    if (!icon) return res.status(404).json({ message: "Icon not found" });

    res.json(icon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icon", error: err.message });
  }
};

// Create Icon
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

    const icon = await prisma.icon.create({
      data: {
        title_en,
        title_ar: title_ar || "",
        title_fr: title_fr || "",
        title_es: title_es || "",
        expression_en: expression_en || "",
        expression_ar: expression_ar || "",
        expression_fr: expression_fr || "",
        expression_es: expression_es || "",
        imgUrl,
        iconName,
        category,
        mainCategory: { connect: { id: Number(mainCategoryId) } },
        timePeriod: timePeriodId
          ? { connect: { id: Number(timePeriodId) } }
          : undefined,
      },
    });

    res.status(201).json(icon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating icon", error: err.message });
  }
};

// Update Icon
export const updateIcon = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.icon.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating icon", error: err.message });
  }
};

// Delete Icon
export const deleteIcon = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.icon.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Icon deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting icon", error: err.message });
  }
};

// ===== SUB ICONS =====

// Get SubIcon
export const getSubIconById = async (req, res) => {
  try {
    const { subIconId } = req.params;

    const subIcon = await prisma.subIcon.findUnique({
      where: { id: Number(subIconId) },
      include: { icon: true },
    });

    if (!subIcon) return res.status(404).json({ message: "SubIcon not found" });

    res.json(subIcon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching subIcon", error: err.message });
  }
};

// Create SubIcon
/*export const createSubIcon = async (req, res) => {
  try {
    const { iconId } = req.params;

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
      category,
    } = req.body;

    const subIcon = await prisma.subIcon.create({
      data: {
        title_en,
        title_ar: title_ar || "",
        title_fr: title_fr || "",
        title_es: title_es || "",
        expression_en: expression_en || "",
        expression_ar: expression_ar || "",
        expression_fr: expression_fr || "",
        expression_es: expression_es || "",
        imgUrl,
        category,
        icon: { connect: { id: Number(iconId) } },
      },
    });

    res.status(201).json(subIcon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating subIcon", error: err.message });
  }
};*/
export const createSubIcon = async (req, res) => {
  try {
    const { iconId } = req.params;

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
      imageUrl, // لو URL
    } = req.body;

    // 🔥 الصورة بتيجي من multer
    let imgPath = "";

    if (req.file) {
      imgPath = `/public/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      imgPath = imageUrl;
    }

    const subIcon = await prisma.subIcon.create({
      data: {
        title_en,
        title_ar: title_ar || "",
        title_fr: title_fr || "",
        title_es: title_es || "",
        expression_en: expression_en || "",
        expression_ar: expression_ar || "",
        expression_fr: expression_fr || "",
        expression_es: expression_es || "",
        imgUrl: imgPath, // 🔥 هنا الصح
        category,
        icon: { connect: { id: Number(iconId) } },
      },
    });

    res.status(201).json(subIcon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating subIcon", error: err.message });
  }
};

// Update SubIcon
export const updateSubIcon = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.subIcon.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating subIcon", error: err.message });
  }
};

// Delete SubIcon
export const deleteSubIcon = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.subIcon.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "SubIcon deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting subIcon", error: err.message });
  }
};