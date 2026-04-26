import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";
import { APP_CONFIG, normalizeMediaUrl } from "../config/appConfig";
import { speakText } from "../Api/tts-translate-api";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width > 900 ? width / 4 - 20 : width / 2 - 16;
const CARD_IMAGE_HEIGHT = 150;

const timeOptionsByLang = {
  en: ["Today", "Yesterday", "Tomorrow"],
  ar: ["اليوم", "أمس", "غدًا"],
  fr: ["Aujourd'hui", "Hier", "Demain"],
  es: ["Hoy", "Ayer", "Mañana"],
};

const connectorOptionsByLang = {
  en: ["and", "or", "then"],
  ar: ["و", "أو", "ثم"],
  fr: ["et", "ou", "puis"],
  es: ["y", "o", "entonces"],
};

function SelectableZoomCard({ selected, hasAnySelection, children }) {
  const progress = useRef(
    new Animated.Value(hasAnySelection ? (selected ? 1 : 0) : 0.5),
  ).current;

  useEffect(() => {
    const toValue = hasAnySelection ? (selected ? 1 : 0) : 0.5;

    Animated.spring(progress, {
      toValue,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [hasAnySelection, progress, selected]);

  return (
    <Animated.View
      style={[
        styles.cardAnimatedWrapper,
        {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.55, 1, 1],
          }),
          transform: [
            {
              scale: progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.94, 1, 1.09],
              }),
            },
            {
              translateY: progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [6, 0, -8],
              }),
            },
          ],
        },
        selected ? styles.cardSelectedLayer : null,
      ]}
    >
      {children}
    </Animated.View>
  );
}

