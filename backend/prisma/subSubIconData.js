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
  { title_en: "Black Coffee",      title_ar: "قهوة سادة",   expression_en: "I want black coffee",      expression_ar: "أريد قهوة سادة",   imgUrl: "/public/Food and Drink/dark_coffee.png" },
  { title_en: "Coffee with Milk",  title_ar: "قهوة بلبن",   expression_en: "I want coffee with milk",  expression_ar: "أريد قهوة بلبن",   imgUrl: "/public/Food and Drink/coffee_with_milk.png" },
  { title_en: "Nescafe",           title_ar: "نسكافيه",      expression_en: "I want nescafe",           expression_ar: "أريد نسكافيه",     imgUrl: "/public/Food and Drink/nescafee.png" },
]);

const breakfastTeaChoices = createGroup("Breakfast", "/public/breakfast/tea.png", [
  { title_en: "Tea with Milk", title_ar: "شاي بلبن",    expression_en: "I want tea with milk", expression_ar: "أريد شاي بلبن",    imgUrl: "/public/Food and Drink/milk_tea.png" },
  { title_en: "Green Tea",     title_ar: "شاي أخضر",   expression_en: "I want green tea",     expression_ar: "أريد شاي أخضر",   imgUrl: "/public/Food and Drink/green_tea.png" },
  { title_en: "Red Tea",       title_ar: "شاي أحمر",   expression_en: "I want red tea",       expression_ar: "أريد شاي أحمر",   imgUrl: "/public/Food and Drink/red_tea.png" },
]);

const breakfastJuiceChoices = createGroup("Breakfast", "/public/breakfast/juice.png", [
  { title_en: "Orange Juice", title_ar: "عصير برتقال", expression_en: "I want orange juice", expression_ar: "أريد عصير برتقال", imgUrl: "/public/Food and Drink/orange.png" },
  { title_en: "Mango Juice",  title_ar: "عصير مانجو",  expression_en: "I want mango juice",  expression_ar: "أريد عصير مانجو",  imgUrl: "/public/Food and Drink/mango.png" },
  { title_en: "Guava Juice",  title_ar: "عصير جوافة",  expression_en: "I want guava juice",  expression_ar: "أريد عصير جوافة",  imgUrl: "/public/Food and Drink/gwafa.png" },
]);

const breakfastBeansChoices = createGroup("Breakfast", "/public/breakfast/beans.png", [
  { title_en: "Plain Beans",        title_ar: "فول سادة",       expression_en: "I want plain beans",        expression_ar: "أريد فول سادة",       imgUrl: "/public/Food and Drink/vegetableszz.png" },
  { title_en: "Beans with Oil",     title_ar: "فول بالزيت",     expression_en: "I want beans with oil",     expression_ar: "أريد فول بالزيت",     imgUrl: "/public/Food and Drink/vegetablessz.png" },
  { title_en: "Beans with Tahini",  title_ar: "فول بالطحينة",   expression_en: "I want beans with tahini",  expression_ar: "أريد فول بالطحينة",   imgUrl: "/public/Food and Drink/133.png" },
]);

const breakfastFruitChoices = createGroup("Breakfast", "/public/breakfast/fruits.png", [
  { title_en: "Apple",  title_ar: "تفاح", expression_en: "I want an apple", expression_ar: "أريد تفاح", imgUrl: "/public/Food and Drink/apple.png" },
  { title_en: "Banana", title_ar: "موز",  expression_en: "I want a banana", expression_ar: "أريد موز",  imgUrl: "/public/Food and Drink/mozzz.png" },
  { title_en: "Dates",  title_ar: "بلح",  expression_en: "I want dates",    expression_ar: "أريد بلح",  imgUrl: "/public/Food and Drink/11.png" },
]);

const breakfastCerealChoices = createGroup("Breakfast", "/public/breakfast/cereal.png", [
  { title_en: "Corn Flakes",       title_ar: "كورن فليكس",     expression_en: "I want corn flakes",       expression_ar: "أريد كورن فليكس",     imgUrl: "/public/Food and Drink/cereal.png" },
  { title_en: "Chocolate Cereal",  title_ar: "حبوب شوكولاتة",  expression_en: "I want chocolate cereal",  expression_ar: "أريد حبوب شوكولاتة",  imgUrl: "/public/Food and Drink/chocolateee.png" },
  { title_en: "Oats",              title_ar: "شوفان",           expression_en: "I want oats",              expression_ar: "أريد شوفان",           imgUrl: "/public/Food and Drink/oats.png" },
]);

const breakfastHoneyChoices = createGroup("Breakfast", "/public/breakfast/honey.png", [
  { title_en: "White Honey", title_ar: "عسل أبيض", expression_en: "I want white honey", expression_ar: "أريد عسل أبيض", imgUrl: "/public/Food and Drink/White Honey.png" },
  { title_en: "Black Honey", title_ar: "عسل أسود", expression_en: "I want black honey", expression_ar: "أريد عسل أسود", imgUrl: "/public/Food and Drink/Black Honey.png" },
]);

// ─────────────────────────────────────────────
// LUNCH
// ─────────────────────────────────────────────
const lunchRiceChoices = createGroup("Lunch", "/public/lunch/rice.png", [
  { title_en: "White Rice",           title_ar: "أرز أبيض",       expression_en: "I want white rice",           expression_ar: "أريد أرز أبيض",       imgUrl: "/public/Food and Drink/White_Rice.png" },
  { title_en: "Rice with Vegetables", title_ar: "أرز بالخضار",    expression_en: "I want rice with vegetables", expression_ar: "أريد أرز بالخضار",    imgUrl: "/public/Food and Drink/rice.png" },
  { title_en: "Rice with Chicken",    title_ar: "أرز بالفراخ",    expression_en: "I want rice with chicken",    expression_ar: "أريد أرز بالفراخ",    imgUrl: "/public/Food and Drink/frahkkk.png" },
]);

const lunchPastaChoices = createGroup("Lunch", "/public/lunch/pasta.png", [
  { title_en: "Red Sauce Pasta",   title_ar: "مكرونة بالصلصة",       expression_en: "I want pasta with red sauce",   expression_ar: "أريد مكرونة بالصلصة",       imgUrl: "/public/Food and Drink/pasta.png" },
  { title_en: "Bechamel Pasta",    title_ar: "مكرونة بشاميل",         expression_en: "I want bechamel pasta",         expression_ar: "أريد مكرونة بشاميل",         imgUrl: "/public/Food and Drink/155.png" },
  { title_en: "White Sauce Pasta", title_ar: "مكرونة وايت صوص",       expression_en: "I want pasta with white sauce", expression_ar: "أريد مكرونة وايت صوص",       imgUrl: "/public/Food and Drink/pastas.png" },
]);

const lunchChickenChoices = createGroup("Lunch", "/public/lunch/chicken.png", [
  { title_en: "Grilled Chicken",  title_ar: "فراخ مشوية",    expression_en: "I want grilled chicken",  expression_ar: "أريد فراخ مشوية",    imgUrl: "/public/Food and Drink/frahkkkkk.png" },
  { title_en: "Fried Chicken",    title_ar: "فراخ مقلية",    expression_en: "I want fried chicken",    expression_ar: "أريد فراخ مقلية",    imgUrl: "/public/Food and Drink/chicken.png" },
  { title_en: "Roasted Chicken",  title_ar: "فراخ في الفرن", expression_en: "I want roasted chicken",  expression_ar: "أريد فراخ في الفرن", imgUrl: "/public/Food and Drink/frahkkkkkkkkkkk.png" },
]);

const lunchMeatChoices = createGroup("Lunch", "/public/lunch/meat.png", [
  { title_en: "Kofta",        title_ar: "كفتة",          expression_en: "I want kofta",        expression_ar: "أريد كفتة",          imgUrl: "/public/Food and Drink/kofta.png" },
  { title_en: "Steak",        title_ar: "ستيك",           expression_en: "I want steak",        expression_ar: "أريد ستيك",           imgUrl: "/public/talk/meat.png" },
  { title_en: "Minced Meat",  title_ar: "لحمة مفرومة",   expression_en: "I want minced meat",  expression_ar: "أريد لحمة مفرومة",   imgUrl: "/public/Food and Drink/meat.png" },
]);

const lunchFishChoices = createGroup("Lunch", "/public/lunch/fish.png", [
  { title_en: "Grilled Fish", title_ar: "سمك مشوي",   expression_en: "I want grilled fish", expression_ar: "أريد سمك مشوي",   imgUrl: "/public/Food and Drink/grilled_fish.png" },
  { title_en: "Fried Fish",   title_ar: "سمك مقلي",   expression_en: "I want fried fish",   expression_ar: "أريد سمك مقلي",   imgUrl: "/public/Food and Drink/fried_fish.png" },
  { title_en: "Fish Fillet",  title_ar: "فيليه سمك",  expression_en: "I want fish fillet",  expression_ar: "أريد فيليه سمك",  imgUrl: "/public/Food and Drink/fillet_fish.png" },
]);

