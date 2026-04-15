const DEFAULT_SUBSUBICON_IMAGE = "/public/default.jpg";

const FOOD_CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Snack"];

const normalizeText = (...values) =>
  values
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const includesAny = (value, keywords = []) =>
  keywords.some((keyword) => value.includes(keyword));

const firstDifferentImage = (parentImgUrl, images = []) =>
  images.find((image) => image && image !== parentImgUrl) ||
  images.find(Boolean) ||
  DEFAULT_SUBSUBICON_IMAGE;

const IMAGE_RULES = [
  {
    keywords: ["grandmother"],
    images: ["/public/Family/10.png", "/public/Family/5.png", "/public/Family/3.png"],
  },
  {
    keywords: ["grandfather"],
    images: ["/public/Family/2.png", "/public/Family/4.png", "/public/Family/6.png"],
  },
  {
    keywords: ["aunt"],
    images: ["/public/Family/5.png", "/public/Family/1.png", "/public/Family/10.png"],
  },
  {
    keywords: ["uncle"],
    images: ["/public/Family/6.png", "/public/Family/7.png", "/public/Family/4.png"],
  },
  {
    keywords: ["cousin"],
    images: ["/public/Family/9.png", "/public/Family/7.png", "/public/Family/1.png"],
  },
  {
    keywords: ["older sister", "younger sister", "twin sister"],
    images: ["/public/Family/5.png", "/public/Family/10.png", "/public/Family/1.png"],
  },
  {
    keywords: ["older brother", "younger brother", "twin brother"],
    images: ["/public/Family/6.png", "/public/Family/9.png", "/public/Family/7.png"],
  },
  {
    keywords: ["baby boy", "baby girl", " baby "],
    images: ["/public/Family/8.png", "/public/Family/9.png", "/public/Family/1.png"],
  },
  {
    keywords: ["mother"],
    images: ["/public/Family/3.png", "/public/Family/10.png", "/public/Family/5.png"],
  },
  {
    keywords: ["father"],
    images: ["/public/Family/4.png", "/public/Family/2.png", "/public/Family/6.png"],
  },
  {
    keywords: ["sister"],
    images: ["/public/Family/1.png", "/public/Family/5.png", "/public/Family/10.png"],
  },
  {
    keywords: ["brother"],
    images: ["/public/Family/7.png", "/public/Family/6.png", "/public/Family/9.png"],
  },
  {
    keywords: ["family", "relatives"],
    images: ["/public/icons/Family.png", "/public/Family/9.png", "/public/Family/10.png"],
  },
  {
    keywords: ["friend", "friends"],
    images: ["/public/icons/Friend.png", "/public/talk/GroupChat.png", "/public/call/Messenger.png"],
  },
  {
    keywords: ["neighbor", "neighbour"],
    images: ["/public/memories/neighborhood.png", "/public/icons/Home.png", "/public/icons/Friend.png"],
  },
  {
    keywords: ["colleague", "colleagues"],
    images: ["/public/icons/Computer.png", "/public/icons/Friend.png", "/public/icons/Read.png"],
  },
  {
    keywords: ["bread", "toast", "balady", "fino", "shamy"],
    images: ["/public/Food and Drink/esh.png", "/public/Food and Drink/sandwich.png"],
  },
  {
    keywords: ["egg", "omelet", "omelette", "boiled", "fried"],
    images: ["/public/Food and Drink/egg.png", "/public/talk/eggs.png"],
  },
  {
    keywords: ["cheese", "romy", "cheddar", "triangle"],
    images: ["/public/Food and Drink/gebna.png", "/public/talk/cheese.png"],
  },
  {
    keywords: ["milk", "rayeb", "full fat", "low fat"],
    images: ["/public/Food and Drink/labn.png", "/public/talk/milk.png"],
  },
  {
    keywords: ["yogurt", "yoghurt"],
    images: ["/public/Food and Drink/zbady.png", "/public/Food and Drink/labn.png"],
  },
  {
    keywords: ["coffee", "nescafe"],
    images: ["/public/Food and Drink/coffe.png", "/public/talk/coffee.png"],
  },
  {
    keywords: ["tea"],
    images: ["/public/Food and Drink/tea.png", "/public/talk/tea.png"],
  },
  {
    keywords: ["orange"],
    images: ["/public/Food and Drink/orange.png", "/public/Food and Drink/aser.png"],
  },
  {
    keywords: ["mango"],
    images: ["/public/Food and Drink/mango.png", "/public/Food and Drink/aser.png"],
  },
  {
    keywords: ["guava"],
    images: ["/public/Food and Drink/gwafa.png", "/public/Food and Drink/aser.png"],
  },
  {
    keywords: ["apple"],
    images: ["/public/Food and Drink/apple.png", "/public/breakfast/fruits.png"],
  },
  {
    keywords: ["banana"],
    images: ["/public/Food and Drink/mozz.png", "/public/Food and Drink/apple.png"],
  },
  {
    keywords: ["strawberry"],
    images: ["/public/Food and Drink/frawla.png", "/public/Food and Drink/apple.png"],
  },
  {
    keywords: ["dates"],
    images: ["/public/Food and Drink/1.png", "/public/Food and Drink/apple.png"],
  },
  {
    keywords: ["juice"],
    images: ["/public/Food and Drink/aser.png", "/public/talk/juice.png"],
  },
  {
    keywords: ["cereal", "corn flakes", "oats"],
    images: ["/public/talk/cereal.png", "/public/Food and Drink/16.png"],
  },
  {
    keywords: ["honey"],
    images: ["/public/Food and Drink/asl.png", "/public/Food and Drink/marba.png"],
  },
  {
    keywords: ["beans", "tahini"],
    images: ["/public/Food and Drink/vegetablesz.png", "/public/Food and Drink/13.png"],
  },
  {
    keywords: ["rice"],
    images: ["/public/Food and Drink/roz.png", "/public/talk/rice.png"],
  },
  {
    keywords: ["pasta", "bechamel"],
    images: ["/public/talk/pasta.png", "/public/Food and Drink/15.png"],
  },
  {
    keywords: ["chicken"],
    images: ["/public/Food and Drink/frahk.png", "/public/talk/chicken.png"],
  },
  {
    keywords: ["meat", "kofta", "steak", "minced"],
    images: ["/public/Food and Drink/meat.png", "/public/talk/meat.png"],
  },
  {
    keywords: ["fish", "fillet"],
    images: ["/public/Food and Drink/fish.png", "/public/talk/fish.png"],
  },
  {
    keywords: ["salad"],
    images: ["/public/talk/salad.png", "/public/Food and Drink/vegetablesz.png"],
  },
  {
    keywords: ["soup", "lentil"],
    images: ["/public/Food and Drink/shorba.png", "/public/talk/soup.png"],
  },
  {
    keywords: ["chips", "chili", "salted"],
    images: ["/public/Food and Drink/btats.png", "/public/Food and Drink/13.png"],
  },
  {
    keywords: ["chocolate", "wafer", "dark"],
    images: ["/public/Food and Drink/chocolate.png", "/public/Food and Drink/baskot.png"],
  },
  {
    keywords: ["cookies", "cookie", "biscuits", "biscuit", "vanilla"],
    images: ["/public/Food and Drink/baskot.png", "/public/Food and Drink/chocolate.png"],
  },
  {
    keywords: ["nuts", "peanuts", "almonds", "cashews"],
    images: ["/public/Food and Drink/14.png", "/public/Food and Drink/16.png"],
  },
  {
    keywords: ["sandwich", "jam"],
    images: ["/public/Food and Drink/sandwich.png", "/public/Food and Drink/marba.png"],
  },
  {
    keywords: ["insects", "insect"],
    images: ["/public/Animals/7shraat.png", "/public/listen/Alert.png"],
  },
  {
    keywords: ["dogs", "dog"],
    images: ["/public/Animals/Dog.png", "/public/listen/Alert.png"],
  },
  {
    keywords: ["darkness", "dark"],
    images: ["/public/sleeping/night-lamp.png", "/public/listen/Alert.png"],
  },
  {
    keywords: ["loud sound", "loud sounds", "noise", "sound"],
    images: ["/public/listen/Alert.png", "/public/talk/Alert.png"],
  },
  {
    keywords: ["waiting", "wait"],
    images: ["/public/Questions/time.png", "/public/icons/No.png"],
  },
  {
    keywords: ["crowds", "crowd"],
    images: ["/public/talk/GroupChat.png", "/public/talk/Conversation.png"],
  },
  {
    keywords: ["sleep", "bed"],
    images: ["/public/sleeping/bed.png", "/public/icons/Sleeping.png"],
  },
  {
    keywords: ["walk", "walking"],
    images: ["/public/icons/Walk.png", "/public/Play/running.png"],
  },
  {
    keywords: ["played", "play", "birthday"],
    images: ["/public/icons/Play.png", "/public/icons/Excited.png"],
  },
  {
    keywords: ["ate", "eat", "food"],
    images: ["/public/icons/Eating.png", "/public/Food and Drink/apple.png"],
  },
  {
    keywords: ["music"],
    images: ["/public/Music/music-notes.png", "/public/icons/Music.png"],
  },
  {
    keywords: ["shower"],
    images: ["/public/icons/Shower.png", "/public/icons/Relax.png"],
  },
  {
    keywords: ["finished", "finish"],
    images: ["/public/icons/Yes.png", "/public/icons/Read.png"],
  },
  {
    keywords: ["learn", "study", "class", "lecture", "exam", "understand", "task", "hard"],
    images: ["/public/icons/Book.png", "/public/icons/Read.png", "/public/Questions/whichone.png"],
  },
  {
    keywords: ["choices", "choice"],
    images: ["/public/Questions/whichone.png", "/public/icons/Read.png"],
  },
  {
    keywords: ["helped", "help", "explain"],
    images: ["/public/talk/MessageBubble.png", "/public/icons/Friend.png", "/public/call/CallCenter.png"],
  },
  {
    keywords: ["device", "computer"],
    images: ["/public/icons/Computer.png", "/public/Tools/1.png"],
  },
  {
    keywords: ["go out", "outside"],
    images: ["/public/Relations/outside.png", "/public/icons/Excited.png"],
  },
  {
    keywords: ["rest", "relax"],
    images: ["/public/icons/Relax.png", "/public/Places/home.png"],
  },
  {
    keywords: ["doctor"],
    images: ["/public/icons/Doctor.png", "/public/icons/Phone.png"],
  },
  {
    keywords: ["medicine"],
    images: ["/public/icons/Medicine.png", "/public/medicine/Panadol.png"],
  },
  {
    keywords: ["shopping", "buy"],
    images: ["/public/icons/Shopping.png", "/public/Food and Drink/apple.png"],
  },
  {
    keywords: ["travel", "vacation"],
    images: ["/public/Transport/10.png", "/public/Transport/4.png"],
  },
  {
    keywords: ["school"],
    images: ["/public/Places/school.png", "/public/icons/Read.png"],
  },
  {
    keywords: ["hospital"],
    images: ["/public/Places/hospital.png", "/public/icons/Doctor.png"],
  },
  {
    keywords: ["home", "house", "apartment"],
    images: ["/public/Places/home.png", "/public/icons/Home.png"],
  },
  {
    keywords: ["upstairs", "up "],
    images: ["/public/Relations/up.png", "/public/Transport/8.png"],
  },
  {
    keywords: ["downstairs", "down "],
    images: ["/public/Relations/down.png", "/public/Transport/8.png"],
  },
  {
    keywords: ["bus"],
    images: ["/public/Transport/5.png", "/public/Places/busstation.png"],
  },
  {
    keywords: ["train"],
    images: ["/public/Transport/10.png", "/public/icons/Transport.png"],
  },
  {
    keywords: ["airplane", "plane"],
    images: ["/public/Transport/4.png", "/public/icons/Transport.png"],
  },
  {
    keywords: ["car"],
    images: ["/public/Transport/6.png", "/public/icons/Transport.png"],
  },
  {
    keywords: ["taxi"],
    images: ["/public/Transport/2.png", "/public/icons/Transport.png"],
  },
  {
    keywords: ["bicycle"],
    images: ["/public/Transport/1.png", "/public/icons/Transport.png"],
  },
  {
    keywords: ["motorcycle"],
    images: ["/public/Transport/3.png", "/public/icons/Transport.png"],
  },
  {
    keywords: ["tram"],
    images: ["/public/Transport/7.png", "/public/icons/Transport.png"],
  },
  {
    keywords: ["ship"],
    images: ["/public/Transport/9.png", "/public/icons/Transport.png"],
  },
  {
    keywords: ["ambulance"],
    images: ["/public/icons/Doctor.png", "/public/icons/Phone.png"],
  },
  {
    keywords: ["police"],
    images: ["/public/call/DialPad.png", "/public/icons/Phone.png"],
  },
  {
    keywords: ["fire"],
    images: ["/public/listen/Alert.png", "/public/icons/Phone.png"],
  },
  {
    keywords: ["message", "messenger"],
    images: ["/public/call/Messenger.png", "/public/talk/MessageBubble.png"],
  },
  {
    keywords: ["conference", "group"],
    images: ["/public/call/Conference.png", "/public/talk/GroupChat.png"],
  },
  {
    keywords: ["call", "dial", "phone"],
    images: ["/public/icons/Phone.png", "/public/call/DialPad.png", "/public/call/mobile.png"],
  },
];

