import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";
import { APP_CONFIG, normalizeMediaUrl } from "../config/appConfig";

const uiTranslations = {
  en: { welcome: "Welcome to Voxi", chooseCategory: "Choose your category" },
  ar: { welcome: "مرحبًا بك في فوكسّي", chooseCategory: "اختر فئتك" },
  fr: { welcome: "Bienvenue dans Voxi", chooseCategory: "Choisissez votre catégorie" },
  es: { welcome: "Bienvenido a Voxi", chooseCategory: "Elige tu categoría" },
};

const EXTRA_CARDS = [
  {
    id: "chatbot",
    name: "Chatbot",
    title_en: "Chatbot",
    title_ar: "شات بوت",
    title_fr: "Chatbot",
    title_es: "Chatbot",
    imgUrl: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
    isChatbotCard: true,
  },
  {
    id: "all",
    name: "All",
    title_en: "All",
    title_ar: "الكل",
    title_fr: "Tout",
    title_es: "Todo",
    imgUrl:
      "https://st4.depositphotos.com/1008851/29267/v/1600/depositphotos_292674954-stock-illustration-life-text-grunge-blots-background.jpg",
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
    item.imgUrl || item.image || item.translations?.image,
    APP_CONFIG.contentApiBaseUrl
  );

const Category = () => {
  const navigation = useNavigation();
  const { language, theme } = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const t = uiTranslations[language] ?? uiTranslations.en;
  const currentTheme = themes[theme];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${APP_CONFIG.contentApiUrl}/maincategories`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        const merged = [...data, ...EXTRA_CARDS];

        const deduped = merged.filter((item, index) => {
          const itemKey = normalizeKey(item.name || item.title_en || item.id);

          return (
            index ===
            merged.findIndex(
              (candidate) =>
                normalizeKey(candidate.name || candidate.title_en || candidate.id) ===
                itemKey
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

  const handlePress = (cat) => {
    const key = normalizeKey(cat.name || cat.title_en);

    if (cat.isFavouriteCard) {
      navigation.navigate("Favourites");
    } else if (cat.isChatbotCard || key === "chatbot") {
      navigation.navigate("Chat");
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

  const renderCard = (item) => {
    const label = labelFor(item, language);
    const image = imageFor(item);

    return (
      <Pressable
        key={String(item.id)}
        style={[
          styles.card,
          {
            width: CARD_WIDTH,
            backgroundColor: currentTheme.card,
          },
        ]}
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

        <Text style={[styles.cardText, { color: currentTheme.text }]}>
          {label}
        </Text>
      </Pressable>
    );
  };

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

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>
        {t.welcome}
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: currentTheme.textSecondary || currentTheme.text },
        ]}
      >
        {t.chooseCategory}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
      >
        {categories.map((item) => renderCard(item))}
      </ScrollView>
    </View>
  );
};

export default Category;

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
  listContent: {
    paddingHorizontal: 20,
    paddingRight: CARD_WIDTH,
    paddingBottom: 20,
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
    height: 340,
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