const lunchSaladChoices = createGroup("Lunch", "/public/lunch/salad.png", [
  { title_en: "Green Salad",   title_ar: "سلطة خضراء",  expression_en: "I want green salad",   expression_ar: "أريد سلطة خضراء",  imgUrl: "/public/Food and Drink/green_salad.png" },
  { title_en: "Tahini Salad",  title_ar: "سلطة طحينة",  expression_en: "I want tahini salad",  expression_ar: "أريد سلطة طحينة",  imgUrl: "/public/Food and Drink/tahini_salad.png" },
  { title_en: "Yogurt Salad",  title_ar: "سلطة زبادي",  expression_en: "I want yogurt salad",  expression_ar: "أريد سلطة زبادي",  imgUrl: "/public/Food and Drink/yogurt_salad.png" },
]);

const lunchSoupChoices = createGroup("Lunch", "/public/lunch/soup.png", [
  { title_en: "Lentil Soup",     title_ar: "شوربة عدس",    expression_en: "I want lentil soup",     expression_ar: "أريد شوربة عدس",    imgUrl: "/public/Food and Drink/lentil_soup.png" },
  { title_en: "Chicken Soup",    title_ar: "شوربة فراخ",   expression_en: "I want chicken soup",    expression_ar: "أريد شوربة فراخ",   imgUrl: "/public/Food and Drink/chicken_soup.png" },
  { title_en: "Vegetable Soup",  title_ar: "شوربة خضار",   expression_en: "I want vegetable soup",  expression_ar: "أريد شوربة خضار",   imgUrl: "/public/Food and Drink/vegetable_soup.png" },
]);

const lunchBreadChoices = createGroup("Lunch", "/public/lunch/bread.png", [
  
  { title_en: "Balady Bread",  title_ar: "عيش بلدي",  expression_en: "I want balady bread",  expression_ar: "أريد عيش بلدي",  imgUrl: "/public/Food and Drink/esh_baladi.png" },
  { title_en: "Fino Bread",    title_ar: "عيش فينو",   expression_en: "I want fino bread",    expression_ar: "أريد عيش فينو",   imgUrl: "/public/Food and Drink/esh_fino.png" },
  { title_en: "Shamy Bread",   title_ar: "عيش شامي",   expression_en: "I want shamy bread",   expression_ar: "أريد عيش شامي",   imgUrl: "/public/Food and Drink/esh_shamy.png" },
  { title_en: "Toast",         title_ar: "توست",        expression_en: "I want toast",         expression_ar: "أريد توست",        imgUrl: "/public/Food and Drink/toast.png" },
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
  { title_en: "Cheese Chips", title_ar: "شيبسي جبنة", expression_en: "I want cheese chips", expression_ar: "أريد شيبسي جبنة", imgUrl: "/public/Food and Drink/cheese_chips.png" },
  { title_en: "Chili Chips",  title_ar: "شيبسي حار",  expression_en: "I want chili chips",  expression_ar: "أريد شيبسي حار",  imgUrl: "/public/Food and Drink/chili_chips.png" },
  { title_en: "Salted Chips", title_ar: "شيبسي ملح",  expression_en: "I want salted chips", expression_ar: "أريد شيبسي ملح",  imgUrl: "/public/Food and Drink/salted_chips.png" },
]);

const snackCookieChoices = createGroup("Snack", "/public/snack/cookies.png", [
  { title_en: "Chocolate Cookies", title_ar: "كوكيز شوكولاتة", expression_en: "I want chocolate cookies", expression_ar: "أريد كوكيز شوكولاتة", imgUrl: "/public/Food and Drink/chocolate_cookies.png" },
  { title_en: "Vanilla Cookies",   title_ar: "كوكيز فانيليا",  expression_en: "I want vanilla cookies",   expression_ar: "أريد كوكيز فانيليا",  imgUrl: "/public/Food and Drink/vanilla_cookies.png" },
  { title_en: "Biscuits",          title_ar: "بسكويت",          expression_en: "I want biscuits",          expression_ar: "أريد بسكويت",          imgUrl: "/public/Food and Drink/biscuits.png" },
]);

const snackChocolateChoices = createGroup("Snack", "/public/snack/chocolate.png", [
  { title_en: "Dark Chocolate",  title_ar: "شوكولاتة دارك",    expression_en: "I want dark chocolate",  expression_ar: "أريد شوكولاتة دارك",    imgUrl: "/public/Food and Drink/dark_chocolate.png" },
  { title_en: "Milk Chocolate",  title_ar: "شوكولاتة بالحليب", expression_en: "I want milk chocolate",  expression_ar: "أريد شوكولاتة بالحليب", imgUrl: "/public/Food and Drink/milk_chocolate.png" },
  { title_en: "Wafer Chocolate", title_ar: "شوكولاتة ويفر",    expression_en: "I want wafer chocolate", expression_ar: "أريد شوكولاتة ويفر",    imgUrl: "/public/Food and Drink/wafer_chocolate.png" },
]);

const snackFruitChoices = createGroup("Snack", "/public/snack/fruits.png", [
  { title_en: "Apple",       title_ar: "تفاح",    expression_en: "I want an apple",   expression_ar: "أريد تفاح",    imgUrl: "/public/Food and Drink/apple.png" },
  { title_en: "Banana",      title_ar: "موز",     expression_en: "I want a banana",   expression_ar: "أريد موز",     imgUrl: "/public/Food and Drink/mozz.png" },
  { title_en: "Strawberry",  title_ar: "فراولة",  expression_en: "I want strawberry", expression_ar: "أريد فراولة",  imgUrl: "/public/Food and Drink/frawla.png" },
]);

const snackNutChoices = createGroup("Snack", "/public/snack/nuts.png", [
  { title_en: "Peanuts",  title_ar: "فول سوداني", expression_en: "I want peanuts",  expression_ar: "أريد فول سوداني", imgUrl: "/public/Food and Drink/peanuts.png" },
  { title_en: "Almonds",  title_ar: "لوز",         expression_en: "I want almonds",  expression_ar: "أريد لوز",         imgUrl: "/public/Food and Drink/lmonds.png" },
  { title_en: "Cashews",  title_ar: "كاجو",         expression_en: "I want cashews",  expression_ar: "أريد كاجو",         imgUrl: "/public/Food and Drink/cashews.png" },
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
   { title_en: "Tea with Milk", title_ar: "شاي بلبن",    expression_en: "I want tea with milk", expression_ar: "أريد شاي بلبن",    imgUrl: "/public/Food and Drink/milk_tea.png" },
  { title_en: "Green Tea",     title_ar: "شاي أخضر",   expression_en: "I want green tea",     expression_ar: "أريد شاي أخضر",   imgUrl: "/public/Food and Drink/green_tea.png" },
  { title_en: "Red Tea",       title_ar: "شاي أحمر",   expression_en: "I want red tea",       expression_ar: "أريد شاي أحمر",   imgUrl: "/public/Food and Drink/red_tea.png" },
]);

const snackCoffeeChoices = createGroup("Snack", "/public/snack/coffee.png", [
   { title_en: "Black Coffee",      title_ar: "قهوة سادة",   expression_en: "I want black coffee",      expression_ar: "أريد قهوة سادة",   imgUrl: "/public/Food and Drink/dark_coffee.png" },
  { title_en: "Coffee with Milk",  title_ar: "قهوة بلبن",   expression_en: "I want coffee with milk",  expression_ar: "أريد قهوة بلبن",   imgUrl: "/public/Food and Drink/coffee_with_milk.png" },
  { title_en: "Nescafe",           title_ar: "نسكافيه",      expression_en: "I want nescafe",           expression_ar: "أريد نسكافيه",     imgUrl: "/public/Food and Drink/nescafee.png" },
  { title_en: "Iced Coffee",      title_ar: "قهوة مثلجة",  expression_en: "I want iced coffee",      expression_ar: "أريد قهوة مثلجة",  imgUrl: "/public/Food and Drink/iced_coffee.png" },
]);

// ─────────────────────────────────────────────
// FAMILY
// ─────────────────────────────────────────────
const familyMotherChoices = createGroup("Family", "/public/Family/3.png", [
  { title_en: "Mother's Mother",  title_ar: "جدة من ناحية الأم",  expression_en: "This is my mother's mother",  expression_ar: "هذه جدتي من ناحية الأم",  imgUrl: "/public/Family/mothers_mother.png" },
  { title_en: "Mother's Father",  title_ar: "جد من ناحية الأم",   expression_en: "This is my mother's father",  expression_ar: "هذا جدي من ناحية الأم",   imgUrl: "/public/Family/mothers_father.png" },
  { title_en: "Mother's Sister",  title_ar: "خالة",               expression_en: "This is my mother's sister",  expression_ar: "هذه خالتي",               imgUrl: "/public/Family/mothers_sister.png" },
  { title_en: "Mother's Brother", title_ar: "خال",                expression_en: "This is my mother's brother", expression_ar: "هذا خالي",                imgUrl: "/public/Family/mothers_brother.png" },
]);

const familyFatherChoices = createGroup("Family", "/public/Family/4.png", [
  { title_en: "Father's Mother",  title_ar: "جدة من ناحية الأب",  expression_en: "This is my father's mother",  expression_ar: "هذه جدتي من ناحية الأب",  imgUrl: "/public/Family/fathers_mother.png" },
  { title_en: "Father's Father",  title_ar: "جد من ناحية الأب",   expression_en: "This is my father's father",  expression_ar: "هذا جدي من ناحية الأب",   imgUrl: "/public/Family/fathers_father.png" },
  { title_en: "Father's Sister",  title_ar: "عمة",                expression_en: "This is my father's sister",  expression_ar: "هذه عمتي",                imgUrl: "/public/Family/fathers_sister.png" },
  { title_en: "Father's Brother", title_ar: "عم",                 expression_en: "This is my father's brother", expression_ar: "هذا عمي",                 imgUrl: "/public/Family/fathers_brother.png" },
]);