const resolveSubSubIconImage = ({
  category,
  title_en,
  expression_en,
  parentImgUrl = null,
}) => {
  const value = normalizeText(category, title_en, expression_en);
  const matchedRule = IMAGE_RULES.find((rule) =>
    includesAny(value, rule.keywords),
  );

  if (matchedRule) {
    return firstDifferentImage(parentImgUrl, matchedRule.images);
  }

  if (FOOD_CATEGORIES.includes(category)) {
    return firstDifferentImage(parentImgUrl, [
      "/public/Food and Drink/apple.png",
      "/public/Food and Drink/sandwich.png",
    ]);
  }

  if (category === "Family") {
    return firstDifferentImage(parentImgUrl, [
      "/public/icons/Family.png",
      "/public/Family/9.png",
    ]);
  }

  if (category === "Feelings") {
    return firstDifferentImage(parentImgUrl, [
      "/public/icons/Excited.png",
      "/public/icons/Relax.png",
    ]);
  }

  if (category === "Call") {
    return firstDifferentImage(parentImgUrl, [
      "/public/icons/Phone.png",
      "/public/call/DialPad.png",
    ]);
  }

  if (category === "Transport") {
    return firstDifferentImage(parentImgUrl, [
      "/public/icons/Transport.png",
      "/public/Transport/10.png",
    ]);
  }

  if (category === "places") {
    return firstDifferentImage(parentImgUrl, [
      "/public/icons/Places.png",
      "/public/Places/home.png",
    ]);
  }

  return firstDifferentImage(parentImgUrl, [DEFAULT_SUBSUBICON_IMAGE]);
};

const makeSubSubIcon = ({
  title_en,
  title_ar,
  expression_en,
  expression_ar,
  category,
  imgUrl = null,
  parentImgUrl = null,
}) => ({
  title_en,
  title_ar,
  title_fr: title_en,
  title_es: title_en,
  expression_en,
  expression_ar,
  expression_fr: expression_en,
  expression_es: expression_en,
  category,
  imgUrl:
    imgUrl ||
    resolveSubSubIconImage({
      category,
      title_en,
      expression_en,
      parentImgUrl,
    }),
});

const createGroup = (category, parentImgUrl, items) =>
  items.map((item) =>
    makeSubSubIcon({
      ...item,
      category,
      parentImgUrl,
      imgUrl: item.imgUrl ?? null,
    }),
  );

const cloneGroup = (category, parentImgUrl, items) =>
  items.map((item) =>
    makeSubSubIcon({
      title_en: item.title_en,
      title_ar: item.title_ar,
      expression_en: item.expression_en,
      expression_ar: item.expression_ar,
      category,
      parentImgUrl,
      imgUrl: item.imgUrl ?? null,
    }),
  );

// ─────────────────────────────────────────────
// BREAKFAST
// ─────────────────────────────────────────────
const breakfastBreadChoices = createGroup("Breakfast", "/public/breakfast/breadd.png", [
  { title_en: "Balady Bread",  title_ar: "عيش بلدي",  expression_en: "I want balady bread",  expression_ar: "أريد عيش بلدي",  imgUrl: "/public/Food and Drink/esh_baladi.png" },
  { title_en: "Fino Bread",    title_ar: "عيش فينو",   expression_en: "I want fino bread",    expression_ar: "أريد عيش فينو",   imgUrl: "/public/Food and Drink/esh_fino.png" },
  { title_en: "Shamy Bread",   title_ar: "عيش شامي",   expression_en: "I want shamy bread",   expression_ar: "أريد عيش شامي",   imgUrl: "/public/Food and Drink/esh_shamy.png" },
  { title_en: "Toast",         title_ar: "توست",        expression_en: "I want toast",         expression_ar: "أريد توست",        imgUrl: "/public/Food and Drink/toast.png" },
]);

const breakfastEggChoices = createGroup("Breakfast", "/public/breakfast/eggs.png", [
  { title_en: "Omelet",      title_ar: "بيض أومليت",  expression_en: "I want omelet eggs",  expression_ar: "أريد بيض أومليت",  imgUrl: "/public/Food and Drink/egg_omlet.png" },
  { title_en: "Boiled Eggs", title_ar: "بيض مسلوق",   expression_en: "I want boiled eggs",  expression_ar: "أريد بيض مسلوق",   imgUrl: "/public/Food and Drink/eggs_maslo2.png" },
  { title_en: "Fried Eggs",  title_ar: "بيض مقلي",    expression_en: "I want fried eggs",   expression_ar: "أريد بيض مقلي",    imgUrl: "/public/Food and Drink/egg_m2ly.png" },
]);

const breakfastCheeseChoices = createGroup("Breakfast", "/public/breakfast/cheese.png", [
  { title_en: "Romy Cheese",     title_ar: "جبنة رومي",      expression_en: "I want romy cheese",     expression_ar: "أريد جبنة رومي",      imgUrl: "/public/Food and Drink/gebna_romy.png" },
  { title_en: "White Cheese",    title_ar: "جبنة بيضاء",     expression_en: "I want white cheese",    expression_ar: "أريد جبنة بيضاء",     imgUrl: "/public/Food and Drink/gebna_beda.png" },
  { title_en: "Cheddar Cheese",  title_ar: "جبنة شيدر",      expression_en: "I want cheddar cheese",  expression_ar: "أريد جبنة شيدر",      imgUrl: "/public/Food and Drink/cheese_cheddar.png" },
  { title_en: "Triangle Cheese", title_ar: "جبنة مثلثات",    expression_en: "I want triangle cheese", expression_ar: "أريد جبنة مثلثات",    imgUrl: "/public/Food and Drink/triangle_cheese.png" },
]);

const breakfastMilkChoices = createGroup("Breakfast", "/public/breakfast/milk.png", [
  { title_en: "Rayeb Milk",       title_ar: "لبن رايب",           expression_en: "I want rayeb milk",       expression_ar: "أريد لبن رايب",           imgUrl: "/public/Food and Drink/rayeb_milk.png" },
  { title_en: "Full Fat Milk",    title_ar: "لبن كامل الدسم",     expression_en: "I want full fat milk",    expression_ar: "أريد لبن كامل الدسم",     imgUrl: "/public/Food and Drink/full_fat_milk.png" },
  { title_en: "Low Fat Milk",     title_ar: "لبن قليل الدسم",     expression_en: "I want low fat milk",     expression_ar: "أريد لبن قليل الدسم",     imgUrl: "/public/Food and Drink/low_fat_milk.png" },
  { title_en: "Chocolate Milk",   title_ar: "لبن بالشوكولاتة",    expression_en: "I want chocolate milk",   expression_ar: "أريد لبن بالشوكولاتة",    imgUrl: "/public/Food and Drink/chocolate_milk.png" },
]);
const breakfastCoffeeChoices = createGroup("Breakfast", "/public/breakfast/coffee.png", [
  { title_en: "Black Coffee",      title_ar: "قهوة سادة",   expression_en: "I want black coffee",      expression_ar: "أريد قهوة سادة",   imgUrl: "/public/Food and Drink/coffe.png" },
  { title_en: "Coffee with Milk",  title_ar: "قهوة بلبن",   expression_en: "I want coffee with milk",  expression_ar: "أريد قهوة بلبن",   imgUrl: "/public/talk/coffee.png" },
  { title_en: "Nescafe",           title_ar: "نسكافيه",      expression_en: "I want nescafe",           expression_ar: "أريد نسكافيه",     imgUrl: "/public/Food and Drink/coffe.png" },
]);

