/*import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme"; // استيراد themes


/* =======================
   Categories data
======================= *
const categories = [
  {
    id: "1",
    name: {
      en: "Real Life",
      ar: "الحياة الواقعية",
      fr: "La vie réelle",
      es: "Vida real",
    },
    image:
      "https://www.creativefabrica.com/wp-content/uploads/2022/08/24/Daily-Fonts-36960332-1.png",
  },
  {
    id: "2",
    name: {
      en: "Feelings",
      ar: "المشاعر",
      fr: "Sentiments",
      es: "Sentimientos",
    },
    image:
      "https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX44167268.jpg",
  },
  {
    id: "3",
    name: {
      en: "Communication",
      ar: "التواصل",
      fr: "Communication",
      es: "Comunicación",
    },
    image:
      "https://thumbs.dreamstime.com/b/hand-writing-communication-text-drawings-graphics-digital-composite-90340922.jpg",
  },
  {
    id: "4",
    name: {
      en: "Additional",
      ar: "إضافي",
      fr: "Supplémentaire",
      es: "Adicional",
    },
    image:
    "https://thumbs.dreamstime.com/b/additional-gold-text-black-background-d-rendered-royalty-free-stock-picture-image-can-be-used-online-website-banner-87918189.jpg"
  },
  {
    id: "5",
    name: {
      en: "All",
      ar: "الكل",
      fr: "Tout",
      es: "Todo",
    },
    image:
      "https://st4.depositphotos.com/1008851/29267/v/1600/depositphotos_292674954-stock-illustration-life-text-grunge-blots-background.jpg",
  },
   // ======= Favourite Category Card =======
  {
    id: "favourites",
    name: {
      en: "Favourites",
      ar: "المفضلات",
      fr: "Favoris",
      es: "Favoritos",
    },
    image:
      "https://cdn-icons-png.flaticon.com/512/1077/1077035.png", // أي أيقونة تناسب Favourite
    isFavouriteCard: true, // علامة نميز بها الكارد
  },
];
/* =======================
   Translations
====================*
const translations = {
  en: {
    welcome: "Welcome to Voxi",
    chooseCategory: "Choose your category",
  },
  ar: {
    welcome: "مرحبًا بك في فوكسّي",
    chooseCategory: "اختر فئتك",
  },
  fr: {
    welcome: "Bienvenue dans Voxi",
    chooseCategory: "Choisissez votre catégorie",
  },
  es: {
    welcome: "Bienvenido a Voxi",
    chooseCategory: "Elige tu categoría",
  },
};
const { width } = Dimensions.get("window");
const CARD_WIDTH = width > 900 ? 320 : width * 0.75;
/* =======================
   Component
======================= *
const Category = () => {
  const navigation = useNavigation();
  const { language, theme } = useContext(AppContext);

  const t = translations[language] || translations.en;
  const currentTheme = themes[theme];

   const handlePress = (cat) => {
    if (cat.isFavouriteCard) {
      navigation.navigate("Favourites"); // ➡️ لو Favourite اضغط عليه
    } else {
      const nameEn = cat.name.en;
      nameEn === "All"
        ? navigation.navigate("Home")
        : navigation.navigate("Dashboard", { category: nameEn });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, { width: CARD_WIDTH, backgroundColor: currentTheme.card }]}
      onPress={() => handlePress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.cardText, { color: currentTheme.text }]}>{item.name[language]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      {/* ===== HEADER ===== *}
      <Text style={[styles.title, { color: currentTheme.text }]}>{t.welcome}</Text>
      <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>{t.chooseCategory}</Text>

      {/* ===== SLIDER (FlatList بدل react-slick) ===== *}
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};

export default Category;

/* =======================
   Styles
======================= *
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.7,
  },
  card: {
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  image: {
    width: "100%",
    height: 190,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});*/
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";
import { APP_CONFIG, normalizeMediaUrl } from "../config/appConfig";

//import { BACKEND_URL } from "../config/appConfig";   // e.g. "http://192.168.x.x:5551"

/* =======================
   UI translations (header text only)
======================= */
const uiTranslations = {
  en: { welcome: "Welcome to Voxi",      chooseCategory: "Choose your category" },
  ar: { welcome: "مرحبًا بك في فوكسّي",  chooseCategory: "اختر فئتك"            },
  fr: { welcome: "Bienvenue dans Voxi",  chooseCategory: "Choisissez votre catégorie" },
  es: { welcome: "Bienvenido a Voxi",    chooseCategory: "Elige tu categoría"    },
};