const familyBrotherChoices = createGroup("Family", "/public/Family/7.png", [
  { title_en: "Older Brother",  title_ar: "أخ كبير",  expression_en: "This is my older brother",  expression_ar: "هذا أخي الكبير",  imgUrl: "/public/Family/793.png" },
  { title_en: "Younger Brother", title_ar: "أخ صغير", expression_en: "This is my younger brother", expression_ar: "هذا أخي الصغير", imgUrl: "/public/Family/993.png" },
  { title_en: "Twin Brother",   title_ar: "أخ توأم",  expression_en: "This is my twin brother",   expression_ar: "هذا أخي التوأم",  imgUrl: "/public/Family/663.png" },
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
  { title_en: "Happy with Family",       title_ar: "فرحان مع العيلة",        expression_en: "I am happy with my family",       expression_ar: "أنا فرحان مع عيلتي",        imgUrl: "/public/icons/Familyy.png" },
  { title_en: "Happy because I Played",  title_ar: "فرحان عشان لعبت",        expression_en: "I am happy because I played",     expression_ar: "أنا فرحان عشان لعبت",        imgUrl: "/public/icons/Playy.png" },
  { title_en: "Happy because I Ate",     title_ar: "فرحان عشان أكلت",        expression_en: "I am happy because I ate",        expression_ar: "أنا فرحان عشان أكلت",        imgUrl: "/public/icons/Eating.png" },
]);

const feelingsAngryChoices = createGroup("Feelings", "/public/Feelings/3.png", [
  { title_en: "Angry from Noise",    title_ar: "متضايق من الصوت",      expression_en: "I am angry because of the noise",           expression_ar: "أنا متضايق من الصوت",        imgUrl: "/public/icons/Alert.png" },
  { title_en: "Angry from Waiting",  title_ar: "متضايق من الانتظار",   expression_en: "I am angry because I waited too long",      expression_ar: "أنا متضايق من الانتظار",     imgUrl: "/public/icons/time.png" },
  { title_en: "Angry from Someone",  title_ar: "متضايق من شخص",        expression_en: "I am angry because someone bothered me",    expression_ar: "أنا متضايق لأن حد ضايقني",  imgUrl: "/public/icons/Conversation.png" },
]);

const feelingsAfraidChoices = createGroup("Feelings", "/public/Feelings/4.png", [
  { title_en: "Afraid of Insects",    title_ar: "خايف من الحشرات",       expression_en: "I am afraid of insects",     expression_ar: "أنا خايف من الحشرات",       imgUrl: "/public/Animals/7shraat.png" },
  { title_en: "Afraid of Darkness",   title_ar: "خايف من الضلمة",        expression_en: "I am afraid of the dark",    expression_ar: "أنا خايف من الضلمة",        imgUrl: "/public/sleeping/night-lamp.png" },
  { title_en: "Afraid of Loud Sound", title_ar: "خايف من الصوت العالي",  expression_en: "I am afraid of loud sounds", expression_ar: "أنا خايف من الصوت العالي",  imgUrl: "/public/listen/Alert.png" },
  { title_en: "Afraid of Dogs",       title_ar: "خايف من الكلاب",        expression_en: "I am afraid of dogs",        expression_ar: "أنا خايف من الكلاب",        imgUrl: "/public/Animals/Dog.png" },
]);

const feelingsTiredChoices = createGroup("Feelings", "/public/Feelings/5.png", [
  { title_en: "Tired after School",  title_ar: "تعبان بعد المدرسة",  expression_en: "I am tired after school",         expression_ar: "أنا تعبان بعد المدرسة",  imgUrl: "/public/icons/school.png" },
  { title_en: "Tired from Walking",  title_ar: "تعبان من المشي",     expression_en: "I am tired from walking",         expression_ar: "أنا تعبان من المشي",     imgUrl: "/public/icons/Walkk.png" },
  { title_en: "Need to Sleep",       title_ar: "عايز أنام",           expression_en: "I am tired and need to sleep",    expression_ar: "أنا تعبان وعايز أنام",   imgUrl: "/public/sleeping/bed.png" },
]);

const feelingsExcitedChoices = createGroup("Feelings", "/public/Feelings/6.png", [
  { title_en: "Excited to Go Out",   title_ar: "متحمس للخروج",         expression_en: "I am excited to go out",       expression_ar: "أنا متحمس للخروج",         imgUrl: "/public/icons/outside.png" },
  { title_en: "Excited to Play",     title_ar: "متحمس للعب",           expression_en: "I am excited to play",         expression_ar: "أنا متحمس للعب",           imgUrl: "/public/icons/Playy.png" },
  { title_en: "Excited for Birthday",title_ar: "متحمس لعيد الميلاد",   expression_en: "I am excited for the birthday",expression_ar: "أنا متحمس لعيد الميلاد",   imgUrl: "/public/icons/Excited.png" },
]);

const feelingsRelaxedChoices = createGroup("Feelings", "/public/Feelings/8.png", [
  { title_en: "Relaxed at Home",      title_ar: "مرتاح في البيت",      expression_en: "I am relaxed at home",         expression_ar: "أنا مرتاح في البيت",      imgUrl: "/public/Places/home.png" },
  { title_en: "Relaxed with Music",   title_ar: "مرتاح مع الموسيقى",   expression_en: "I am relaxed with music",      expression_ar: "أنا مرتاح مع الموسيقى",   imgUrl: "/public/Music/music-notes.png" },
  { title_en: "Relaxed after Shower", title_ar: "مرتاح بعد الشاور",    expression_en: "I am relaxed after a shower",  expression_ar: "أنا مرتاح بعد الشاور",    imgUrl: "/public/icons/Shower.png" },
]);

const feelingsAnxiousChoices = createGroup("Feelings", "/public/Feelings/9.png", [
  { title_en: "Anxious in a New Place", title_ar: "قلقان من مكان جديد",  expression_en: "I am anxious in a new place",        expression_ar: "أنا قلقان من مكان جديد",  imgUrl: "/public/icons/Places.png" },
  { title_en: "Anxious from Crowds",    title_ar: "قلقان من الزحمة",     expression_en: "I am anxious because of crowds",     expression_ar: "أنا قلقان من الزحمة",     imgUrl: "/public/icons/crowded.png" },
  { title_en: "Anxious from an Exam",   title_ar: "قلقان من الامتحان",   expression_en: "I am anxious about the exam",        expression_ar: "أنا قلقان من الامتحان",   imgUrl: "/public/icons/exam.png" },
]);

const feelingsConfusedChoices = createGroup("Feelings", "/public/Feelings/10.png", [
  { title_en: "I Do Not Understand", title_ar: "أنا مش فاهم",    expression_en: "I am confused because I do not understand",        expression_ar: "أنا محتار لأني مش فاهم",           imgUrl: "/public/icons/not_understanding.png" },
  { title_en: "Too Many Choices",    title_ar: "اختيارات كتير",  expression_en: "I am confused because there are too many choices",  expression_ar: "أنا محتار لأن في اختيارات كتير",  imgUrl: "/public/icons/many_choices.png" },
  { title_en: "Need Help",           title_ar: "محتاج مساعدة",   expression_en: "I am confused and need help",                      expression_ar: "أنا محتار ومحتاج مساعدة",          imgUrl: "/public/icons/need_help.png" },
]);

const feelingsFrustratedChoices = createGroup("Feelings", "/public/Feelings/11.png", [
  { title_en: "Cannot Explain",       title_ar: "مش عارف أشرح",    expression_en: "I am frustrated because I cannot explain",       expression_ar: "أنا محبط لأني مش عارف أشرح",    imgUrl: "/public/icons/canno_explain.png" },
  { title_en: "Device Is Not Working",title_ar: "الجهاز مش شغال",  expression_en: "I am frustrated because the device is not working",expression_ar: "أنا محبط لأن الجهاز مش شغال",  imgUrl: "/public/icons/Computer.png" },
  { title_en: "Task Is Hard",         title_ar: "المهمة صعبة",      expression_en: "I am frustrated because the task is hard",        expression_ar: "أنا محبط لأن المهمة صعبة",       imgUrl: "/public/icons/task.png" },
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
  { title_en: "To Learn",           title_ar: "عشان أتعلم",          expression_en: "I want to go to school to learn",          expression_ar: "أريد الذهاب إلى المدرسة عشان أتعلم",          imgUrl: "/public/icons/learn.png" },
  { title_en: "To Meet My Friends", title_ar: "عشان أشوف صحابي",    expression_en: "I want to go to school to meet my friends",expression_ar: "أريد الذهاب إلى المدرسة عشان أشوف صحابي",    imgUrl: "/public/icons/Friend.png" },
  { title_en: "To Attend Class",    title_ar: "عشان أحضر الحصة",    expression_en: "I want to go to school to attend class",   expression_ar: "أريد الذهاب إلى المدرسة عشان أحضر الحصة",    imgUrl: "/public/icons/attend_class.png" },
  { title_en: "To Play",            title_ar: "عشان ألعب",           expression_en: "I want to go to school to play",           expression_ar: "أريد الذهاب إلى المدرسة عشان ألعب",           imgUrl: "/public/icons/Playy.png" },
]);