const breakfastTeaChoices = createGroup("Breakfast", "/public/breakfast/tea.png", [
  { title_en: "Tea with Milk", title_ar: "شاي بلبن",    expression_en: "I want tea with milk", expression_ar: "أريد شاي بلبن",    imgUrl: "/public/talk/tea.png" },
  { title_en: "Green Tea",     title_ar: "شاي أخضر",   expression_en: "I want green tea",     expression_ar: "أريد شاي أخضر",   imgUrl: "/public/Food and Drink/tea.png" },
  { title_en: "Red Tea",       title_ar: "شاي أحمر",   expression_en: "I want red tea",       expression_ar: "أريد شاي أحمر",   imgUrl: "/public/Food and Drink/tea.png" },
]);

const breakfastJuiceChoices = createGroup("Breakfast", "/public/breakfast/juice.png", [
  { title_en: "Orange Juice", title_ar: "عصير برتقال", expression_en: "I want orange juice", expression_ar: "أريد عصير برتقال", imgUrl: "/public/Food and Drink/orange.png" },
  { title_en: "Mango Juice",  title_ar: "عصير مانجو",  expression_en: "I want mango juice",  expression_ar: "أريد عصير مانجو",  imgUrl: "/public/Food and Drink/mango.png" },
  { title_en: "Guava Juice",  title_ar: "عصير جوافة",  expression_en: "I want guava juice",  expression_ar: "أريد عصير جوافة",  imgUrl: "/public/Food and Drink/gwafa.png" },
]);

const breakfastBeansChoices = createGroup("Breakfast", "/public/breakfast/beans.png", [
  { title_en: "Plain Beans",        title_ar: "فول سادة",       expression_en: "I want plain beans",        expression_ar: "أريد فول سادة",       imgUrl: "/public/Food and Drink/vegetablesz.png" },
  { title_en: "Beans with Oil",     title_ar: "فول بالزيت",     expression_en: "I want beans with oil",     expression_ar: "أريد فول بالزيت",     imgUrl: "/public/Food and Drink/vegetablesz.png" },
  { title_en: "Beans with Tahini",  title_ar: "فول بالطحينة",   expression_en: "I want beans with tahini",  expression_ar: "أريد فول بالطحينة",   imgUrl: "/public/Food and Drink/13.png" },
]);

const breakfastFruitChoices = createGroup("Breakfast", "/public/breakfast/fruits.png", [
  { title_en: "Apple",  title_ar: "تفاح", expression_en: "I want an apple", expression_ar: "أريد تفاح", imgUrl: "/public/Food and Drink/apple.png" },
  { title_en: "Banana", title_ar: "موز",  expression_en: "I want a banana", expression_ar: "أريد موز",  imgUrl: "/public/Food and Drink/mozz.png" },
  { title_en: "Dates",  title_ar: "بلح",  expression_en: "I want dates",    expression_ar: "أريد بلح",  imgUrl: "/public/Food and Drink/1.png" },
]);

const breakfastCerealChoices = createGroup("Breakfast", "/public/breakfast/cereal.png", [
  { title_en: "Corn Flakes",       title_ar: "كورن فليكس",     expression_en: "I want corn flakes",       expression_ar: "أريد كورن فليكس",     imgUrl: "/public/talk/cereal.png" },
  { title_en: "Chocolate Cereal",  title_ar: "حبوب شوكولاتة",  expression_en: "I want chocolate cereal",  expression_ar: "أريد حبوب شوكولاتة",  imgUrl: "/public/Food and Drink/chocolate.png" },
  { title_en: "Oats",              title_ar: "شوفان",           expression_en: "I want oats",              expression_ar: "أريد شوفان",           imgUrl: "/public/Food and Drink/16.png" },
]);

const breakfastHoneyChoices = createGroup("Breakfast", "/public/breakfast/honey.png", [
  { title_en: "White Honey", title_ar: "عسل أبيض", expression_en: "I want white honey", expression_ar: "أريد عسل أبيض", imgUrl: "/public/Food and Drink/asl.png" },
  { title_en: "Black Honey", title_ar: "عسل أسود", expression_en: "I want black honey", expression_ar: "أريد عسل أسود", imgUrl: "/public/Food and Drink/asl.png" },
]);

// ─────────────────────────────────────────────
// LUNCH
// ─────────────────────────────────────────────
const lunchRiceChoices = createGroup("Lunch", "/public/lunch/rice.png", [
  { title_en: "White Rice",           title_ar: "أرز أبيض",       expression_en: "I want white rice",           expression_ar: "أريد أرز أبيض",       imgUrl: "/public/Food and Drink/roz.png" },
  { title_en: "Rice with Vegetables", title_ar: "أرز بالخضار",    expression_en: "I want rice with vegetables", expression_ar: "أريد أرز بالخضار",    imgUrl: "/public/talk/rice.png" },
  { title_en: "Rice with Chicken",    title_ar: "أرز بالفراخ",    expression_en: "I want rice with chicken",    expression_ar: "أريد أرز بالفراخ",    imgUrl: "/public/Food and Drink/frahk.png" },
]);

const lunchPastaChoices = createGroup("Lunch", "/public/lunch/pasta.png", [
  { title_en: "Red Sauce Pasta",   title_ar: "مكرونة بالصلصة",       expression_en: "I want pasta with red sauce",   expression_ar: "أريد مكرونة بالصلصة",       imgUrl: "/public/talk/pasta.png" },
  { title_en: "Bechamel Pasta",    title_ar: "مكرونة بشاميل",         expression_en: "I want bechamel pasta",         expression_ar: "أريد مكرونة بشاميل",         imgUrl: "/public/Food and Drink/15.png" },
  { title_en: "White Sauce Pasta", title_ar: "مكرونة وايت صوص",       expression_en: "I want pasta with white sauce", expression_ar: "أريد مكرونة وايت صوص",       imgUrl: "/public/talk/pasta.png" },
]);

const lunchChickenChoices = createGroup("Lunch", "/public/lunch/chicken.png", [
  { title_en: "Grilled Chicken",  title_ar: "فراخ مشوية",    expression_en: "I want grilled chicken",  expression_ar: "أريد فراخ مشوية",    imgUrl: "/public/Food and Drink/frahkk.png" },
  { title_en: "Fried Chicken",    title_ar: "فراخ مقلية",    expression_en: "I want fried chicken",    expression_ar: "أريد فراخ مقلية",    imgUrl: "/public/Food and Drink/chicken.png" },
  { title_en: "Roasted Chicken",  title_ar: "فراخ في الفرن", expression_en: "I want roasted chicken",  expression_ar: "أريد فراخ في الفرن", imgUrl: "/public/Food and Drink/frahkk.png" },
]);

const lunchMeatChoices = createGroup("Lunch", "/public/lunch/meat.png", [
  { title_en: "Kofta",        title_ar: "كفتة",          expression_en: "I want kofta",        expression_ar: "أريد كفتة",          imgUrl: "/public/Food and Drink/kofta.png" },
  { title_en: "Steak",        title_ar: "ستيك",           expression_en: "I want steak",        expression_ar: "أريد ستيك",           imgUrl: "/public/talk/meat.png" },
  { title_en: "Minced Meat",  title_ar: "لحمة مفرومة",   expression_en: "I want minced meat",  expression_ar: "أريد لحمة مفرومة",   imgUrl: "/public/Food and Drink/meat.png" },
]);

const lunchFishChoices = createGroup("Lunch", "/public/lunch/fish.png", [
  { title_en: "Grilled Fish", title_ar: "سمك مشوي",   expression_en: "I want grilled fish", expression_ar: "أريد سمك مشوي",   imgUrl: "/public/Food and Drink/fish.png" },
  { title_en: "Fried Fish",   title_ar: "سمك مقلي",   expression_en: "I want fried fish",   expression_ar: "أريد سمك مقلي",   imgUrl: "/public/talk/fish.png" },
  { title_en: "Fish Fillet",  title_ar: "فيليه سمك",  expression_en: "I want fish fillet",  expression_ar: "أريد فيليه سمك",  imgUrl: "/public/Food and Drink/fish.png" },
]);

const lunchSaladChoices = createGroup("Lunch", "/public/lunch/salad.png", [
  { title_en: "Green Salad",   title_ar: "سلطة خضراء",  expression_en: "I want green salad",   expression_ar: "أريد سلطة خضراء",  imgUrl: "/public/talk/salad.png" },
  { title_en: "Tahini Salad",  title_ar: "سلطة طحينة",  expression_en: "I want tahini salad",  expression_ar: "أريد سلطة طحينة",  imgUrl: "/public/Food and Drink/vegetablesz.png" },
  { title_en: "Yogurt Salad",  title_ar: "سلطة زبادي",  expression_en: "I want yogurt salad",  expression_ar: "أريد سلطة زبادي",  imgUrl: "/public/Food and Drink/zbady.png" },
]);

const lunchSoupChoices = createGroup("Lunch", "/public/lunch/soup.png", [
  { title_en: "Lentil Soup",     title_ar: "شوربة عدس",    expression_en: "I want lentil soup",     expression_ar: "أريد شوربة عدس",    imgUrl: "/public/Food and Drink/shorba.png" },
  { title_en: "Chicken Soup",    title_ar: "شوربة فراخ",   expression_en: "I want chicken soup",    expression_ar: "أريد شوربة فراخ",   imgUrl: "/public/talk/soup.png" },
  { title_en: "Vegetable Soup",  title_ar: "شوربة خضار",   expression_en: "I want vegetable soup",  expression_ar: "أريد شوربة خضار",   imgUrl: "/public/Food and Drink/vegetablesz.png" },
]);