/* =======================
   Static extra cards
   (Favourites + All — not in backend)
======================= */
const EXTRA_CARDS = [
  {
    id: "expressyourfeelingsbydrawing",
    name: "expressyourfeelingsbydrawing",
    title_en: "Express By Drawing",
    title_ar: "عبّر بالرسم",
    title_fr: "Exprime-toi par le dessin",
    title_es: "Exprésate dibujando",
    imgUrl: "/public/categories/train.png",
  },
  {
    id: "all",
    name: "All",
    title_en: "All",
    title_ar: "الكل",
    title_fr: "Tout",
    title_es: "Todo",
    imgUrl: "https://st4.depositphotos.com/1008851/29267/v/1600/depositphotos_292674954-stock-illustration-life-text-grunge-blots-background.jpg",
    isAll: true,
  },
  {
    id: "favourites",
    name: "Favourites",
    title_en: "Favourites",
    title_ar: "المفضلات",
    title_fr: "Favoris",
    title_es: "Favoritos",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
    isFavouriteCard: true,
  },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width > 900 ? 320 : width * 0.75;
const normalizeKey = (val) =>
  (val || "").toString().toLowerCase().replace(/\s+/g, "");

const labelFor = (item, lang) =>
  item[`title_${lang}`] ??
  item.title_en ??
  item.translations?.[lang] ??
  item.translations?.en ??
  item.name;

const imageFor = (item) =>
  normalizeMediaUrl(
    item.imgUrl ||
    item.image ||
    item.translations?.image,
  );

/* =======================
   Component
======================= */
const Category = () => {
  const navigation                  = useNavigation();
  const { language, theme }         = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  const t            = uiTranslations[language] ?? uiTranslations.en;
  const currentTheme = themes[theme];

  // ── Fetch from backend ──────────────────────
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res  = await fetch(`${APP_CONFIG.apiUrl}/maincategories`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        const merged = [...data, ...EXTRA_CARDS];
        const deduped = merged.filter((item, index) => {
          const itemKey = normalizeKey(item.name || item.title_en || item.id);
          return (
            index ===
            merged.findIndex(
              (candidate) =>
                normalizeKey(
                  candidate.name || candidate.title_en || candidate.id,
                ) === itemKey,
            )
          );
        });
        setCategories(deduped);
      } catch (err) {
        console.error("Category fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  const apiCategoryFor = (cat) => cat.apiCategory || cat.name;

  // ── Navigation ───────────────────────────────
  const handlePress = (cat) => {
    const key = normalizeKey(cat.name || cat.title_en);

    if (cat.isFavouriteCard) {
      navigation.navigate("Favourites");
    } else if (cat.isAll) {
      navigation.navigate("Home");
    } else if (key === "reallife" || key.includes("reallife")) {
      navigation.navigate("TimePeriod", {
        mainCategoryId: cat.id,
        mainCategoryName: cat.name,
        mainCategoryTitle: labelFor(cat, language),
      });
    } else if (key === "reminder" || key === "reminderme" || key.includes("reminder")) {
      navigation.navigate("Dashboard", {
        category: apiCategoryFor(cat),
        mainCategoryId: cat.id,
      });
    } else if (key === "emergency" || key.includes("emergency")) {
      navigation.navigate("Emergency");
    } else if (
      key === "expressyourfeelingsbydrawing" ||
      key === "expressbydrawing" ||
      key.includes("drawing")
    ) {
      navigation.navigate("ExpressByDrawing");
    } else if (
      key === "learnandtry" ||
      key === "trytospeak" ||
      key.includes("learn") ||
      key.includes("try")
    ) {
      navigation.navigate("TryToSpeak");
    } else {
      navigation.navigate("Dashboard", {
        category: cat.name,
        mainCategoryId: cat.id,
      });
    }
  };

  // ── Render card ──────────────────────────────
  const renderItem = ({ item }) => {
    const label = labelFor(item, language);
    const image = imageFor(item);

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.card, { width: CARD_WIDTH, backgroundColor: currentTheme.card }]}
        onPress={() => handlePress(item)}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View
            style={[
              styles.imagePlaceholder,
              { backgroundColor: (currentTheme.link || currentTheme.text) + "33" },
            ]}
          />
        )}
        <Text style={[styles.cardText, { color: currentTheme.text }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  // ── Loading / Error states ───────────────────
  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: currentTheme.background }]}>
        <ActivityIndicator size="large" color={currentTheme.link || currentTheme.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: currentTheme.background }]}>
        <Text style={[styles.errorText, { color: currentTheme.text }]}>
          ⚠️ {error}
        </Text>
      </View>
    );
  }

  // ── Main render ──────────────────────────────
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      {/* HEADER */}
      <Text style={[styles.title,    { color: currentTheme.text }]}>{t.welcome}</Text>
      <Text style={[styles.subtitle, { color: currentTheme.textSecondary || currentTheme.text }]}>
        {t.chooseCategory}
      </Text>

      {/* SLIDER */}
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};

export default Category;

/* =======================
   Styles
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.7,
  },
  card: {
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  image: {
    width: "100%",
    height: 190,
  },
  imagePlaceholder: {
    width: "100%",
    height: 190,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 12,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