const parkReasonChoices = createGroup("places", "/public/Places/park.png", [
  { title_en: "To Play",         title_ar: "عشان ألعب",        expression_en: "I want to go to the park to play",        expression_ar: "أريد الذهاب إلى الحديقة عشان ألعب",        imgUrl: "/public/icons/Playy.png" },
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
  { title_en: "To Buy Food",   title_ar: "عشان أشتري أكل",   expression_en: "I want to go to the supermarket to buy food",   expression_ar: "أريد الذهاب إلى السوبرماركت عشان أشتري أكل",   imgUrl: "/public/icons/food.png" },
  { title_en: "To Buy Bread",  title_ar: "عشان أشتري عيش",   expression_en: "I want to go to the supermarket to buy bread",  expression_ar: "أريد الذهاب إلى السوبرماركت عشان أشتري عيش",   imgUrl: "/public/icons/bread.png" },
  { title_en: "To Buy Snacks", title_ar: "عشان أشتري سناكس", expression_en: "I want to go to the supermarket to buy snacks", expression_ar: "أريد الذهاب إلى السوبرماركت عشان أشتري سناكس", imgUrl: "/public/icons/snacks.png" },
]);

const universityReasonChoices = createGroup("places", "/public/Places/university.png", [
  { title_en: "To Study",      title_ar: "عشان أذاكر",       expression_en: "I want to go to the university to study",      expression_ar: "أريد الذهاب إلى الجامعة عشان أذاكر",       imgUrl: "/public/icons/study.png" },
  { title_en: "For a Lecture", title_ar: "عشان المحاضرة",    expression_en: "I want to go to the university for a lecture", expression_ar: "أريد الذهاب إلى الجامعة عشان المحاضرة",    imgUrl: "/public/icons/lecture.png" },
  { title_en: "For an Exam",   title_ar: "عشان الامتحان",    expression_en: "I want to go to the university for an exam",   expression_ar: "أريد الذهاب إلى الجامعة عشان الامتحان",    imgUrl: "/public/icons/examm.png" },
]);

const workReasonChoices = createGroup("places", "/public/Places/work.png", [
  { title_en: "To Work",             title_ar: "عشان أشتغل",        expression_en: "I want to go to work",                         expression_ar: "أريد الذهاب إلى العمل عشان أشتغل",          imgUrl: "/public/icons/work.png" },
  { title_en: "To Meet Colleagues",  title_ar: "عشان أقابل زمايلي", expression_en: "I want to go to work to meet my colleagues",    expression_ar: "أريد الذهاب إلى العمل عشان أقابل زمايلي",   imgUrl: "/public/icons/Friend.png" },
  { title_en: "To Finish My Task",   title_ar: "عشان أخلص شغلي",   expression_en: "I want to go to work to finish my task",        expression_ar: "أريد الذهاب إلى العمل عشان أخلص شغلي",      imgUrl: "/public/icons/finishworking.png" },
]);