const lunchBreadChoices = createGroup("Lunch", "/public/lunch/bread.png", [
  { title_en: "Balady Bread", title_ar: "عيش بلدي",  expression_en: "I want balady bread", expression_ar: "أريد عيش بلدي",  imgUrl: "/public/Food and Drink/esh.png" },
  { title_en: "Toast",        title_ar: "توست",        expression_en: "I want toast",        expression_ar: "أريد توست",        imgUrl: "/public/Food and Drink/sandwich.png" },
  { title_en: "Shamy Bread",  title_ar: "عيش شامي",   expression_en: "I want shamy bread",  expression_ar: "أريد عيش شامي",   imgUrl: "/public/Food and Drink/esh.png" },
]);

const lunchJuiceChoices = createGroup("Lunch", "/public/lunch/juice.png", [
  { title_en: "Orange Juice", title_ar: "عصير برتقال", expression_en: "I want orange juice", expression_ar: "أريد عصير برتقال", imgUrl: "/public/Food and Drink/orange.png" },
  { title_en: "Mango Juice",  title_ar: "عصير مانجو",  expression_en: "I want mango juice",  expression_ar: "أريد عصير مانجو",  imgUrl: "/public/Food and Drink/mango.png" },
  { title_en: "Guava Juice",  title_ar: "عصير جوافة",  expression_en: "I want guava juice",  expression_ar: "أريد عصير جوافة",  imgUrl: "/public/Food and Drink/gwafa.png" },
]);

// ─────────────────────────────────────────────
// DINNER  (cloned from lunch with dinner paths)
// ─────────────────────────────────────────────
const dinnerRiceChoices     = cloneGroup("Dinner", "/public/dinner/rice.png",    lunchRiceChoices);
const dinnerPastaChoices    = cloneGroup("Dinner", "/public/dinner/pasta.png",   lunchPastaChoices);
const dinnerChickenChoices  = cloneGroup("Dinner", "/public/dinner/chicken.png", lunchChickenChoices);
const dinnerMeatChoices     = cloneGroup("Dinner", "/public/dinner/meat.png",    lunchMeatChoices);
const dinnerFishChoices     = cloneGroup("Dinner", "/public/dinner/fish.png",    lunchFishChoices);
const dinnerSaladChoices    = cloneGroup("Dinner", "/public/dinner/salad.png",   lunchSaladChoices);
const dinnerSoupChoices     = cloneGroup("Dinner", "/public/dinner/soup.png",    lunchSoupChoices);
const dinnerBreadChoices    = cloneGroup("Dinner", "/public/dinner/bread.png",   lunchBreadChoices);
const dinnerJuiceChoices    = cloneGroup("Dinner", "/public/dinner/juice.png",   lunchJuiceChoices);

// ─────────────────────────────────────────────
// SNACK
// ─────────────────────────────────────────────
const snackChipsChoices = createGroup("Snack", "/public/snack/chips.png", [
  { title_en: "Cheese Chips", title_ar: "شيبسي جبنة", expression_en: "I want cheese chips", expression_ar: "أريد شيبسي جبنة", imgUrl: "/public/Food and Drink/btats.png" },
  { title_en: "Chili Chips",  title_ar: "شيبسي حار",  expression_en: "I want chili chips",  expression_ar: "أريد شيبسي حار",  imgUrl: "/public/Food and Drink/btats.png" },
  { title_en: "Salted Chips", title_ar: "شيبسي ملح",  expression_en: "I want salted chips", expression_ar: "أريد شيبسي ملح",  imgUrl: "/public/Food and Drink/btats.png" },
]);

const snackCookieChoices = createGroup("Snack", "/public/snack/cookies.png", [
  { title_en: "Chocolate Cookies", title_ar: "كوكيز شوكولاتة", expression_en: "I want chocolate cookies", expression_ar: "أريد كوكيز شوكولاتة", imgUrl: "/public/Food and Drink/chocolate.png" },
  { title_en: "Vanilla Cookies",   title_ar: "كوكيز فانيليا",  expression_en: "I want vanilla cookies",   expression_ar: "أريد كوكيز فانيليا",  imgUrl: "/public/Food and Drink/baskot.png" },
  { title_en: "Biscuits",          title_ar: "بسكويت",          expression_en: "I want biscuits",          expression_ar: "أريد بسكويت",          imgUrl: "/public/Food and Drink/baskot.png" },
]);

const snackChocolateChoices = createGroup("Snack", "/public/snack/chocolate.png", [
  { title_en: "Dark Chocolate",  title_ar: "شوكولاتة دارك",    expression_en: "I want dark chocolate",  expression_ar: "أريد شوكولاتة دارك",    imgUrl: "/public/Food and Drink/chocolate.png" },
  { title_en: "Milk Chocolate",  title_ar: "شوكولاتة بالحليب", expression_en: "I want milk chocolate",  expression_ar: "أريد شوكولاتة بالحليب", imgUrl: "/public/Food and Drink/chocolate.png" },
  { title_en: "Wafer Chocolate", title_ar: "شوكولاتة ويفر",    expression_en: "I want wafer chocolate", expression_ar: "أريد شوكولاتة ويفر",    imgUrl: "/public/Food and Drink/baskot.png" },
]);

const snackFruitChoices = createGroup("Snack", "/public/snack/fruits.png", [
  { title_en: "Apple",       title_ar: "تفاح",    expression_en: "I want an apple",   expression_ar: "أريد تفاح",    imgUrl: "/public/Food and Drink/apple.png" },
  { title_en: "Banana",      title_ar: "موز",     expression_en: "I want a banana",   expression_ar: "أريد موز",     imgUrl: "/public/Food and Drink/mozz.png" },
  { title_en: "Strawberry",  title_ar: "فراولة",  expression_en: "I want strawberry", expression_ar: "أريد فراولة",  imgUrl: "/public/Food and Drink/frawla.png" },
]);

const snackNutChoices = createGroup("Snack", "/public/snack/nuts.png", [
  { title_en: "Peanuts",  title_ar: "فول سوداني", expression_en: "I want peanuts",  expression_ar: "أريد فول سوداني", imgUrl: "/public/Food and Drink/14.png" },
  { title_en: "Almonds",  title_ar: "لوز",         expression_en: "I want almonds",  expression_ar: "أريد لوز",         imgUrl: "/public/Food and Drink/14.png" },
  { title_en: "Cashews",  title_ar: "كاجو",         expression_en: "I want cashews",  expression_ar: "أريد كاجو",         imgUrl: "/public/Food and Drink/14.png" },
]);

const snackYogurtChoices = createGroup("Snack", "/public/snack/yogurt.png", [
  { title_en: "Plain Yogurt",       title_ar: "زبادي سادة",    expression_en: "I want plain yogurt",       expression_ar: "أريد زبادي سادة",    imgUrl: "/public/Food and Drink/zbady.png" },
  { title_en: "Strawberry Yogurt",  title_ar: "زبادي فراولة",  expression_en: "I want strawberry yogurt",  expression_ar: "أريد زبادي فراولة",  imgUrl: "/public/Food and Drink/frawla.png" },
  { title_en: "Honey Yogurt",       title_ar: "زبادي بالعسل",  expression_en: "I want yogurt with honey",  expression_ar: "أريد زبادي بالعسل",  imgUrl: "/public/Food and Drink/asl.png" },
]);

const snackSandwichChoices = createGroup("Snack", "/public/snack/sandwich.png", [
  { title_en: "Cheese Sandwich", title_ar: "ساندوتش جبنة", expression_en: "I want a cheese sandwich", expression_ar: "أريد ساندوتش جبنة", imgUrl: "/public/Food and Drink/sandwich.png" },
  { title_en: "Jam Sandwich",    title_ar: "ساندوتش مربى", expression_en: "I want a jam sandwich",    expression_ar: "أريد ساندوتش مربى", imgUrl: "/public/Food and Drink/marba.png" },
  { title_en: "Honey Sandwich",  title_ar: "ساندوتش عسل",  expression_en: "I want a honey sandwich",  expression_ar: "أريد ساندوتش عسل",  imgUrl: "/public/Food and Drink/asl.png" },
]);

const snackJuiceChoices = createGroup("Snack", "/public/snack/juice.png", [
  { title_en: "Orange Juice", title_ar: "عصير برتقال", expression_en: "I want orange juice", expression_ar: "أريد عصير برتقال", imgUrl: "/public/Food and Drink/orange.png" },
  { title_en: "Mango Juice",  title_ar: "عصير مانجو",  expression_en: "I want mango juice",  expression_ar: "أريد عصير مانجو",  imgUrl: "/public/Food and Drink/mango.png" },
  { title_en: "Apple Juice",  title_ar: "عصير تفاح",   expression_en: "I want apple juice",  expression_ar: "أريد عصير تفاح",   imgUrl: "/public/Food and Drink/apple.png" },
]);

const snackTeaChoices = createGroup("Snack", "/public/snack/tea.png", [
  { title_en: "Mint Tea",      title_ar: "شاي بالنعناع", expression_en: "I want mint tea",      expression_ar: "أريد شاي بالنعناع", imgUrl: "/public/Food and Drink/tea.png" },
  { title_en: "Green Tea",     title_ar: "شاي أخضر",    expression_en: "I want green tea",     expression_ar: "أريد شاي أخضر",    imgUrl: "/public/Food and Drink/tea.png" },
  { title_en: "Tea with Milk", title_ar: "شاي بلبن",    expression_en: "I want tea with milk", expression_ar: "أريد شاي بلبن",    imgUrl: "/public/talk/tea.png" },
]);

const snackCoffeeChoices = createGroup("Snack", "/public/snack/coffee.png", [
  { title_en: "Black Coffee",     title_ar: "قهوة سادة",   expression_en: "I want black coffee",     expression_ar: "أريد قهوة سادة",   imgUrl: "/public/Food and Drink/coffe.png" },
  { title_en: "Coffee with Milk", title_ar: "قهوة بلبن",   expression_en: "I want coffee with milk", expression_ar: "أريد قهوة بلبن",   imgUrl: "/public/talk/coffee.png" },
  { title_en: "Iced Coffee",      title_ar: "قهوة مثلجة",  expression_en: "I want iced coffee",      expression_ar: "أريد قهوة مثلجة",  imgUrl: "/public/Food and Drink/coffe.png" },
]);

