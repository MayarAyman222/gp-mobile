// Favourites.js - SubIconDashboard style (NO CheckBox package)
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { speakText } from "../Api/tts-translate-api";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width > 900 ? width / 4 - 20 : width / 2 - 16;

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

export default function Favourites() {
  const { language: lang, theme, user } = useContext(AppContext);
  const navigation = useNavigation();

  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [timeOption, setTimeOption] = useState(timeOptionsByLang[lang][0]);
  const [connector, setConnector] = useState(connectorOptionsByLang[lang][0]);
  const [speaking, setSpeaking] = useState(false);

  // load favourites
  const loadFavourites = async () => {
    if (!user?.id) return;
    try {
      const json = await AsyncStorage.getItem(`favourites_${user.id}`);
      setFavourites(json ? JSON.parse(json) : []);
    } catch (e) {
      console.log("load favourites error", e);
    }
  };

  useEffect(() => {
    loadFavourites();
    setTimeOption(timeOptionsByLang[lang][0]);
    setConnector(connectorOptionsByLang[lang][0]);
  }, [user, lang]);

  // toggle select
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // delete favourite
  const deleteFavourite = async (id) => {
    const updated = favourites.filter((f) => f.id !== id);
    setFavourites(updated);
    setSelectedIds((prev) => prev.filter((i) => i !== id));

    if (user?.id) {
      await AsyncStorage.setItem(
        `favourites_${user.id}`,
        JSON.stringify(updated)
      );
    }
  };

  // sentence
  const generateSentence = () => {
    const expressions = favourites
      .filter((f) => selectedIds.includes(f.id))
      .map((i) => i[`expression_${lang}`])
      .filter(Boolean);

    if (!expressions.length) return "";
    return `${timeOption} ${expressions.join(` ${connector} `)}`;
  };

  // speak
  const handleSpeak = async () => {
    const sentence = generateSentence();
    if (!sentence) return;

    setSpeaking(true);
    try {
      const result = await speakText(sentence, lang);
      const { sound } = await Audio.Sound.createAsync({ uri: result.url });
      await sound.playAsync();
    } catch (e) {
      console.log(e);
    } finally {
      setSpeaking(false);
    }
  };

  // filter
  const filteredFavourites = favourites.filter((item) => {
    const t = item[`title_${lang}`] || "";
    const e = item[`expression_${lang}`] || "";
    return (
      t.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // card
  const renderCard = ({ item }) => {
    const isSelected = selectedIds.includes(item.id);
    const imageUri = item.imageUrl?.replace(
      "localhost",
      "192.168.0.102" // عدلي IP
    );

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: isSelected
              ? "#3498db33"
              : theme === "dark"
              ? "#333"
              : "#fff",
          },
        ]}
      >
        {/* checkbox */}
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => toggleSelect(item.id)}
        >
          <Text style={{ fontSize: 20 }}>{isSelected ? "✅" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.center}
          onPress={() =>
            navigation.navigate("SubIconDetail", { subIcon: item })
          }
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <FontAwesome5
              name="image"
              size={80}
              color={theme === "dark" ? "#fff" : "#000"}
            />
          )}
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.cardTitle,
              { color: theme === "dark" ? "#fff" : "#000" },
            ]}
          >
            {item[`title_${lang}`]}
          </Text>
          <Text
            style={[
              styles.cardExpr,
              { color: theme === "dark" ? "#fff" : "#000" },
            ]}
          >
            {item[`expression_${lang}`]}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteFavourite(item.id)}
        >
          <Text style={styles.deleteText}>
            {lang === "ar" ? "حذف" : "Delete"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!user) {
    return (
      <View style={styles.centerFull}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#000" : "#f2f2f2",
      }}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.headerText,
            { color: theme === "dark" ? "#fff" : "#000" },
          ]}
        >
          {lang === "ar" ? "المفضلة" : "Favourites"}
        </Text>

        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme === "dark" ? "#555" : "#fff",
              color: theme === "dark" ? "#fff" : "#000",
            },
          ]}
          placeholder={lang === "ar" ? "بحث..." : "Search..."}
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.controlsRow}>
            <Picker
              selectedValue={connector}
              onValueChange={setConnector}
              style={styles.picker}
            >
              {connectorOptionsByLang[lang].map((o) => (
                <Picker.Item key={o} label={o} value={o} />
              ))}
            </Picker>

            <Picker
              selectedValue={timeOption}
              onValueChange={setTimeOption}
              style={styles.picker}
            >
              {timeOptionsByLang[lang].map((o) => (
                <Picker.Item key={o} label={o} value={o} />
              ))}
            </Picker>

            <TouchableOpacity
              style={styles.speakBtn}
              onPress={handleSpeak}
              disabled={speaking || selectedIds.length === 0}
            >
              <Text style={styles.speakText}>🔊</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {selectedIds.length > 0 && (
          <View style={styles.sentenceBox}>
            <Text style={{ color: theme === "dark" ? "#fff" : "#000" }}>
              {generateSentence()}
            </Text>
          </View>
        )}
      </View>

      <FlatList
        data={filteredFavourites}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={width > 900 ? 4 : 2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 16 },
  headerText: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  searchInput: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  controlsRow: { flexDirection: "row", alignItems: "center" },
  picker: { width: 110, marginRight: 6 },
  speakBtn: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 8,
  },
  speakText: { color: "#fff", fontWeight: "700" },
  sentenceBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    paddingBottom: 10,
    marginBottom: 12,
  },
  checkbox: { position: "absolute", top: 6, right: 6, zIndex: 10 },
  center: { alignItems: "center", marginTop: 10 },
  image: { width: CARD_WIDTH, height: 140 },
  textContainer: { paddingHorizontal: 6, marginTop: 6 },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardExpr: { fontSize: 12 },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    margin: 6,
    borderRadius: 8,
    padding: 6,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "700" },
  centerFull: { flex: 1, justifyContent: "center", alignItems: "center" },
});