const busStationReasonChoices = createGroup("places", "/public/Places/busstation.png", [
  { title_en: "To Travel",      title_ar: "عشان أسافر",        expression_en: "I want to go to the bus station to travel",   expression_ar: "أريد الذهاب إلى محطة الأتوبيس عشان أسافر",       imgUrl: "/public/icons/travel.png" },
  { title_en: "To Ride the Bus",title_ar: "عشان أركب الباص",   expression_en: "I want to go to the bus station to ride the bus",expression_ar: "أريد الذهاب إلى محطة الأتوبيس عشان أركب الباص", imgUrl: "/public/icons/bus.png" },
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
export const plantAnatomyChoices = createGroup("Plant", "/public/plants/anatomy.png", [
  { title_en: "Root",   title_ar: "جذر",   expression_en: "Plant root",   expression_ar: "جذر النبات",   imgUrl: "/public/plants/root.png" },
  { title_en: "Stem",   title_ar: "ساق",   expression_en: "Plant stem",   expression_ar: "ساق النبات",   imgUrl: "/public/plants/stem.png" },
  { title_en: "Leaf",   title_ar: "ورقة",  expression_en: "Plant leaf",   expression_ar: "ورقة النبات",  imgUrl: "/public/plants/leaf.png" },
  { title_en: "Flower", title_ar: "زهرة",  expression_en: "Plant flower", expression_ar: "زهرة النبات",  imgUrl: "/public/plants/flower.png" },
  { title_en: "Fruit",  title_ar: "ثمرة",  expression_en: "Plant fruit",  expression_ar: "ثمرة النبات",  imgUrl: "/public/plants/fruit.png" },
]);
export const plantPhysiologyChoices = createGroup("Plant", "/public/plants/physiology.png", [
  { title_en: "Photosynthesis", title_ar: "تمثيل ضوئي", expression_en: "Plant makes food", expression_ar: "النبات يصنع الغذاء", imgUrl: "/public/plants/photosynthesis.png" },
  { title_en: "Water", title_ar: "ماء", expression_en: "Plant needs water", expression_ar: "النبات يحتاج ماء", imgUrl: "/public/plants/water.png" },
  { title_en: "Growth", title_ar: "نمو", expression_en: "Plant grows", expression_ar: "النبات ينمو", imgUrl: "/public/plants/growth.png" },
  { title_en: "Sunlight", title_ar: "شمس", expression_en: "Plant needs sunlight", expression_ar: "النبات يحتاج الشمس", imgUrl: "/public/plants/sun.png" },
]);
export const plantClassificationChoices = createGroup("Plant", "/public/plants/classification.png", [
  { title_en: "Tree",   title_ar: "شجرة",   expression_en: "This is a tree",   expression_ar: "هذه شجرة",   imgUrl: "/public/plants/tree.png" },
  { title_en: "Bush",   title_ar: "شجيرة",  expression_en: "This is a bush",   expression_ar: "هذه شجيرة",  imgUrl: "/public/plants/bush.png" },
  { title_en: "Cactus", title_ar: "صبار",   expression_en: "This is a cactus", expression_ar: "هذا صبار",   imgUrl: "/public/plants/cactus.png" },
  { title_en: "Fungus", title_ar: "فطر",    expression_en: "This is a fungus", expression_ar: "هذا فطر",    imgUrl: "/public/plants/fungus.png" },
]);
export const plantTypesChoices = createGroup("Plant", "/public/plants/types.png", [
  { title_en: "Flower",           title_ar: "زهرة",      expression_en: "This is a flower",           expression_ar: "هذه زهرة",      imgUrl: "/public/plants/flower.png" },
  { title_en: "Aromatic plant",   title_ar: "نبات عطري", expression_en: "This is an aromatic plant",  expression_ar: "هذا نبات عطري", imgUrl: "/public/plants/aromatic.png" },
  { title_en: "Herbaceous plant", title_ar: "نبات عشبي", expression_en: "This is a herb plant",       expression_ar: "هذا نبات عشبي", imgUrl: "/public/plants/herb.png" },
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
export const educationActivityChoices = createGroup("Teaching activity", "/public/education/activity.png", [
  { title_en: "Explain lesson", title_ar: "شرح الدرس", expression_en: "Explain the lesson", expression_ar: "اشرح الدرس", imgUrl: "/public/education/explain.png" },
  { title_en: "Ask question", title_ar: "طرح سؤال", expression_en: "Ask a question", expression_ar: "اطرح سؤال", imgUrl: "/public/education/question.png" },
  { title_en: "Answer", title_ar: "إجابة", expression_en: "Answer the question", expression_ar: "أجب على السؤال", imgUrl: "/public/education/answer.png" },
  { title_en: "Discuss", title_ar: "مناقشة", expression_en: "Discuss together", expression_ar: "ناقش مع الآخرين", imgUrl: "/public/education/discuss.png" },
]);
export const educationSubjectChoices = createGroup("Subject", "/public/education/subject.png", [
  { title_en: "Math", title_ar: "رياضيات", expression_en: "Study math", expression_ar: "ادرس الرياضيات", imgUrl: "/public/education/math.png" },
  { title_en: "Science", title_ar: "علوم", expression_en: "Study science", expression_ar: "ادرس العلوم", imgUrl: "/public/education/science.png" },
  { title_en: "English", title_ar: "إنجليزي", expression_en: "Study English", expression_ar: "ادرس الإنجليزية", imgUrl: "/public/education/english.png" },
  { title_en: "History", title_ar: "تاريخ", expression_en: "Study history", expression_ar: "ادرس التاريخ", imgUrl: "/public/education/history.png" },
]);
export const educationInstitutionChoices = createGroup("Institution", "/public/education/institution.png", [
  { title_en: "School", title_ar: "مدرسة", expression_en: "Go to school", expression_ar: "اذهب إلى المدرسة", imgUrl: "/public/education/school.png" },
  { title_en: "University", title_ar: "جامعة", expression_en: "Go to university", expression_ar: "اذهب إلى الجامعة", imgUrl: "/public/education/university.png" },
  { title_en: "Training center", title_ar: "مركز تدريب", expression_en: "Go to training center", expression_ar: "اذهب إلى مركز التدريب", imgUrl: "/public/education/training.png" },
]);
export const educationTaskChoices = createGroup("Task", "/public/education/task.png", [
  { title_en: "Homework", title_ar: "واجب", expression_en: "Do homework", expression_ar: "اعمل الواجب", imgUrl: "/public/education/homework.png" },
  { title_en: "Exam", title_ar: "امتحان", expression_en: "Take exam", expression_ar: "أدخل الامتحان", imgUrl: "/public/education/exam.png" },
  { title_en: "Assignment", title_ar: "تكليف", expression_en: "Complete assignment", expression_ar: "أنهِ التكليف", imgUrl: "/public/education/assignment.png" },
]);
export const educationMaterialChoices = createGroup("Material", "/public/education/material.png", [
  { title_en: "Book", title_ar: "كتاب", expression_en: "Use book", expression_ar: "استخدم الكتاب", imgUrl: "/public/education/book.png" },
  { title_en: "Notebook", title_ar: "كراسة", expression_en: "Write in notebook", expression_ar: "اكتب في الكراسة", imgUrl: "/public/education/notebook.png" },
  { title_en: "Worksheet", title_ar: "ورقة عمل", expression_en: "Solve worksheet", expression_ar: "حل ورقة العمل", imgUrl: "/public/education/worksheet.png" },
]);
export const educationEquipmentChoices = createGroup("Equipment", "/public/education/equipment.png", [
  { title_en: "Pen", title_ar: "قلم", expression_en: "Use pen", expression_ar: "استخدم القلم", imgUrl: "/public/education/pen.png" },
  { title_en: "Laptop", title_ar: "لاب توب", expression_en: "Use laptop", expression_ar: "استخدم اللاب توب", imgUrl: "/public/education/laptop.png" },
  { title_en: "Projector", title_ar: "بروجكتور", expression_en: "Use projector", expression_ar: "استخدم البروجكتور", imgUrl: "/public/education/projector.png" },
]);
export const educationSpaceChoices = createGroup("Space", "/public/education/space.png", [
  { title_en: "Classroom", title_ar: "فصل", expression_en: "Go to classroom", expression_ar: "اذهب إلى الفصل", imgUrl: "/public/education/classroom.png" },
  { title_en: "Library", title_ar: "مكتبة", expression_en: "Go to library", expression_ar: "اذهب إلى المكتبة", imgUrl: "/public/education/library.png" },
  { title_en: "Lab", title_ar: "معمل", expression_en: "Go to lab", expression_ar: "اذهب إلى المعمل", imgUrl: "/public/education/lab.png" },
]);
export const educationStaffChoices = createGroup("Staff", "/public/education/staff.png", [
  { title_en: "Teacher", title_ar: "مدرس", expression_en: "Talk to teacher", expression_ar: "تحدث مع المدرس", imgUrl: "/public/education/teacher.png" },
  { title_en: "Assistant", title_ar: "مساعد", expression_en: "Ask assistant", expression_ar: "اسأل المساعد", imgUrl: "/public/education/assistant.png" },
  { title_en: "Principal", title_ar: "مدير", expression_en: "Meet principal", expression_ar: "قابل المدير", imgUrl: "/public/education/principal.png" },
]);
export const educationStudentsChoices = createGroup("Students", "/public/education/students.png", [
  { title_en: "Classmate", title_ar: "زميل", expression_en: "Talk to classmate", expression_ar: "تحدث مع زميل", imgUrl: "/public/education/classmate.png" },
  { title_en: "Group work", title_ar: "عمل جماعي", expression_en: "Work in group", expression_ar: "اعمل في مجموعة", imgUrl: "/public/education/group.png" },
]);
export const educationMethodChoices = createGroup("Methodology", "/public/education/method.png", [
  { title_en: "Explain", title_ar: "شرح", expression_en: "Explain clearly", expression_ar: "اشرح بوضوح", imgUrl: "/public/education/explain.png" },
  { title_en: "Practice", title_ar: "تدريب", expression_en: "Practice more", expression_ar: "تدرب أكثر", imgUrl: "/public/education/practice.png" },
  { title_en: "Review", title_ar: "مراجعة", expression_en: "Review lesson", expression_ar: "راجع الدرس", imgUrl: "/public/education/review.png" },
]);
export const educationVocabChoices = createGroup("Core vocabulary", "/public/education/vocab.png", [
  { title_en: "Read", title_ar: "اقرأ", expression_en: "Read the text", expression_ar: "اقرأ النص", imgUrl: "/public/education/read.png" },
  { title_en: "Write", title_ar: "اكتب", expression_en: "Write the answer", expression_ar: "اكتب الإجابة", imgUrl: "/public/education/write.png" },
  { title_en: "Listen", title_ar: "استمع", expression_en: "Listen carefully", expression_ar: "استمع جيدًا", imgUrl: "/public/education/listen.png" },
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
const showerChoices = createGroup("Shower", "/public/icons/Shower.png", [
  {
    title_en: "Turn on water",
    title_ar: "فتح الماء",
    expression_en: "Turn on the water",
    expression_ar: "افتح الماء",
    imgUrl: "/public/icons/TurnOnWater.png"
  },
  {
    title_en: "Use soap",
    title_ar: "استخدم الصابون",
    expression_en: "Use soap",
    expression_ar: "استخدم الصابون",
    imgUrl: "/public/icons/Soap.png"
  },
  {
    title_en: "Wash body",
    title_ar: "غسل الجسم",
    expression_en: "Wash your body",
    expression_ar: "اغسل جسمك",
    imgUrl: "/public/icons/WashBody.png"
  },
  {
    title_en: "Use towel",
    title_ar: "استخدام المنشفة",
    expression_en: "Dry with towel",
    expression_ar: "جفف بالمنشفة",
    imgUrl: "/public/icons/Towel.png"
  }
]);
const toiletChoices = createGroup("Toilet", "/public/icons/Toilet.png", [
  {
    title_en: "Sit",
    title_ar: "اجلس",
    expression_en: "Sit on the toilet",
    expression_ar: "اجلس على المرحاض",
    imgUrl: "/public/icons/Sit.png"
  },
  {
    title_en: "Flush",
    title_ar: "سحب السيفون",
    expression_en: "Flush the toilet",
    expression_ar: "اسحب السيفون",
    imgUrl: "/public/icons/Flush.png"
  },
  {
    title_en: "Use toilet paper",
    title_ar: "استخدام ورق التواليت",
    expression_en: "Use toilet paper",
    expression_ar: "استخدم ورق التواليت",
    imgUrl: "/public/icons/ToiletPaper.png"
  },
  {
    title_en: "Clean",
    title_ar: "تنظيف",
    expression_en: "Clean yourself",
    expression_ar: "نظف نفسك",
    imgUrl: "/public/icons/Clean.png"
  }
]);
const brushTeethChoices = createGroup("Brush Teeth", "/public/icons/BrushTeeth.png", [
  {
    title_en: "Toothbrush",
    title_ar: "فرشاة أسنان",
    expression_en: "Use toothbrush",
    expression_ar: "استخدم الفرشاة",
    imgUrl: "/public/icons/Toothbrush.png"
  },
  {
    title_en: "Toothpaste",
    title_ar: "معجون أسنان",
    expression_en: "Put toothpaste",
    expression_ar: "ضع المعجون",
    imgUrl: "/public/icons/Toothpaste.png"
  },
  {
    title_en: "Brush teeth",
    title_ar: "تنظيف الأسنان",
    expression_en: "Brush your teeth",
    expression_ar: "نظف أسنانك",
    imgUrl: "/public/icons/BrushTeeth.png"
  },
  {
    title_en: "Rinse",
    title_ar: "مضمضة",
    expression_en: "Rinse your mouth",
    expression_ar: "تمضمض",
    imgUrl: "/public/icons/Rinse.png"
  }
]);
const washHandsChoices = createGroup("Wash Hands", "/public/icons/WashHands.png", [
  {
    title_en: "Turn on water",
    title_ar: "فتح الماء",
    expression_en: "Turn on the water",
    expression_ar: "افتح الماء",
    imgUrl: "/public/icons/TurnOnWater.png"
  },
  {
    title_en: "Use soap",
    title_ar: "استخدم الصابون",
    expression_en: "Use soap",
    expression_ar: "استخدم الصابون",
    imgUrl: "/public/icons/Soap.png"
  },
  {
    title_en: "Wash hands",
    title_ar: "غسل اليدين",
    expression_en: "Wash your hands",
    expression_ar: "اغسل يديك",
    imgUrl: "/public/icons/WashHands.png"
  },
  {
    title_en: "Dry hands",
    title_ar: "تجفيف اليدين",
    expression_en: "Dry your hands",
    expression_ar: "جفف يديك",
    imgUrl: "/public/icons/Towel.png"
  }
]);
const leisureSportsChoices = createGroup("Sports", "/public/leisure/sport.png", [
  { title_en: "Football", title_ar: "كرة القدم", expression_en: "I want to play football", expression_ar: "أريد لعب كرة القدم", imgUrl: "/public/leisure/sports/football.png" },
  { title_en: "Basketball", title_ar: "كرة السلة", expression_en: "I want to play basketball", expression_ar: "أريد لعب كرة السلة", imgUrl: "/public/leisure/sports/basketball.png" },
  { title_en: "Swimming", title_ar: "السباحة", expression_en: "I want to swim", expression_ar: "أريد السباحة", imgUrl: "/public/leisure/sports/swimming.png" },
  { title_en: "Running", title_ar: "الجري", expression_en: "I want to run", expression_ar: "أريد الجري", imgUrl: "/public/leisure/sports/running.png" },
  { title_en: "Cycling", title_ar: "ركوب الدراجة", expression_en: "I want to ride a bicycle", expression_ar: "أريد ركوب الدراجة", imgUrl: "/public/leisure/sports/cycling.png" },

  { title_en: "Tennis", title_ar: "تنس", expression_en: "I want to play tennis", expression_ar: "أريد لعب التنس", imgUrl: "/public/leisure/sports/tennis.png" },
  { title_en: "Volleyball", title_ar: "الكرة الطائرة", expression_en: "I want to play volleyball", expression_ar: "أريد لعب الكرة الطائرة", imgUrl: "/public/leisure/sports/volleyball.png" },
  { title_en: "Gym", title_ar: "الجيم", expression_en: "I want to go to the gym", expression_ar: "أريد الذهاب إلى الجيم", imgUrl: "/public/leisure/sports/gym.png" },
  { title_en: "Yoga", title_ar: "يوغا", expression_en: "I want to do yoga", expression_ar: "أريد ممارسة اليوغا", imgUrl: "/public/leisure/sports/yoga.png" },
  { title_en: "Boxing", title_ar: "الملاكمة", expression_en: "I want to box", expression_ar: "أريد ممارسة الملاكمة", imgUrl: "/public/leisure/sports/boxing.png" },

  { title_en: "Karate", title_ar: "كاراتيه", expression_en: "I want to do karate", expression_ar: "أريد ممارسة الكاراتيه", imgUrl: "/public/leisure/sports/karate.png" },
  { title_en: "Skating", title_ar: "التزلج", expression_en: "I want to skate", expression_ar: "أريد التزلج", imgUrl: "/public/leisure/sports/skating.png" },
  { title_en: "Dancing", title_ar: "الرقص", expression_en: "I want to dance", expression_ar: "أريد الرقص", imgUrl: "/public/leisure/sports/dancing.png" },
  { title_en: "Hiking", title_ar: "المشي في الطبيعة", expression_en: "I want to go hiking", expression_ar: "أريد المشي في الطبيعة", imgUrl: "/public/leisure/sports/hiking.png" },
  { title_en: "Horse Riding", title_ar: "ركوب الخيل", expression_en: "I want to ride a horse", expression_ar: "أريد ركوب الخيل", imgUrl: "/public/leisure/sports/horseriding.png" },

  { title_en: "Table Tennis", title_ar: "بينج بونج", expression_en: "I want to play table tennis", expression_ar: "أريد لعب بينج بونج", imgUrl: "/public/leisure/sports/tabletennis.png" },
  { title_en: "Badminton", title_ar: "بادمينتون", expression_en: "I want to play badminton", expression_ar: "أريد لعب البادمينتون", imgUrl: "/public/leisure/sports/badminton.png" },
  { title_en: "Surfing", title_ar: "التزلج على الماء", expression_en: "I want to surf", expression_ar: "أريد التزلج على الماء", imgUrl: "/public/leisure/sports/surfing.png" },
  { title_en: "Archery", title_ar: "الرماية", expression_en: "I want to do archery", expression_ar: "أريد ممارسة الرماية", imgUrl: "/public/leisure/sports/archery.png" },
  { title_en: "Gymnastics", title_ar: "الجمباز", expression_en: "I want to do gymnastics", expression_ar: "أريد ممارسة الجمباز", imgUrl: "/public/leisure/sports/gymnastics.png" },
]);
const leisureGamesChoices = createGroup("Games", "/public/leisure/games.png", [
  {
    title_en: "Board Games",
    title_ar: "ألعاب لوحية",
    expression_en: "I want to play board games",
    expression_ar: "أريد لعب ألعاب لوحية",
    imgUrl: "/public/leisure/games/boardgames.png"
  },
  {
    title_en: "Card Games",
    title_ar: "ألعاب ورق",
    expression_en: "I want to play card games",
    expression_ar: "أريد لعب ألعاب الورق",
    imgUrl: "/public/leisure/games/cards.png"
  },
  {
    title_en: "Puzzle",
    title_ar: "ألغاز",
    expression_en: "I want to do a puzzle",
    expression_ar: "أريد حل لغز",
    imgUrl: "/public/leisure/games/puzzle.png"
  },
  {
    title_en: "Chess",
    title_ar: "شطرنج",
    expression_en: "I want to play chess",
    expression_ar: "أريد لعب الشطرنج",
    imgUrl: "/public/leisure/games/chess.png"
  },
  {
    title_en: "Domino",
    title_ar: "دومينو",
    expression_en: "I want to play domino",
    expression_ar: "أريد لعب الدومينو",
    imgUrl: "/public/leisure/games/domino.png"
  },
  {
    title_en: "Ludo",
    title_ar: "لعبة لودو",
    expression_en: "I want to play Ludo",
    expression_ar: "أريد لعب لودو",
    imgUrl: "/public/leisure/games/ludo.png"
  },
  {
    title_en: "Tic Tac Toe",
    title_ar: "إكس أو",
    expression_en: "I want to play tic tac toe",
    expression_ar: "أريد لعب إكس أو",
    imgUrl: "/public/leisure/games/tictactoe.png"
  },
  {
    title_en: "Memory Game",
    title_ar: "لعبة الذاكرة",
    expression_en: "I want to play memory game",
    expression_ar: "أريد لعب لعبة الذاكرة",
    imgUrl: "/public/leisure/games/memory.png"
  },
  {
    title_en: "Video Games",
    title_ar: "ألعاب فيديو",
    expression_en: "I want to play video games",
    expression_ar: "أريد لعب ألعاب فيديو",
    imgUrl: "/public/leisure/videogame.png"
  }
]);
const leisureVideoGamesChoices = createGroup("Video Games", "/public/leisure/videogame.png", [
  {
    title_en: "Car Racing",
    title_ar: "سباق سيارات",
    expression_en: "I want to play car racing",
    expression_ar: "أريد لعب سباق سيارات",
    imgUrl: "/public/leisure/videogames/racing.png"
  },
  {
    title_en: "Football Game",
    title_ar: "لعبة كرة قدم",
    expression_en: "I want to play football game",
    expression_ar: "أريد لعب لعبة كرة قدم",
    imgUrl: "/public/leisure/videogames/football.png"
  },
  {
    title_en: "Adventure Game",
    title_ar: "لعبة مغامرات",
    expression_en: "I want to play adventure games",
    expression_ar: "أريد لعب ألعاب مغامرات",
    imgUrl: "/public/leisure/videogames/adventure.png"
  },
  {
    title_en: "Action Game",
    title_ar: "لعبة أكشن",
    expression_en: "I want to play action games",
    expression_ar: "أريد لعب ألعاب أكشن",
    imgUrl: "/public/leisure/videogames/action.png"
  },
  {
    title_en: "Puzzle Game",
    title_ar: "لعبة ألغاز",
    expression_en: "I want to play puzzle games",
    expression_ar: "أريد لعب ألعاب ألغاز",
    imgUrl: "/public/leisure/videogames/puzzle.png"
  }
]);
const leisureBeachChoices = createGroup("Beach", "/public/leisure/beach.png", [
  {
    title_en: "Swimming",
    title_ar: "سباحة",
    expression_en: "I want to swim",
    expression_ar: "أريد السباحة",
    imgUrl: "/public/leisure/beach/swimming.png"
  },
  {
    title_en: "Sunbathing",
    title_ar: "التشمس",
    expression_en: "I want to sunbathe",
    expression_ar: "أريد التشمس",
    imgUrl: "/public/leisure/beach/sunbathing.png"
  },
  {
    title_en: "Play in sand",
    title_ar: "اللعب في الرمل",
    expression_en: "I want to play in the sand",
    expression_ar: "أريد اللعب في الرمل",
    imgUrl: "/public/leisure/beach/sand.png"
  },
  {
    title_en: "Build sandcastle",
    title_ar: "بناء قلعة رملية",
    expression_en: "I want to build a sandcastle",
    expression_ar: "أريد بناء قلعة رملية",
    imgUrl: "/public/leisure/beach/sandcastle.png"
  },
  {
    title_en: "Collect shells",
    title_ar: "جمع الأصداف",
    expression_en: "I want to collect shells",
    expression_ar: "أريد جمع الأصداف",
    imgUrl: "/public/leisure/beach/shells.png"
  },
  {
    title_en: "Walk on beach",
    title_ar: "المشي على الشاطئ",
    expression_en: "I want to walk on the beach",
    expression_ar: "أريد المشي على الشاطئ",
    imgUrl: "/public/leisure/beach/walk.png"
  },
  {
    title_en: "Play beach ball",
    title_ar: "لعب الكرة الشاطئية",
    expression_en: "I want to play beach ball",
    expression_ar: "أريد لعب الكرة الشاطئية",
    imgUrl: "/public/leisure/beach/ball.png"
  }
]);
const leisureHobbyChoices = createGroup("Hobby", "/public/leisure/hobby.png", [
  {
    title_en: "Drawing",
    title_ar: "الرسم",
    expression_en: "I want to draw",
    expression_ar: "أريد الرسم",
    imgUrl: "/public/leisure/hobby/drawing.png"
  },
  {
    title_en: "Reading",
    title_ar: "القراءة",
    expression_en: "I want to read",
    expression_ar: "أريد القراءة",
    imgUrl: "/public/leisure/hobby/reading.png"
  },
  {
    title_en: "Writing",
    title_ar: "الكتابة",
    expression_en: "I want to write",
    expression_ar: "أريد الكتابة",
    imgUrl: "/public/leisure/hobby/writing.png"
  },
  {
    title_en: "Painting",
    title_ar: "التلوين",
    expression_en: "I want to paint",
    expression_ar: "أريد التلوين",
    imgUrl: "/public/leisure/hobby/painting.png"
  },
  {
    title_en: "Music",
    title_ar: "موسيقى",
    expression_en: "I want to play music",
    expression_ar: "أريد عزف الموسيقى",
    imgUrl: "/public/leisure/hobby/music.png"
  }
]);
export const animalAnatomyChoices = createGroup("Animal anatomy", "/public/animals/anatomy.png", [
  { title_en: "Head", title_ar: "رأس", expression_en: "Animal head", expression_ar: "رأس الحيوان", imgUrl: "/public/animals/head.png" },
  { title_en: "Body", title_ar: "جسم", expression_en: "Animal body", expression_ar: "جسم الحيوان", imgUrl: "/public/animals/body.png" },
  { title_en: "Legs", title_ar: "أرجل", expression_en: "Animal legs", expression_ar: "أرجل الحيوان", imgUrl: "/public/animals/legs.png" },
  { title_en: "Tail", title_ar: "ذيل", expression_en: "Animal tail", expression_ar: "ذيل الحيوان", imgUrl: "/public/animals/tail.png" },
  { title_en: "Wings", title_ar: "أجنحة", expression_en: "Animal wings", expression_ar: "أجنحة الحيوان", imgUrl: "/public/animals/wings.png" },
]);
export const animalNutritionChoices = createGroup("Animal nutrition", "/public/animals/nutrition.png", [
  { title_en: "Grass", title_ar: "عشب", expression_en: "Animal eats grass", expression_ar: "الحيوان يأكل عشب", imgUrl: "/public/animals/grass.png" },
  { title_en: "Meat", title_ar: "لحم", expression_en: "Animal eats meat", expression_ar: "الحيوان يأكل لحم", imgUrl: "/public/animals/meat.png" },
  { title_en: "Fish", title_ar: "سمك", expression_en: "Animal eats fish", expression_ar: "الحيوان يأكل سمك", imgUrl: "/public/animals/fish.png" },
  { title_en: "Seeds", title_ar: "بذور", expression_en: "Animal eats seeds", expression_ar: "الحيوان يأكل بذور", imgUrl: "/public/animals/seeds.png" },
  { title_en: "Water", title_ar: "ماء", expression_en: "Animal drinks water", expression_ar: "الحيوان يشرب ماء", imgUrl: "/public/animals/water.png" },
]);
export const animalTypesChoices = createGroup("Animal types", "/public/animals/types.png", [
  { title_en: "Mammal", title_ar: "ثدييات", expression_en: "Mammal animal", expression_ar: "حيوان ثديي", imgUrl: "/public/animals/mammal.png" },
  { title_en: "Bird", title_ar: "طائر", expression_en: "Bird animal", expression_ar: "طائر", imgUrl: "/public/animals/bird.png" },
  { title_en: "Fish", title_ar: "سمك", expression_en: "Fish animal", expression_ar: "سمك", imgUrl: "/public/animals/fish.png" },
  { title_en: "Reptile", title_ar: "زواحف", expression_en: "Reptile animal", expression_ar: "زواحف", imgUrl: "/public/animals/reptile.png" },
  { title_en: "Insect", title_ar: "حشرات", expression_en: "Insect", expression_ar: "حشرة", imgUrl: "/public/animals/insect.png" },
]);
export const animalReproductionChoices = createGroup("Animal reproduction", "/public/animals/reproduction.png", [
  { title_en: "Egg", title_ar: "بيضة", expression_en: "Animal lays eggs", expression_ar: "الحيوان يبيض", imgUrl: "/public/animals/egg.png" },
  { title_en: "Birth", title_ar: "ولادة", expression_en: "Animal gives birth", expression_ar: "الحيوان يلد", imgUrl: "/public/animals/birth.png" },
  { title_en: "Baby animal", title_ar: "صغير الحيوان", expression_en: "Baby animal", expression_ar: "صغير الحيوان", imgUrl: "/public/animals/baby.png" },
  { title_en: "Growth", title_ar: "نمو", expression_en: "Animal growth", expression_ar: "نمو الحيوان", imgUrl: "/public/animals/growth.png" },
]);
export const animalPhysiologyChoices = createGroup("Animal physiology", "/public/animals/physiology.png", [
  { title_en: "Breathing", title_ar: "تنفس", expression_en: "Animal breathes", expression_ar: "الحيوان يتنفس", imgUrl: "/public/animals/breath.png" },
  { title_en: "Heart", title_ar: "قلب", expression_en: "Animal heart", expression_ar: "قلب الحيوان", imgUrl: "/public/animals/heart.png" },
  { title_en: "Blood", title_ar: "دم", expression_en: "Animal blood", expression_ar: "دم الحيوان", imgUrl: "/public/animals/blood.png" },
  { title_en: "Sleep", title_ar: "نوم", expression_en: "Animal sleeps", expression_ar: "الحيوان ينام", imgUrl: "/public/animals/sleep.png" },
]);
export const animalEnvironmentChoices = createGroup("Animal environment", "/public/animals/environment.png", [
  { title_en: "Forest", title_ar: "غابة", expression_en: "Forest animal", expression_ar: "حيوان الغابة", imgUrl: "/public/animals/forest.png" },
  { title_en: "Desert", title_ar: "صحراء", expression_en: "Desert animal", expression_ar: "حيوان الصحراء", imgUrl: "/public/animals/desert.png" },
  { title_en: "Ocean", title_ar: "محيط", expression_en: "Ocean animal", expression_ar: "حيوان المحيط", imgUrl: "/public/animals/ocean.png" },
  { title_en: "Farm", title_ar: "مزرعة", expression_en: "Farm animal", expression_ar: "حيوان المزرعة", imgUrl: "/public/animals/farm.png" },
]);
export const animalBehaviorChoices = createGroup("Animal behaviour", "/public/animals/behavior.png", [
  { title_en: "Run", title_ar: "يجري", expression_en: "Animal runs", expression_ar: "الحيوان يجري", imgUrl: "/public/animals/run.png" },
  { title_en: "Eat", title_ar: "يأكل", expression_en: "Animal eats", expression_ar: "الحيوان يأكل", imgUrl: "/public/animals/eat.png" },
  { title_en: "Sleep", title_ar: "ينام", expression_en: "Animal sleeps", expression_ar: "الحيوان ينام", imgUrl: "/public/animals/sleep.png" },
  { title_en: "Hunt", title_ar: "يصطاد", expression_en: "Animal hunts", expression_ar: "الحيوان يصطاد", imgUrl: "/public/animals/hunt.png" },
]);
export const animalHousingChoices = createGroup("Animal housing", "/public/animals/housing.png", [
  { title_en: "Nest", title_ar: "عش", expression_en: "Bird nest", expression_ar: "عش طائر", imgUrl: "/public/animals/nest.png" },
  { title_en: "Farm", title_ar: "مزرعة", expression_en: "Animal farm", expression_ar: "مزرعة حيوانات", imgUrl: "/public/animals/farm.png" },
  { title_en: "Cage", title_ar: "قفص", expression_en: "Animal cage", expression_ar: "قفص حيوان", imgUrl: "/public/animals/cage.png" },
  { title_en: "Home", title_ar: "موطن", expression_en: "Animal home", expression_ar: "موطن الحيوان", imgUrl: "/public/animals/home.png" },
]);
export const animalTherapyChoices = createGroup("Animal-assisted therapy", "/public/animals/therapy.png", [
  { title_en: "Dog therapy", title_ar: "علاج بالكلاب", expression_en: "Dog therapy", expression_ar: "علاج بالكلاب", imgUrl: "/public/animals/dogtherapy.png" },
  { title_en: "Horse therapy", title_ar: "علاج بالخيول", expression_en: "Horse therapy", expression_ar: "علاج بالخيول", imgUrl: "/public/animals/horse.png" },
  { title_en: "Calm animals", title_ar: "حيوانات هادئة", expression_en: "Calm animals help", expression_ar: "حيوانات هادئة تساعد", imgUrl: "/public/animals/calm.png" },
]);
export const animalPetsWildChoices = createGroup("Pet & Wild", "/public/animals/pets.png", [
  { title_en: "Dog", title_ar: "كلب", expression_en: "Pet dog", expression_ar: "كلب أليف", imgUrl: "/public/animals/dog.png" },
  { title_en: "Cat", title_ar: "قطة", expression_en: "Pet cat", expression_ar: "قطة أليفة", imgUrl: "/public/animals/cat.png" },
  { title_en: "Lion", title_ar: "أسد", expression_en: "Wild lion", expression_ar: "أسد بري", imgUrl: "/public/animals/lion.png" },
  { title_en: "Elephant", title_ar: "فيل", expression_en: "Wild elephant", expression_ar: "فيل بري", imgUrl: "/public/animals/elephant.png" },
]);
const leisureEntertainmentChoices = createGroup("Entertainment", "/public/leisure/entertainment.png", [
  {
    title_en: "Watch TV",
    title_ar: "مشاهدة التلفاز",
    expression_en: "I want to watch TV",
    expression_ar: "أريد مشاهدة التلفاز",
    imgUrl: "/public/leisure/entertainment/tv.png"
  },
  {
    title_en: "Watch Movie",
    title_ar: "مشاهدة فيلم",
    expression_en: "I want to watch a movie",
    expression_ar: "أريد مشاهدة فيلم",
    imgUrl: "/public/leisure/entertainment/movie.png"
  },
  {
    title_en: "Listen to Music",
    title_ar: "الاستماع للموسيقى",
    expression_en: "I want to listen to music",
    expression_ar: "أريد الاستماع للموسيقى",
    imgUrl: "/public/leisure/entertainment/music.png"
  },
  {
    title_en: "Go Out",
    title_ar: "الخروج",
    expression_en: "I want to go out",
    expression_ar: "أريد الخروج",
    imgUrl: "/public/leisure/entertainment/out.png"
  }
]);
const leisureShowChoices = createGroup("Show", "/public/leisure/show.png", [
  {
    title_en: "Magic Show",
    title_ar: "عرض سحري",
    expression_en: "I want to watch a magic show",
    expression_ar: "أريد مشاهدة عرض سحري",
    imgUrl: "/public/leisure/show/magic.png"
  },
  {
    title_en: "Circus",
    title_ar: "سيرك",
    expression_en: "I want to watch a circus",
    expression_ar: "أريد مشاهدة سيرك",
    imgUrl: "/public/leisure/show/circus.png"
  },
  {
    title_en: "Theater",
    title_ar: "مسرح",
    expression_en: "I want to watch theater",
    expression_ar: "أريد مشاهدة مسرح",
    imgUrl: "/public/leisure/show/theater.png"
  },
  {
    title_en: "Dance Show",
    title_ar: "عرض رقص",
    expression_en: "I want to watch a dance show",
    expression_ar: "أريد مشاهدة عرض رقص",
    imgUrl: "/public/leisure/show/dance.png"
  }
  
]);
export const agricultureChoices = createGroup("Agriculture", "/public/economic/agriculture.png", [
  { title_en: "Farmer", title_ar: "مزارع", expression_en: "I am a farmer", expression_ar: "أنا مزارع", imgUrl: "/public/economic/farmer.png" },
  { title_en: "Wheat", title_ar: "قمح", expression_en: "Wheat farming", expression_ar: "زراعة القمح", imgUrl: "/public/economic/wheat.png" },
  { title_en: "Vegetables", title_ar: "خضروات", expression_en: "Vegetable farming", expression_ar: "زراعة الخضروات", imgUrl: "/public/economic/vegetables.png" },
  { title_en: "Rice", title_ar: "أرز", expression_en: "Rice farming", expression_ar: "زراعة الأرز", imgUrl: "/public/economic/rice.png" },
  { title_en: "Fruit farming", title_ar: "زراعة الفواكه", expression_en: "Fruit farming", expression_ar: "زراعة الفواكه", imgUrl: "/public/economic/fruit.png" },
]);
export const fishingChoices = createGroup("Fishing", "/public/economic/fishing.png", [
  { title_en: "Fisherman", title_ar: "صياد", expression_en: "I am a fisherman", expression_ar: "أنا صياد", imgUrl: "/public/economic/fisherman.png" },
  { title_en: "Fish", title_ar: "سمك", expression_en: "Catching fish", expression_ar: "اصطياد السمك", imgUrl: "/public/economic/fish.png" },
   { title_en: "River fishing", title_ar: "صيد النهر", expression_en: "River fishing", expression_ar: "صيد في النهر", imgUrl: "/public/economic/river.png" },
  { title_en: "Fishing net", title_ar: "شبكة صيد", expression_en: "Fishing net", expression_ar: "شبكة صيد", imgUrl: "/public/economic/net.png" },
  { title_en: "Fish market", title_ar: "سوق السمك", expression_en: "Fish market", expression_ar: "سوق السمك", imgUrl: "/public/economic/market.png" },
]);
export const forestryChoices = createGroup("Forestry", "/public/economic/forestry.png", [
  { title_en: "Tree cutting", title_ar: "قطع الأشجار", expression_en: "Cut trees", expression_ar: "قطع الأشجار", imgUrl: "/public/economic/cutting.png" },
  { title_en: "Wood", title_ar: "خشب", expression_en: "Wood production", expression_ar: "إنتاج الخشب", imgUrl: "/public/economic/wood.png" },
  { title_en: "Forest worker", title_ar: "عامل غابات", expression_en: "Forest worker", expression_ar: "عامل في الغابات", imgUrl: "/public/economic/worker.png" },
  { title_en: "Plant trees", title_ar: "زراعة أشجار", expression_en: "Plant trees", expression_ar: "زراعة أشجار", imgUrl: "/public/economic/plant.png" },
  { title_en: "Nature protection", title_ar: "حماية الطبيعة", expression_en: "Protect nature", expression_ar: "حماية الطبيعة", imgUrl: "/public/economic/protect.png" },
]);
export const industryChoices = createGroup("Industry", "/public/economic/industry.png", [
  { title_en: "Factory", title_ar: "مصنع", expression_en: "I work in a factory", expression_ar: "أعمل في مصنع", imgUrl: "/public/economic/factory.png" },
  { title_en: "Production", title_ar: "إنتاج", expression_en: "Production work", expression_ar: "عمل إنتاج", imgUrl: "/public/economic/production.png" },

]);
export const constructionChoices = createGroup("Construction", "/public/economic/construction.png", [
  { title_en: "Builder", title_ar: "عامل بناء", expression_en: "I am a builder", expression_ar: "أنا عامل بناء", imgUrl: "/public/economic/builder.png" },
  { title_en: "House", title_ar: "بيت", expression_en: "Building houses", expression_ar: "بناء البيوت", imgUrl: "/public/economic/house.png" },

]);
export const tradeChoices = createGroup("Trade", "/public/economic/trade.png", [
  { title_en: "Shop", title_ar: "محل", expression_en: "I work in a shop", expression_ar: "أعمل في محل", imgUrl: "/public/economic/shop.png" },
  { title_en: "Sell", title_ar: "بيع", expression_en: "I sell products", expression_ar: "أبيع منتجات", imgUrl: "/public/economic/sell.png" },
]);
export const transportServicesChoices = createGroup("Transport services", "/public/economic/transport.png", [
  { title_en: "Driver", title_ar: "سائق", expression_en: "I am a driver", expression_ar: "أنا سائق", imgUrl: "/public/economic/driver.png" },
  { title_en: "Bus", title_ar: "أتوبيس", expression_en: "Transport people", expression_ar: "نقل الناس", imgUrl: "/public/economic/bus.png" },
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
  // ====== BATHROOM ======
 "Bathroom::Shower":       showerChoices,
"Bathroom::Toilet":       toiletChoices,
"Bathroom::Brush Teeth":  brushTeethChoices,
"Bathroom::Wash Hands":   washHandsChoices,
// ====== LEISURE ======
"Leisure::Games":        leisureGamesChoices,
"Leisure::Video Games":  leisureVideoGamesChoices,
"Leisure::Beach":        leisureBeachChoices,
"Leisure::Hobby":        leisureHobbyChoices,
"Leisure::Entertainment": leisureEntertainmentChoices,
"Leisure::Show":         leisureShowChoices,
// ====== ANIMALS ======
"Animal anatomy::Anatomy":             animalAnatomyChoices,
"Animal nutrition::Nutrition":         animalNutritionChoices,
"Animal types::Types":                 animalTypesChoices,
"Animal reproduction::Reproduction":   animalReproductionChoices,
"Animal physiology::Physiology":       animalPhysiologyChoices,
"Animal environment::Environment":     animalEnvironmentChoices,
"Animal behaviour::Behavior":          animalBehaviorChoices,
"Animal housing::Housing":             animalHousingChoices,
"Animal-assisted therapy::Therapy":    animalTherapyChoices,
"Pet & Wild::Pets & Wild":             animalPetsWildChoices,
// ====== PLANTS ======
"Plant::Anatomy":        plantAnatomyChoices,
"Plant::Physiology":     plantPhysiologyChoices,
"Plant::Classification": plantClassificationChoices,
"Plant::Types":          plantTypesChoices,
 // ─────────────────────────────
  // EDUCATION
  // ─────────────────────────────

  "Education::Teaching activity": educationActivityChoices,
  "Education::Subject": educationSubjectChoices,
  "Education::Institution": educationInstitutionChoices,
  "Education::Task": educationTaskChoices,
  "Education::Material": educationMaterialChoices,
  "Education::Equipment": educationEquipmentChoices,
  "Education::Space": educationSpaceChoices,
  "Education::Staff": educationStaffChoices,
  "Education::Students": educationStudentsChoices,
  "Education::Methodology": educationMethodChoices,
  "Education::Core vocabulary": educationVocabChoices,
  "Primary Sector::Agriculture": agricultureChoices,
"Primary Sector::Fishing": fishingChoices,
"Secondary Sector::Industry": industryChoices,
"Secondary Sector::Construction": constructionChoices,
"Tertiary Sector::Trade": tradeChoices,
"Tertiary Sector::Transport services": transportServicesChoices,
};
