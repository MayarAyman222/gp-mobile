import React, { useContext, useEffect, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";
import { APP_CONFIG, normalizeMediaUrl } from "../config/appConfig";

const uiTranslations = {
  en: { heading: "Choose a time period" },
  ar: { heading: "اختر فترة زمنية" },
  fr: { heading: "Choisissez une période" },
  es: { heading: "Elige un período" },
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width > 900 ? 320 : width * 0.75;

const labelFor = (item, lang) =>
  item[`title_${lang}`] || item.title_en || item.name;

const TimePeriod = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { language, theme } = useContext(AppContext);
  const currentTheme = themes[theme];

  const mainCategoryId = params?.mainCategoryId;
  const mainCategoryName = params?.mainCategoryName;
  const mainCategoryTitle = params?.mainCategoryTitle;

  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mainCategoryId) {
      setError("Missing main category id");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${APP_CONFIG.contentApiUrl}/maincategories/${mainCategoryId}/timeperiods`
        );

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        setPeriods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [mainCategoryId]);

  const handlePress = (period) => {
    navigation.navigate("Dashboard", {
      timePeriodId: period.id,
      category: mainCategoryName || "All",
      timePeriodTitle: labelFor(period, language),
    });
  };

  const renderCard = (item) => {
    const label = labelFor(item, language);
    const image = normalizeMediaUrl(item.imgUrl, APP_CONFIG.contentApiBaseUrl);

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
              {
                backgroundColor:
                  (currentTheme.link || currentTheme.text) + "33",
              },
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
      <View
        style={[
          styles.centered,
          { backgroundColor: currentTheme.background },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={currentTheme.link || currentTheme.text}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.centered,
          { backgroundColor: currentTheme.background },
        ]}
      >
        <Text style={[styles.errorText, { color: currentTheme.text }]}>
          ⚠️ {error}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.background },
      ]}
    >
      <Text style={[styles.title, { color: currentTheme.text }]}>
        {mainCategoryTitle}
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: currentTheme.textSecondary || currentTheme.text },
        ]}
      >
        {uiTranslations[language]?.heading ?? uiTranslations.en.heading}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
      >
        {periods.map((item) => renderCard(item))}
      </ScrollView>
    </View>
  );
};

export default TimePeriod;

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
    minHeight: 380,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "1000",
    height: 500,
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