// ─────────────────────────────────────────────
// FAMILY
// ─────────────────────────────────────────────
const familyMotherChoices = createGroup("Family", "/public/Family/3.png", [
  { title_en: "Mother's Mother",  title_ar: "جدة من ناحية الأم",  expression_en: "This is my mother's mother",  expression_ar: "هذه جدتي من ناحية الأم",  imgUrl: "/public/Family/10.png" },
  { title_en: "Mother's Father",  title_ar: "جد من ناحية الأم",   expression_en: "This is my mother's father",  expression_ar: "هذا جدي من ناحية الأم",   imgUrl: "/public/Family/2.png" },
  { title_en: "Mother's Sister",  title_ar: "خالة",               expression_en: "This is my mother's sister",  expression_ar: "هذه خالتي",               imgUrl: "/public/Family/5.png" },
  { title_en: "Mother's Brother", title_ar: "خال",                expression_en: "This is my mother's brother", expression_ar: "هذا خالي",                imgUrl: "/public/Family/6.png" },
]);

const familyFatherChoices = createGroup("Family", "/public/Family/4.png", [
  { title_en: "Father's Mother",  title_ar: "جدة من ناحية الأب",  expression_en: "This is my father's mother",  expression_ar: "هذه جدتي من ناحية الأب",  imgUrl: "/public/Family/10.png" },
  { title_en: "Father's Father",  title_ar: "جد من ناحية الأب",   expression_en: "This is my father's father",  expression_ar: "هذا جدي من ناحية الأب",   imgUrl: "/public/Family/2.png" },
  { title_en: "Father's Sister",  title_ar: "عمة",                expression_en: "This is my father's sister",  expression_ar: "هذه عمتي",                imgUrl: "/public/Family/5.png" },
  { title_en: "Father's Brother", title_ar: "عم",                 expression_en: "This is my father's brother", expression_ar: "هذا عمي",                 imgUrl: "/public/Family/4.png" },
]);

const familyBrotherChoices = createGroup("Family", "/public/Family/7.png", [
  { title_en: "Older Brother",  title_ar: "أخ كبير",  expression_en: "This is my older brother",  expression_ar: "هذا أخي الكبير",  imgUrl: "/public/Family/7.png" },
  { title_en: "Younger Brother", title_ar: "أخ صغير", expression_en: "This is my younger brother", expression_ar: "هذا أخي الصغير", imgUrl: "/public/Family/9.png" },
  { title_en: "Twin Brother",   title_ar: "أخ توأم",  expression_en: "This is my twin brother",   expression_ar: "هذا أخي التوأم",  imgUrl: "/public/Family/6.png" },
]);

const familySisterChoices = createGroup("Family", "/public/Family/1.png", [
  { title_en: "Older Sister",   title_ar: "أخت كبيرة",  expression_en: "This is my older sister",   expression_ar: "هذه أختي الكبيرة",  imgUrl: "/public/Family/5.png" },
  { title_en: "Younger Sister", title_ar: "أخت صغيرة",  expression_en: "This is my younger sister", expression_ar: "هذه أختي الصغيرة",  imgUrl: "/public/Family/1.png" },
  { title_en: "Twin Sister",    title_ar: "أخت توأم",   expression_en: "This is my twin sister",    expression_ar: "هذه أختي التوأم",   imgUrl: "/public/Family/10.png" },
]);

const familyGrandfatherChoices = createGroup("Family", "/public/Family/2.png", [
  { title_en: "Maternal Grandfather", title_ar: "جد لأمي", expression_en: "This is my maternal grandfather", expression_ar: "هذا جدي لأمي", imgUrl: "/public/Family/2.png" },
  { title_en: "Paternal Grandfather", title_ar: "جد لأبي", expression_en: "This is my paternal grandfather", expression_ar: "هذا جدي لأبي", imgUrl: "/public/Family/4.png" },
]);

const familyGrandmotherChoices = createGroup("Family", "/public/Family/10.png", [
  { title_en: "Maternal Grandmother", title_ar: "جدة لأمي", expression_en: "This is my maternal grandmother", expression_ar: "هذه جدتي لأمي", imgUrl: "/public/Family/10.png" },
  { title_en: "Paternal Grandmother", title_ar: "جدة لأبي", expression_en: "This is my paternal grandmother", expression_ar: "هذه جدتي لأبي", imgUrl: "/public/Family/3.png" },
]);

const familyUncleChoices = createGroup("Family", "/public/Family/6.png", [
  { title_en: "Father's Brother", title_ar: "عم", expression_en: "This is my father's brother", expression_ar: "هذا عمي", imgUrl: "/public/Family/4.png" },
  { title_en: "Mother's Brother", title_ar: "خال", expression_en: "This is my mother's brother", expression_ar: "هذا خالي", imgUrl: "/public/Family/6.png" },
]);

const familyAuntChoices = createGroup("Family", "/public/Family/5.png", [
  { title_en: "Father's Sister", title_ar: "عمة", expression_en: "This is my father's sister", expression_ar: "هذه عمتي", imgUrl: "/public/Family/3.png" },
  { title_en: "Mother's Sister", title_ar: "خالة", expression_en: "This is my mother's sister", expression_ar: "هذه خالتي", imgUrl: "/public/Family/5.png" },
]);

const familyCousinChoices = createGroup("Family", "/public/Family/9.png", [
  { title_en: "Boy Cousin",   title_ar: "ابن عم",  expression_en: "This is my boy cousin",   expression_ar: "هذا ابن عمي",  imgUrl: "/public/Family/9.png" },
  { title_en: "Girl Cousin",  title_ar: "بنت عم",  expression_en: "This is my girl cousin",  expression_ar: "هذه بنت عمي",  imgUrl: "/public/Family/1.png" },
  { title_en: "Close Cousin", title_ar: "ابن خال", expression_en: "This is my close cousin", expression_ar: "هذا ابن خالي", imgUrl: "/public/Family/7.png" },
]);

const familyBabyChoices = createGroup("Family", "/public/Family/8.png", [
  { title_en: "Baby Boy",  title_ar: "ولد صغير",  expression_en: "This is a baby boy",  expression_ar: "هذا ولد صغير",  imgUrl: "/public/Family/8.png" },
  { title_en: "Baby Girl", title_ar: "بنت صغيرة", expression_en: "This is a baby girl", expression_ar: "هذه بنت صغيرة", imgUrl: "/public/Family/9.png" },
]);

// ─────────────────────────────────────────────
// FEELINGS
// ─────────────────────────────────────────────
const feelingsHappyChoices = createGroup("Feelings", "/public/Feelings/1.png", [
  { title_en: "Happy with Family",       title_ar: "فرحان مع العيلة",        expression_en: "I am happy with my family",       expression_ar: "أنا فرحان مع عيلتي",        imgUrl: "/public/icons/Family.png" },
  { title_en: "Happy because I Played",  title_ar: "فرحان عشان لعبت",        expression_en: "I am happy because I played",     expression_ar: "أنا فرحان عشان لعبت",        imgUrl: "/public/icons/Play.png" },
  { title_en: "Happy because I Ate",     title_ar: "فرحان عشان أكلت",        expression_en: "I am happy because I ate",        expression_ar: "أنا فرحان عشان أكلت",        imgUrl: "/public/icons/Eating.png" },
]);

const feelingsAngryChoices = createGroup("Feelings", "/public/Feelings/3.png", [
  { title_en: "Angry from Noise",    title_ar: "متضايق من الصوت",      expression_en: "I am angry because of the noise",           expression_ar: "أنا متضايق من الصوت",        imgUrl: "/public/listen/Alert.png" },
  { title_en: "Angry from Waiting",  title_ar: "متضايق من الانتظار",   expression_en: "I am angry because I waited too long",      expression_ar: "أنا متضايق من الانتظار",     imgUrl: "/public/Questions/time.png" },
  { title_en: "Angry from Someone",  title_ar: "متضايق من شخص",        expression_en: "I am angry because someone bothered me",    expression_ar: "أنا متضايق لأن حد ضايقني",  imgUrl: "/public/talk/Conversation.png" },
]);

const feelingsAfraidChoices = createGroup("Feelings", "/public/Feelings/4.png", [
  { title_en: "Afraid of Insects",    title_ar: "خايف من الحشرات",       expression_en: "I am afraid of insects",     expression_ar: "أنا خايف من الحشرات",       imgUrl: "/public/Animals/7shraat.png" },
  { title_en: "Afraid of Darkness",   title_ar: "خايف من الضلمة",        expression_en: "I am afraid of the dark",    expression_ar: "أنا خايف من الضلمة",        imgUrl: "/public/sleeping/night-lamp.png" },
  { title_en: "Afraid of Loud Sound", title_ar: "خايف من الصوت العالي",  expression_en: "I am afraid of loud sounds", expression_ar: "أنا خايف من الصوت العالي",  imgUrl: "/public/listen/Alert.png" },
  { title_en: "Afraid of Dogs",       title_ar: "خايف من الكلاب",        expression_en: "I am afraid of dogs",        expression_ar: "أنا خايف من الكلاب",        imgUrl: "/public/Animals/Dog.png" },
]);

const feelingsTiredChoices = createGroup("Feelings", "/public/Feelings/5.png", [
  { title_en: "Tired after School",  title_ar: "تعبان بعد المدرسة",  expression_en: "I am tired after school",         expression_ar: "أنا تعبان بعد المدرسة",  imgUrl: "/public/Places/school.png" },
  { title_en: "Tired from Walking",  title_ar: "تعبان من المشي",     expression_en: "I am tired from walking",         expression_ar: "أنا تعبان من المشي",     imgUrl: "/public/icons/Walk.png" },
  { title_en: "Need to Sleep",       title_ar: "عايز أنام",           expression_en: "I am tired and need to sleep",    expression_ar: "أنا تعبان وعايز أنام",   imgUrl: "/public/sleeping/bed.png" },
]);

