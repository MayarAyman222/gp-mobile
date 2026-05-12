import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVOURITE_TYPES = {
  SUB_ICON: "subIcon",
  SUB_SUB_ICON: "subSubIcon",
};

const getStorageKey = (userId) => `favourites_${userId}`;

const inferFavouriteType = (item) => {
  if (item?.favouriteType) return item.favouriteType;
  if (item?.subIconId || item?.parentSubIcon) return FAVOURITE_TYPES.SUB_SUB_ICON;
  return FAVOURITE_TYPES.SUB_ICON;
};

const getOriginalId = (item) => item?.originalId ?? item?.id;

const buildFavouriteId = (type, item) => {
  const originalId = getOriginalId(item);
  return `${type}:${originalId}`;
};

const normalizeFavouriteItem = ({ item, type, parentIcon, parentSubIcon }) => {
  const originalId = getOriginalId(item);
  if (originalId === undefined || originalId === null) return null;

  const favouriteType = type || inferFavouriteType(item);
  const normalizedParentSubIcon = parentSubIcon || item?.parentSubIcon || null;

  return {
    ...item,
    id: buildFavouriteId(favouriteType, item),
    originalId,
    favouriteType,
    parentIcon: parentIcon || item?.parentIcon || null,
    parentSubIcon: normalizedParentSubIcon,
    subIconId:
      favouriteType === FAVOURITE_TYPES.SUB_SUB_ICON
        ? item?.subIconId ?? getOriginalId(normalizedParentSubIcon)
        : item?.subIconId,
  };
};

const readFavouriteItems = async (userId) => {
  const raw = await AsyncStorage.getItem(getStorageKey(userId));
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log("Read favourites error", error);
    return [];
  }
};

export const addFavouriteItems = async ({
  userId,
  items,
  type,
  parentIcon,
  parentSubIcon,
}) => {
  if (!userId || !Array.isArray(items) || !items.length) return [];

  const currentItems = await readFavouriteItems(userId);
  const nextById = new Map();

  currentItems
    .map((item) =>
      normalizeFavouriteItem({
        item,
        type: inferFavouriteType(item),
        parentIcon: item?.parentIcon,
        parentSubIcon: item?.parentSubIcon,
      }),
    )
    .filter(Boolean)
    .forEach((item) => {
      nextById.set(String(item.id), item);
    });

  items
    .map((item) =>
      normalizeFavouriteItem({
        item,
        type,
        parentIcon,
        parentSubIcon,
      }),
    )
    .filter(Boolean)
    .forEach((item) => {
      nextById.set(String(item.id), item);
    });

  const nextItems = Array.from(nextById.values());
  await AsyncStorage.setItem(getStorageKey(userId), JSON.stringify(nextItems));

  return nextItems;
};
