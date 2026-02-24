import {
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
======================= */
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
====================*/
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
======================= */
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
      {/* ===== HEADER ===== */}
      <Text style={[styles.title, { color: currentTheme.text }]}>{t.welcome}</Text>
      <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>{t.chooseCategory}</Text>

      {/* ===== SLIDER (FlatList بدل react-slick) ===== */}
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
======================= */
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
});