const feelingsExcitedChoices = createGroup("Feelings", "/public/Feelings/6.png", [
  { title_en: "Excited to Go Out",   title_ar: "متحمس للخروج",         expression_en: "I am excited to go out",       expression_ar: "أنا متحمس للخروج",         imgUrl: "/public/Relations/outside.png" },
  { title_en: "Excited to Play",     title_ar: "متحمس للعب",           expression_en: "I am excited to play",         expression_ar: "أنا متحمس للعب",           imgUrl: "/public/icons/Play.png" },
  { title_en: "Excited for Birthday",title_ar: "متحمس لعيد الميلاد",   expression_en: "I am excited for the birthday",expression_ar: "أنا متحمس لعيد الميلاد",   imgUrl: "/public/icons/Excited.png" },
]);

const feelingsRelaxedChoices = createGroup("Feelings", "/public/Feelings/8.png", [
  { title_en: "Relaxed at Home",      title_ar: "مرتاح في البيت",      expression_en: "I am relaxed at home",         expression_ar: "أنا مرتاح في البيت",      imgUrl: "/public/Places/home.png" },
  { title_en: "Relaxed with Music",   title_ar: "مرتاح مع الموسيقى",   expression_en: "I am relaxed with music",      expression_ar: "أنا مرتاح مع الموسيقى",   imgUrl: "/public/Music/music-notes.png" },
  { title_en: "Relaxed after Shower", title_ar: "مرتاح بعد الشاور",    expression_en: "I am relaxed after a shower",  expression_ar: "أنا مرتاح بعد الشاور",    imgUrl: "/public/icons/Shower.png" },
]);

const feelingsAnxiousChoices = createGroup("Feelings", "/public/Feelings/9.png", [
  { title_en: "Anxious in a New Place", title_ar: "قلقان من مكان جديد",  expression_en: "I am anxious in a new place",        expression_ar: "أنا قلقان من مكان جديد",  imgUrl: "/public/icons/Places.png" },
  { title_en: "Anxious from Crowds",    title_ar: "قلقان من الزحمة",     expression_en: "I am anxious because of crowds",     expression_ar: "أنا قلقان من الزحمة",     imgUrl: "/public/talk/GroupChat.png" },
  { title_en: "Anxious from an Exam",   title_ar: "قلقان من الامتحان",   expression_en: "I am anxious about the exam",        expression_ar: "أنا قلقان من الامتحان",   imgUrl: "/public/icons/Book.png" },
]);

const feelingsConfusedChoices = createGroup("Feelings", "/public/Feelings/10.png", [
  { title_en: "I Do Not Understand", title_ar: "أنا مش فاهم",    expression_en: "I am confused because I do not understand",        expression_ar: "أنا محتار لأني مش فاهم",           imgUrl: "/public/talk/MessageBubble.png" },
  { title_en: "Too Many Choices",    title_ar: "اختيارات كتير",  expression_en: "I am confused because there are too many choices",  expression_ar: "أنا محتار لأن في اختيارات كتير",  imgUrl: "/public/Questions/whichone.png" },
  { title_en: "Need Help",           title_ar: "محتاج مساعدة",   expression_en: "I am confused and need help",                      expression_ar: "أنا محتار ومحتاج مساعدة",          imgUrl: "/public/call/CallCenter.png" },
]);

const feelingsFrustratedChoices = createGroup("Feelings", "/public/Feelings/11.png", [
  { title_en: "Cannot Explain",       title_ar: "مش عارف أشرح",    expression_en: "I am frustrated because I cannot explain",       expression_ar: "أنا محبط لأني مش عارف أشرح",    imgUrl: "/public/talk/MessageBubble.png" },
  { title_en: "Device Is Not Working",title_ar: "الجهاز مش شغال",  expression_en: "I am frustrated because the device is not working",expression_ar: "أنا محبط لأن الجهاز مش شغال",  imgUrl: "/public/icons/Computer.png" },
  { title_en: "Task Is Hard",         title_ar: "المهمة صعبة",      expression_en: "I am frustrated because the task is hard",        expression_ar: "أنا محبط لأن المهمة صعبة",       imgUrl: "/public/icons/Book.png" },
]);

const feelingsProudChoices = createGroup("Feelings", "/public/Feelings/12.png", [
  { title_en: "Finished My Task",       title_ar: "خلصت مهمتي",          expression_en: "I am proud because I finished my task",       expression_ar: "أنا فخور لأني خلصت مهمتي",          imgUrl: "/public/icons/Yes.png" },
  { title_en: "Learned Something New",  title_ar: "اتعلمت حاجة جديدة",   expression_en: "I am proud because I learned something new",   expression_ar: "أنا فخور لأني اتعلمت حاجة جديدة",   imgUrl: "/public/icons/Read.png" },
  { title_en: "Helped Someone",         title_ar: "ساعدت حد",             expression_en: "I am proud because I helped someone",         expression_ar: "أنا فخور لأني ساعدت حد",             imgUrl: "/public/icons/Friend.png" },
]);

// ─────────────────────────────────────────────
// PLACES
// ─────────────────────────────────────────────
const schoolReasonChoices = createGroup("places", "/public/Places/school.png", [
  { title_en: "To Learn",           title_ar: "عشان أتعلم",          expression_en: "I want to go to school to learn",          expression_ar: "أريد الذهاب إلى المدرسة عشان أتعلم",          imgUrl: "/public/icons/Book.png" },
  { title_en: "To Meet My Friends", title_ar: "عشان أشوف صحابي",    expression_en: "I want to go to school to meet my friends",expression_ar: "أريد الذهاب إلى المدرسة عشان أشوف صحابي",    imgUrl: "/public/icons/Friend.png" },
  { title_en: "To Attend Class",    title_ar: "عشان أحضر الحصة",    expression_en: "I want to go to school to attend class",   expression_ar: "أريد الذهاب إلى المدرسة عشان أحضر الحصة",    imgUrl: "/public/icons/Read.png" },
  { title_en: "To Play",            title_ar: "عشان ألعب",           expression_en: "I want to go to school to play",           expression_ar: "أريد الذهاب إلى المدرسة عشان ألعب",           imgUrl: "/public/icons/Play.png" },
]);

const parkReasonChoices = createGroup("places", "/public/Places/park.png", [
  { title_en: "To Play",         title_ar: "عشان ألعب",        expression_en: "I want to go to the park to play",        expression_ar: "أريد الذهاب إلى الحديقة عشان ألعب",        imgUrl: "/public/icons/Play.png" },
  { title_en: "To Walk",         title_ar: "عشان أمشي",        expression_en: "I want to go to the park to walk",        expression_ar: "أريد الذهاب إلى الحديقة عشان أمشي",        imgUrl: "/public/icons/Walk.png" },
  { title_en: "To Meet Friends", title_ar: "عشان أقابل صحابي", expression_en: "I want to go to the park to meet friends", expression_ar: "أريد الذهاب إلى الحديقة عشان أقابل صحابي", imgUrl: "/public/icons/Friend.png" },
]);

const homeReasonChoices = createGroup("places", "/public/Places/home.png", [
  { title_en: "To Rest",          title_ar: "عشان أرتاح",       expression_en: "I want to go home to rest",           expression_ar: "أريد الذهاب إلى البيت عشان أرتاح",       imgUrl: "/public/icons/Relax.png" },
  { title_en: "To Sleep",         title_ar: "عشان أنام",        expression_en: "I want to go home to sleep",          expression_ar: "أريد الذهاب إلى البيت عشان أنام",        imgUrl: "/public/sleeping/bed.png" },
  { title_en: "To See My Family", title_ar: "عشان أشوف عيلتي", expression_en: "I want to go home to see my family",   expression_ar: "أريد الذهاب إلى البيت عشان أشوف عيلتي", imgUrl: "/public/icons/Family.png" },
]);

const hospitalReasonChoices = createGroup("places", "/public/Places/hospital.png", [
  { title_en: "To See the Doctor", title_ar: "عشان أكشف",       expression_en: "I want to go to the hospital to see the doctor", expression_ar: "أريد الذهاب إلى المستشفى عشان أكشف",       imgUrl: "/public/icons/Doctor.png" },
  { title_en: "To Get Medicine",   title_ar: "عشان أجيب دواء",  expression_en: "I want to go to the hospital to get medicine",   expression_ar: "أريد الذهاب إلى المستشفى عشان أجيب دواء",  imgUrl: "/public/icons/Medicine.png" },
  { title_en: "To Visit Someone",  title_ar: "عشان أزور حد",    expression_en: "I want to go to the hospital to visit someone",  expression_ar: "أريد الذهاب إلى المستشفى عشان أزور حد",    imgUrl: "/public/icons/Friend.png" },
]);

const supermarketReasonChoices = createGroup("places", "/public/Places/supermarket.png", [
  { title_en: "To Buy Food",   title_ar: "عشان أشتري أكل",   expression_en: "I want to go to the supermarket to buy food",   expression_ar: "أريد الذهاب إلى السوبرماركت عشان أشتري أكل",   imgUrl: "/public/Food and Drink/apple.png" },
  { title_en: "To Buy Bread",  title_ar: "عشان أشتري عيش",   expression_en: "I want to go to the supermarket to buy bread",  expression_ar: "أريد الذهاب إلى السوبرماركت عشان أشتري عيش",   imgUrl: "/public/Food and Drink/esh.png" },
  { title_en: "To Buy Snacks", title_ar: "عشان أشتري سناكس", expression_en: "I want to go to the supermarket to buy snacks", expression_ar: "أريد الذهاب إلى السوبرماركت عشان أشتري سناكس", imgUrl: "/public/Food and Drink/btats.png" },
]);