export default function SubSubIconPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const { parentSubIcon, parentIcon } = route.params || {};
  const { language: lang, theme } = useContext(AppContext);
  const currentTheme = themes[theme] || themes.light;

  console.log("=== SubSubIcon Page ===");
  console.log("parentSubIcon:", JSON.stringify(parentSubIcon, null, 2));
  console.log("parentIcon:", parentIcon?.title_en);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [timeOption, setTimeOption] = useState(timeOptionsByLang[lang][0]);
  const [connector, setConnector] = useState(connectorOptionsByLang[lang][0]);
  const [speaking, setSpeaking] = useState(false);

  const subSubIcons = useMemo(
    () => parentSubIcon?.subSubIcons || [],
    [parentSubIcon],
  );

  useEffect(() => {
    setTimeOption(timeOptionsByLang[lang][0]);
    setConnector(connectorOptionsByLang[lang][0]);
  }, [lang]);

  const filteredSubSubIcons = subSubIcons.filter((item) => {
    const title = item?.[`title_${lang}`] || item?.title_en || "";
    const expression = item?.[`expression_${lang}`] || item?.expression_en || "";

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expression.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleSelect = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((currentId) => currentId !== id)
        : [...previous, id],
    );
  };

  const generateSentence = () => {
    const selectedExpressions = subSubIcons
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => item?.[`expression_${lang}`] || item?.expression_en)
      .filter(Boolean);

    if (!selectedExpressions.length) return "";

    const parentExpression =
      parentSubIcon?.[`expression_${lang}`] || parentSubIcon?.expression_en || "";

    return `${timeOption} ${parentExpression} ${connector} ${selectedExpressions.join(` ${connector} `)}`.trim();
  };
  const selectedSubSubIcons = selectedIds
    .map((id) => subSubIcons.find((item) => item.id === id))
    .filter(Boolean);

  const handleSpeak = async () => {
    const sentence = generateSentence();
    if (!sentence) return;

    setSpeaking(true);

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });

      const result = await speakText(sentence, lang);
      if (!result?.url) return;

      const { sound } = await Audio.Sound.createAsync(
        { uri: normalizeMediaUrl(result.url) },
        { shouldPlay: true },
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("SubSubIcon TTS error", error);
    } finally {
      setSpeaking(false);
    }
  };

  const renderItem = ({ item }) => {
    const selected = selectedIds.includes(item.id);
    const hasAnySelection = selectedIds.length > 0;
    const imageUri = normalizeMediaUrl(
      item?.imgUrl,
      APP_CONFIG.contentApiBaseUrl,
    );

    return (
      <SelectableZoomCard selected={selected} hasAnySelection={hasAnySelection}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: selected ? `${currentTheme.link}22` : currentTheme.card,
          },
        ]}
      >
        <TouchableOpacity style={styles.check} onPress={() => toggleSelect(item.id)}>
          <Text style={styles.checkText}>{selected ? "✔" : "◯"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardBody}
          onPress={() =>
            navigation.navigate("SubSubIconDetail", {
              subSubIcon: item,
              parentSubIcon,
              parentIcon,
            })
          }
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.imageFrame}>
              <FontAwesome5
                name="image"
                size={72}
                color={currentTheme.text}
              />
            </View>
          )}

          <View style={styles.cardFooter}>
            <Text style={[styles.cardTitle, { color: "#fff" }]}>
              {item?.[`title_${lang}`] || item?.title_en}
            </Text>
            <Text style={[styles.cardExpr, { color: "#fff" }]}>
              {item?.[`expression_${lang}`] || item?.expression_en}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      </SelectableZoomCard>
    );
  };

  if (!parentSubIcon) {
    return (
      <View style={[styles.centered, { backgroundColor: currentTheme.background }]}>
        <Text style={{ color: currentTheme.text }}>No data found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>
        {parentSubIcon?.[`title_${lang}`] || parentSubIcon?.title_en}
      </Text>
      <Text style={[styles.subtitle, { color: currentTheme.text }]}>
        {parentIcon?.[`title_${lang}`] || parentIcon?.title_en || ""}
      </Text>

      <View style={styles.controls}>
        <TextInput
          placeholder={lang === "ar" ? "بحث" : "Search"}
          placeholderTextColor={currentTheme.text}
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={[
            styles.input,
            {
              backgroundColor: currentTheme.card,
              color: currentTheme.text,
              borderColor: `${currentTheme.text}22`,
            },
          ]}
        />

        <Picker
          selectedValue={connector}
          onValueChange={setConnector}
          style={[styles.picker, { color: currentTheme.text, backgroundColor: currentTheme.card }]}
        >
          {connectorOptionsByLang[lang].map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={timeOption}
          onValueChange={setTimeOption}
          style={[styles.picker, { color: currentTheme.text, backgroundColor: currentTheme.card }]}
        >
          {timeOptionsByLang[lang].map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: currentTheme.link }]}
          onPress={handleSpeak}
          disabled={speaking || selectedIds.length === 0}
        >
          <Text style={styles.actionText}>{speaking ? "..." : "Speak"}</Text>
        </TouchableOpacity>
      </View>

      {selectedIds.length > 0 ? (
        <View style={[styles.sentenceBox, { backgroundColor: currentTheme.card }]}>
          <Text style={{ color: currentTheme.text }}>{generateSentence()}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.previewRow}
          >
            {selectedSubSubIcons.map((item) => {
              const imageUri = normalizeMediaUrl(
                item?.imgUrl || item?.imageUrl,
                APP_CONFIG.contentApiBaseUrl,
              );
              return (
                <View
                  key={item.id}
                  style={[
                    styles.previewItem,
                    { backgroundColor: currentTheme.background },
                  ]}
                >
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.previewImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <FontAwesome5
                      name="image"
                      size={34}
                      color={currentTheme.text}
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : null}

      {filteredSubSubIcons.length ? (
        <FlatList
          data={filteredSubSubIcons}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : `${item?.title_en || "item"}-${index}`
          }
          numColumns={width > 900 ? 4 : 2}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      ) : (
        <View style={styles.centered}>
          <Text style={{ color: currentTheme.text }}>
            {lang === "ar" ? "لا توجد عناصر فرعية إضافية." : "No related sub-sub-icons found."}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    opacity: 0.8,
  },
  controls: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  input: {
    width: 150,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  picker: {
    width: 130,
    borderRadius: 8,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
  sentenceBox: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
  },
  cardAnimatedWrapper: {
    paddingTop: 8,
    paddingBottom: 10,
  },
  cardSelectedLayer: {
    zIndex: 2,
  },
  card: {
    width: CARD_WIDTH,
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  cardBody: {
    flex: 1,
    alignItems: "center",
  },
  check: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 10,
  },
  checkText: {
    fontSize: 22,
  },
  image: {
    width: "100%",
    height: CARD_IMAGE_HEIGHT,
  },
  imageFrame: {
    width: "100%",
    height: CARD_IMAGE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f6f8",
  },
  cardFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  cardTitle: {
    fontWeight: "700",
    marginBottom: 4,
  },
  cardExpr: {
    fontSize: 12,
  },
  previewRow: {
    gap: 8,
    paddingTop: 10,
  },
  previewItem: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});