const universityReasonChoices = createGroup("places", "/public/Places/university.png", [
  { title_en: "To Study",      title_ar: "عشان أذاكر",       expression_en: "I want to go to the university to study",      expression_ar: "أريد الذهاب إلى الجامعة عشان أذاكر",       imgUrl: "/public/icons/Book.png" },
  { title_en: "For a Lecture", title_ar: "عشان المحاضرة",    expression_en: "I want to go to the university for a lecture", expression_ar: "أريد الذهاب إلى الجامعة عشان المحاضرة",    imgUrl: "/public/icons/Read.png" },
  { title_en: "For an Exam",   title_ar: "عشان الامتحان",    expression_en: "I want to go to the university for an exam",   expression_ar: "أريد الذهاب إلى الجامعة عشان الامتحان",    imgUrl: "/public/Questions/whichone.png" },
]);

const workReasonChoices = createGroup("places", "/public/Places/work.png", [
  { title_en: "To Work",             title_ar: "عشان أشتغل",        expression_en: "I want to go to work",                         expression_ar: "أريد الذهاب إلى العمل عشان أشتغل",          imgUrl: "/public/icons/Computer.png" },
  { title_en: "To Meet Colleagues",  title_ar: "عشان أقابل زمايلي", expression_en: "I want to go to work to meet my colleagues",    expression_ar: "أريد الذهاب إلى العمل عشان أقابل زمايلي",   imgUrl: "/public/icons/Friend.png" },
  { title_en: "To Finish My Task",   title_ar: "عشان أخلص شغلي",   expression_en: "I want to go to work to finish my task",        expression_ar: "أريد الذهاب إلى العمل عشان أخلص شغلي",      imgUrl: "/public/icons/Yes.png" },
]);

const busStationReasonChoices = createGroup("places", "/public/Places/busstation.png", [
  { title_en: "To Travel",      title_ar: "عشان أسافر",        expression_en: "I want to go to the bus station to travel",   expression_ar: "أريد الذهاب إلى محطة الأتوبيس عشان أسافر",       imgUrl: "/public/Transport/4.png" },
  { title_en: "To Ride the Bus",title_ar: "عشان أركب الباص",   expression_en: "I want to go to the bus station to ride the bus",expression_ar: "أريد الذهاب إلى محطة الأتوبيس عشان أركب الباص", imgUrl: "/public/Transport/5.png" },
  { title_en: "To Go Home",     title_ar: "عشان أروح البيت",   expression_en: "I want to go to the bus station to go home",  expression_ar: "أريد الذهاب إلى محطة الأتوبيس عشان أروح البيت",  imgUrl: "/public/Places/home.png" },
]);

// ─────────────────────────────────────────────
// TRANSPORT
// ─────────────────────────────────────────────
const transportBusChoices = createGroup("Transport", "/public/Transport/5.png", [
  { title_en: "Bus to School",   title_ar: "باص للمدرسة",   expression_en: "I want a bus to school",    expression_ar: "أريد باص للمدرسة",   imgUrl: "/public/Places/school.png" },
  { title_en: "Bus to Home",     title_ar: "باص للبيت",     expression_en: "I want a bus to home",      expression_ar: "أريد باص للبيت",     imgUrl: "/public/Places/home.png" },
  { title_en: "Bus to Hospital", title_ar: "باص للمستشفى",  expression_en: "I want a bus to the hospital",expression_ar: "أريد باص للمستشفى",imgUrl: "/public/Places/hospital.png" },
]);

const transportCarChoices = createGroup("Transport", "/public/Transport/6.png", [
  { title_en: "Car with Father", title_ar: "عربية مع بابا",  expression_en: "I want to go in the car with my father", expression_ar: "أريد الذهاب بالعربية مع بابا", imgUrl: "/public/Family/4.png" },
  { title_en: "Car with Mother", title_ar: "عربية مع ماما",  expression_en: "I want to go in the car with my mother", expression_ar: "أريد الذهاب بالعربية مع ماما", imgUrl: "/public/Family/3.png" },
  { title_en: "Car to School",   title_ar: "عربية للمدرسة",  expression_en: "I want a car to school",                 expression_ar: "أريد عربية للمدرسة",           imgUrl: "/public/Places/school.png" },
]);

const transportTaxiChoices = createGroup("Transport", "/public/Transport/2.png", [
  { title_en: "Taxi to Home",     title_ar: "تاكسي للبيت",     expression_en: "I want a taxi to home",     expression_ar: "أريد تاكسي للبيت",     imgUrl: "/public/Places/home.png" },
  { title_en: "Taxi to Hospital", title_ar: "تاكسي للمستشفى",  expression_en: "I want a taxi to the hospital",expression_ar: "أريد تاكسي للمستشفى",imgUrl: "/public/Places/hospital.png" },
  { title_en: "Taxi Quickly",     title_ar: "تاكسي بسرعة",     expression_en: "I want a taxi quickly",      expression_ar: "أريد تاكسي بسرعة",     imgUrl: "/public/Transport/2.png" },
]);

const transportTrainChoices = createGroup("Transport", "/public/Transport/10.png", [
  { title_en: "Train to Travel",        title_ar: "قطار للسفر",           expression_en: "I want a train for travel",         expression_ar: "أريد قطار للسفر",           imgUrl: "/public/Transport/10.png" },
  { title_en: "Train to Visit Family",  title_ar: "قطار لزيارة العيلة",   expression_en: "I want a train to visit my family", expression_ar: "أريد قطار لزيارة العيلة",   imgUrl: "/public/icons/Family.png" },
  { title_en: "Train to Work",          title_ar: "قطار للشغل",            expression_en: "I want a train to work",            expression_ar: "أريد قطار للشغل",            imgUrl: "/public/Places/work.png" },
]);

const transportBicycleChoices = createGroup("Transport", "/public/Transport/1.png", [
  { title_en: "Bicycle to Play",          title_ar: "عجلة للعب",         expression_en: "I want a bicycle to play",           expression_ar: "أريد عجلة للعب",         imgUrl: "/public/icons/Play.png" },
  { title_en: "Bicycle to Exercise",      title_ar: "عجلة للرياضة",      expression_en: "I want a bicycle to exercise",       expression_ar: "أريد عجلة للرياضة",      imgUrl: "/public/icons/Walk.png" },
  { title_en: "Bicycle for Short Distance",title_ar: "عجلة لمشوار قريب", expression_en: "I want a bicycle for a short distance",expression_ar: "أريد عجلة لمشوار قريب",imgUrl: "/public/Transport/1.png" },
]);

const transportMotorcycleChoices = createGroup("Transport", "/public/Transport/3.png", [
  { title_en: "Motorcycle with Father", title_ar: "موتوسيكل مع بابا", expression_en: "I want to ride the motorcycle with my father", expression_ar: "أريد ركوب الموتوسيكل مع بابا", imgUrl: "/public/Family/4.png" },
  { title_en: "Motorcycle Quickly",     title_ar: "موتوسيكل بسرعة",   expression_en: "I want a fast motorcycle ride",               expression_ar: "أريد ركوب موتوسيكل بسرعة",   imgUrl: "/public/Transport/3.png" },
]);

const transportAirplaneChoices = createGroup("Transport", "/public/Transport/4.png", [
  { title_en: "Airplane for Travel",         title_ar: "طيارة للسفر",          expression_en: "I want an airplane for travel",         expression_ar: "أريد طيارة للسفر",          imgUrl: "/public/Transport/4.png" },
  { title_en: "Airplane for Vacation",       title_ar: "طيارة للإجازة",        expression_en: "I want an airplane for vacation",       expression_ar: "أريد طيارة للإجازة",        imgUrl: "/public/Transport/4.png" },
  { title_en: "Airplane to Visit Relatives", title_ar: "طيارة لزيارة الأقارب", expression_en: "I want an airplane to visit relatives", expression_ar: "أريد طيارة لزيارة الأقارب", imgUrl: "/public/icons/Family.png" },
]);

const transportTramChoices = createGroup("Transport", "/public/Transport/7.png", [
  { title_en: "Tram to School", title_ar: "ترام للمدرسة", expression_en: "I want a tram to school",     expression_ar: "أريد ترام للمدرسة", imgUrl: "/public/Places/school.png" },
  { title_en: "Tram to Market", title_ar: "ترام للسوق",   expression_en: "I want a tram to the market", expression_ar: "أريد ترام للسوق",   imgUrl: "/public/icons/Shopping.png" },
  { title_en: "Tram to Home",   title_ar: "ترام للبيت",   expression_en: "I want a tram to home",       expression_ar: "أريد ترام للبيت",   imgUrl: "/public/Places/home.png" },
]);

const transportShipChoices = createGroup("Transport", "/public/Transport/9.png", [
  { title_en: "Ship for Travel", title_ar: "سفينة للسفر",  expression_en: "I want a ship for travel", expression_ar: "أريد سفينة للسفر",  imgUrl: "/public/Transport/9.png" },
  { title_en: "Ship for a Trip", title_ar: "سفينة للرحلة", expression_en: "I want a ship for a trip", expression_ar: "أريد سفينة للرحلة", imgUrl: "/public/Transport/9.png" },
]);

const transportElevatorChoices = createGroup("Transport", "/public/Transport/8.png", [
  { title_en: "Go Upstairs",       title_ar: "أطلع فوق",   expression_en: "I want to use the elevator to go upstairs",   expression_ar: "أريد استخدام الأسانسير عشان أطلع فوق",   imgUrl: "/public/Relations/up.png" },
  { title_en: "Go Downstairs",     title_ar: "أنزل تحت",   expression_en: "I want to use the elevator to go downstairs", expression_ar: "أريد استخدام الأسانسير عشان أنزل تحت",   imgUrl: "/public/Relations/down.png" },
  { title_en: "Go to the Apartment",title_ar: "أطلع للشقة", expression_en: "I want to use the elevator to go to the apartment",expression_ar: "أريد استخدام الأسانسير عشان أطلع للشقة",imgUrl: "/public/Places/home.png" },
]);

// ─────────────────────────────────────────────
// CALL
// ─────────────────────────────────────────────
const callMobileChoices = createGroup("Call", "/public/call/mobile.png", [
  { title_en: "Call Mother",        title_ar: "أكلم ماما",   expression_en: "I want to call my mother",        expression_ar: "أريد أكلم ماما",   imgUrl: "/public/Family/3.png" },
  { title_en: "Call Father",        title_ar: "أكلم بابا",   expression_en: "I want to call my father",        expression_ar: "أريد أكلم بابا",   imgUrl: "/public/Family/4.png" },
  { title_en: "Call Sister",        title_ar: "أكلم أختي",   expression_en: "I want to call my sister",        expression_ar: "أريد أكلم أختي",   imgUrl: "/public/Family/1.png" },
  { title_en: "Call Brother",       title_ar: "أكلم أخويا",  expression_en: "I want to call my brother",       expression_ar: "أريد أكلم أخويا",  imgUrl: "/public/Family/7.png" },
  { title_en: "Call Uncle",         title_ar: "أكلم عمي",    expression_en: "I want to call my uncle",         expression_ar: "أريد أكلم عمي",    imgUrl: "/public/Family/6.png" },
  { title_en: "Call Maternal Uncle",title_ar: "أكلم خالي",   expression_en: "I want to call my maternal uncle",expression_ar: "أريد أكلم خالي",   imgUrl: "/public/Family/6.png" },
]);

const callVideoChoices = createGroup("Call", "/public/call/Videocall.png", [
  { title_en: "Video Call Mother", title_ar: "فيديو كول لماما",    expression_en: "I want a video call with my mother", expression_ar: "أريد فيديو كول مع ماما",    imgUrl: "/public/Family/3.png" },
  { title_en: "Video Call Father", title_ar: "فيديو كول لبابا",    expression_en: "I want a video call with my father", expression_ar: "أريد فيديو كول مع بابا",    imgUrl: "/public/Family/4.png" },
  { title_en: "Video Call Sister", title_ar: "فيديو كول لأختي",    expression_en: "I want a video call with my sister", expression_ar: "أريد فيديو كول مع أختي",    imgUrl: "/public/Family/1.png" },
  { title_en: "Video Call Friend", title_ar: "فيديو كول لصاحبي",   expression_en: "I want a video call with my friend", expression_ar: "أريد فيديو كول مع صاحبي",   imgUrl: "/public/icons/Friend.png" },
]);

const callLandlineChoices = createGroup("Call", "/public/call/Landline.png", [
  { title_en: "Call Home",        title_ar: "أكلم البيت",  expression_en: "I want to call home",          expression_ar: "أريد أكلم البيت",  imgUrl: "/public/Places/home.png" },
  { title_en: "Call Grandfather", title_ar: "أكلم جدي",    expression_en: "I want to call my grandfather", expression_ar: "أريد أكلم جدي",    imgUrl: "/public/Family/2.png" },
  { title_en: "Call Grandmother", title_ar: "أكلم جدتي",   expression_en: "I want to call my grandmother", expression_ar: "أريد أكلم جدتي",   imgUrl: "/public/Family/10.png" },
]);

const callMessengerChoices = createGroup("Call", "/public/call/Messenger.png", [
  { title_en: "Message Mother",   title_ar: "أبعت لماما",   expression_en: "I want to message my mother",    expression_ar: "أريد أبعت لماما",   imgUrl: "/public/Family/3.png" },
  { title_en: "Message Father",   title_ar: "أبعت لبابا",   expression_en: "I want to message my father",    expression_ar: "أريد أبعت لبابا",   imgUrl: "/public/Family/4.png" },
  { title_en: "Message Friend",   title_ar: "أبعت لصاحبي",  expression_en: "I want to message my friend",    expression_ar: "أريد أبعت لصاحبي",  imgUrl: "/public/icons/Friend.png" },
  { title_en: "Message Neighbor", title_ar: "أبعت للجار",   expression_en: "I want to message the neighbor", expression_ar: "أريد أبعت للجار",   imgUrl: "/public/memories/neighborhood.png" },
]);

const callConferenceChoices = createGroup("Call", "/public/call/Conference.png", [
  { title_en: "Family Conference",  title_ar: "مكالمة جماعية للعيلة",   expression_en: "I want a family conference call",  expression_ar: "أريد مكالمة جماعية للعيلة",   imgUrl: "/public/icons/Family.png" },
  { title_en: "Friends Conference", title_ar: "مكالمة جماعية للأصحاب",  expression_en: "I want a friends conference call", expression_ar: "أريد مكالمة جماعية للأصحاب",  imgUrl: "/public/talk/GroupChat.png" },
]);

const emergencyCallChoices = createGroup("Call", "/public/call/EmergencyCall.png", [
  { title_en: "Call Ambulance",       title_ar: "أكلم الإسعاف",  expression_en: "I want to call the ambulance",       expression_ar: "أريد أكلم الإسعاف",  imgUrl: "/public/icons/Doctor.png" },
  { title_en: "Call Police",          title_ar: "أكلم الشرطة",   expression_en: "I want to call the police",          expression_ar: "أريد أكلم الشرطة",   imgUrl: "/public/call/DialPad.png" },
  { title_en: "Call Fire Department", title_ar: "أكلم المطافي",  expression_en: "I want to call the fire department", expression_ar: "أريد أكلم المطافي",  imgUrl: "/public/listen/Alert.png" },
  { title_en: "Call Doctor",          title_ar: "أكلم الدكتور",  expression_en: "I want to call the doctor",          expression_ar: "أريد أكلم الدكتور",  imgUrl: "/public/icons/Doctor.png" },
]);

// ─────────────────────────────────────────────
// EXPORT MAP
// ─────────────────────────────────────────────
export const subSubIconsMap = {
  "Breakfast::Bread":    breakfastBreadChoices,
  "Breakfast::Eggs":     breakfastEggChoices,
  "Breakfast::Cheese":   breakfastCheeseChoices,
  "Breakfast::Milk":     breakfastMilkChoices,
  "Breakfast::Coffee":   breakfastCoffeeChoices,
  "Breakfast::Tea":      breakfastTeaChoices,
  "Breakfast::Juice":    breakfastJuiceChoices,
  "Breakfast::Beans":    breakfastBeansChoices,
  "Breakfast::Fruits":   breakfastFruitChoices,
  "Breakfast::Cereal":   breakfastCerealChoices,
  "Breakfast::Honey":    breakfastHoneyChoices,
  "Lunch::Rice":         lunchRiceChoices,
  "Lunch::Pasta":        lunchPastaChoices,
  "Lunch::Chicken":      lunchChickenChoices,
  "Lunch::Meat":         lunchMeatChoices,
  "Lunch::Fish":         lunchFishChoices,
  "Lunch::Salad":        lunchSaladChoices,
  "Lunch::Soup":         lunchSoupChoices,
  "Lunch::Bread":        lunchBreadChoices,
  "Lunch::Juice":        lunchJuiceChoices,
  "Dinner::Rice":        dinnerRiceChoices,
  "Dinner::Pasta":       dinnerPastaChoices,
  "Dinner::Chicken":     dinnerChickenChoices,
  "Dinner::Meat":        dinnerMeatChoices,
  "Dinner::Fish":        dinnerFishChoices,
  "Dinner::Salad":       dinnerSaladChoices,
  "Dinner::Soup":        dinnerSoupChoices,
  "Dinner::Bread":       dinnerBreadChoices,
  "Dinner::Juice":       dinnerJuiceChoices,
  "Snack::Chips":        snackChipsChoices,
  "Snack::Cookies":      snackCookieChoices,
  "Snack::Chocolate":    snackChocolateChoices,
  "Snack::Fruits":       snackFruitChoices,
  "Snack::Nuts":         snackNutChoices,
  "Snack::Yogurt":       snackYogurtChoices,
  "Snack::Sandwich":     snackSandwichChoices,
  "Snack::Juice":        snackJuiceChoices,
  "Snack::Tea":          snackTeaChoices,
  "Snack::Coffee":       snackCoffeeChoices,
  "Family::Mother":      familyMotherChoices,
  "Family::Father":      familyFatherChoices,
  "Family::Brother":     familyBrotherChoices,
  "Family::Sister":      familySisterChoices,
  "Family::Grandfather": familyGrandfatherChoices,
  "Family::Grandmother": familyGrandmotherChoices,
  "Family::Uncle":       familyUncleChoices,
  "Family::Aunt":        familyAuntChoices,
  "Family::Cousin":      familyCousinChoices,
  "Family::Baby":        familyBabyChoices,
  "Family::Uncle (M)":   familyUncleChoices,
  "Family::Aunt (M)":    familyAuntChoices,
  "Feelings::Happy":     feelingsHappyChoices,
  "Feelings::Angry":     feelingsAngryChoices,
  "Feelings::Afraid":    feelingsAfraidChoices,
  "Feelings::Tired":     feelingsTiredChoices,
  "Feelings::Excited":   feelingsExcitedChoices,
  "Feelings::Relaxed":   feelingsRelaxedChoices,
  "Feelings::Anxious":   feelingsAnxiousChoices,
  "Feelings::Confused":  feelingsConfusedChoices,
  "Feelings::Frustrated":feelingsFrustratedChoices,
  "Feelings::Proud":     feelingsProudChoices,
  "places::School":      schoolReasonChoices,
  "places::Park":        parkReasonChoices,
  "places::Home":        homeReasonChoices,
  "places::Hospital":    hospitalReasonChoices,
  "places::Supermarket": supermarketReasonChoices,
  "places::University":  universityReasonChoices,
  "places::Work":        workReasonChoices,
  "places::Bus Station": busStationReasonChoices,
  "Transport::Bus":        transportBusChoices,
  "Transport::Car":        transportCarChoices,
  "Transport::Taxi":       transportTaxiChoices,
  "Transport::Train":      transportTrainChoices,
  "Transport::Bicycle":    transportBicycleChoices,
  "Transport::Motorcycle": transportMotorcycleChoices,
  "Transport::Airplane":   transportAirplaneChoices,
  "Transport::Tram":       transportTramChoices,
  "Transport::Ship":       transportShipChoices,
  "Transport::Elevator":   transportElevatorChoices,
  "Call::Mobile":          callMobileChoices,
  "Call::Video Call":      callVideoChoices,
  "Call::Landline":        callLandlineChoices,
  "Call::Messenger":       callMessengerChoices,
  "Call::Conference":      callConferenceChoices,
  "Call::Emergency Call":  emergencyCallChoices,
};