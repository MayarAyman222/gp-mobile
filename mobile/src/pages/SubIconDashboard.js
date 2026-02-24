// SubIconDashboard with favourite functionality (fixed)
import React, { useState, useEffect, useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createSubIcon } from "../Api/iconApi";
import { speakText } from "../Api/tts-translate-api";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";

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

const welcomeByLang = {
  en: "Sub Icons",
  ar: "الأيقونات الفرعية",
  fr: "Sous-icônes",
  es: "Sub Iconos",
};

export default function SubIconDashboard() {
  const route = useRoute();
  const navigation = useNavigation();
  const { parentIcon } = route.params;
  const { language: lang, theme, user } = useContext(AppContext);
  const currentTheme = themes[theme];

  const [subIcons, setSubIcons] = useState(parentIcon.subIcons || []);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeOption, setTimeOption] = useState(timeOptionsByLang[lang][0]);
  const [connector, setConnector] = useState(connectorOptionsByLang[lang][0]);
  const [speaking, setSpeaking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newSubIcon, setNewSubIcon] = useState({
    title_en: "", expression_en: "",
    title_ar: "", expression_ar: "",
    title_fr: "", expression_fr: "",
    title_es: "", expression_es: "",
    iconName: "",
  });
  const [favourites, setFavourites] = useState([]);

  // ------------------- Load Favourites -------------------
  const loadFavourites = async () => {
    if (!user || !user.id) {
      console.log("User not ready yet for favourites");
      return;
    }

    try {
      const json = await AsyncStorage.getItem(`favourites_${user.id}`);
      if (json) setFavourites(JSON.parse(json));
      else setFavourites([]);
    } catch (err) {
      console.log("Error loading favourites:", err);
    }
  };

  // ------------------- Toggle Favourite -------------------
  const toggleFavourite = async (subIcon) => {
    if (!user || !user.id) {
      console.log("User not ready yet for favourites");
      return;
    }

    const subIconData = {
      id: subIcon.id,
      title_en: subIcon.title_en,
      title_ar: subIcon.title_ar,
      title_fr: subIcon.title_fr,
      title_es: subIcon.title_es,
      expression_en: subIcon.expression_en,
      expression_ar: subIcon.expression_ar,
      expression_fr: subIcon.expression_fr,
      expression_es: subIcon.expression_es,
      iconName: subIcon.iconName,
      imageUrl: subIcon.imageUrl,
    };

    const exists = favourites.some(f => f.id === subIcon.id);
    const updated = exists
      ? favourites.filter(f => f.id !== subIcon.id)
      : [...favourites, subIconData];

    setFavourites(updated);

    try {
      await AsyncStorage.setItem(`favourites_${user.id}`, JSON.stringify(updated));
      console.log("Favourites saved:", updated);
    } catch (err) {
      console.log("Error saving favourite:", err);
    }
  };

  // ------------------- useEffect -------------------
  useEffect(() => {
    setTimeOption(timeOptionsByLang[lang][0]);
    setConnector(connectorOptionsByLang[lang][0]);
  }, [lang]);

  useEffect(() => {
    if (user && user.id) {
      loadFavourites();
    }
  }, [user]);

  // ------------------- Filtered list -------------------
  const filteredSubIcons = subIcons.filter(icon => {
    const t = icon[`title_${lang}`] || "";
    const e = icon[`expression_${lang}`] || "";
    return t.toLowerCase().includes(searchTerm.toLowerCase()) ||
           e.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleSelect = (id) => {
    setSelectedIds(p =>
      p.includes(id) ? p.filter(i => i !== id) : [...p, id]
    );
  };

  // ------------------- Sentence Generation -------------------
  const generateSentence = () => {
    const expressions = selectedIds
      .map(id => subIcons.find(i => i.id === id)?.[`expression_${lang}`])
      .filter(Boolean);
    if (!expressions.length) return "";
    return `${timeOption} ${expressions.join(` ${connector} `)}`;
  };

  // ------------------- Speak Functionality -------------------
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

  // ------------------- Add SubIcon Functionality -------------------
  const handleAddSubIcon = async () => {
    const allFilled = ["en","ar","fr","es"].every(l =>
      newSubIcon[`title_${l}`].trim() && newSubIcon[`expression_${l}`].trim()
    ) && newSubIcon.iconName.trim();

    if (!allFilled) {
      alert(lang === "ar" ? "جميع الحقول مطلوبة!" : "All fields are required!");
      return;
    }

    try {
      const saved = await createSubIcon(parentIcon.id, newSubIcon);
      setSubIcons([...subIcons, saved]);
      setNewSubIcon({
        title_en: "", expression_en: "",
        title_ar: "", expression_ar: "",
        title_fr: "", expression_fr: "",
        title_es: "", expression_es: "",
        iconName: ""
      });
      setShowModal(false);
    } catch (err) {
      console.error("Error creating subIcon:", err);
    }
  };

  // ------------------- Render Each SubIcon -------------------
  const renderSubIcon = ({ item }) => {
    const selected = selectedIds.includes(item.id);
    const fav = favourites.some(f => f.id === item.id);
    const imageUri = item.imageUrl?.replace("localhost", "192.168.0.102");

    return (
      <View style={[styles.card, { backgroundColor: selected ? currentTheme.link : currentTheme.card }]}>
        <TouchableOpacity style={styles.check} onPress={() => toggleSelect(item.id)}>
          <Text style={{ color: currentTheme.text }}>{selected ? "✅" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.center} onPress={() => navigation.navigate("SubIconDetail", { subIcon: item })}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={[styles.image, { backgroundColor: currentTheme.card }]}
              resizeMode="contain"
            />
          ) : (
            <FontAwesome5
              name={item.iconName || "image"}
              size={130}
              color={currentTheme.text}
            />
          )}

          <View style={[styles.cardFooter, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
            <Text style={[styles.cardTitle, { color: currentTheme.text }]}>{item[`title_${lang}`]}</Text>
            <Text style={[styles.cardExpr, { color: currentTheme.text }]}>{item[`expression_${lang}`]}</Text>
          </View>
        </TouchableOpacity>

        {/* Add to Favourite Button */}
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: fav ? currentTheme.success : currentTheme.link, position:"absolute", bottom:5, left:5 }]}
          onPress={() => toggleFavourite(item)}
        >
          <Text style={styles.btnText}>{fav ? "★ Favourite" : "☆ Add"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ------------------- UI -------------------
  if (!user) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>Loading user...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
      <FlatList
        data={filteredSubIcons}
        renderItem={renderSubIcon}
        keyExtractor={item => item.id.toString()}
        numColumns={width > 900 ? 4 : 2}
        columnWrapperStyle={{ marginBottom: 10 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: currentTheme.text }]}>{welcomeByLang[lang]}</Text>
            <Text style={{ textAlign: "center", color: currentTheme.text, marginBottom: 10 }}>{parentIcon.title_en}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.controls}>
                <TextInput
                  placeholder={lang === "ar" ? "بحث..." : "Search"}
                  placeholderTextColor={currentTheme.text}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  style={[styles.input, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
                />

                <Picker
                  selectedValue={connector}
                  onValueChange={setConnector}
                  style={[styles.picker, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
                >
                  {connectorOptionsByLang[lang].map(o => <Picker.Item key={o} label={o} value={o} />)}
                </Picker>

                <Picker
                  selectedValue={timeOption}
                  onValueChange={setTimeOption}
                  style={[styles.picker, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
                >
                  {timeOptionsByLang[lang].map(o => <Picker.Item key={o} label={o} value={o} />)}
                </Picker>

                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: currentTheme.link }]}
                  onPress={handleSpeak}
                  disabled={speaking || selectedIds.length === 0}
                >
                  <Text style={styles.btnText}>{speaking ? "..." : "🔊 Speak"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: currentTheme.success }]}
                  onPress={() => setShowModal(true)}
                >
                  <Text style={styles.btnText}>{lang === "ar" ? "أضف أيقونة فرعية" : "Add SubIcon"}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {selectedIds.length > 0 && (
              <View style={[styles.sentenceBox, { backgroundColor: currentTheme.card, marginVertical:10, padding:10, borderRadius:8 }]}>
                <Text style={{ color: currentTheme.text }}>{generateSentence()}</Text>
              </View>
            )}
          </>
        }
      />

      {/* Add SubIcon Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.4)" }} contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
          <View style={[styles.modalBox, { backgroundColor: currentTheme.card, margin:20, padding:20, borderRadius:10 }]}>
            <Text style={{ fontWeight:"700", marginBottom:10, color: currentTheme.text }}>Enter SubIcon Details</Text>

            {["en","ar","fr","es"].map(l => (
              <View key={l} style={{ marginBottom:10 }}>
                <TextInput
                  placeholder={`Title (${l.toUpperCase()})`}
                  placeholderTextColor={currentTheme.text}
                  value={newSubIcon[`title_${l}`]}
                  onChangeText={v => setNewSubIcon({...newSubIcon, [`title_${l}`]:v})}
                  style={[styles.input, { marginBottom:5, backgroundColor: currentTheme.background, color: currentTheme.text }]}
                />
                <TextInput
                  placeholder={`Expression (${l.toUpperCase()})`}
                  placeholderTextColor={currentTheme.text}
                  value={newSubIcon[`expression_${l}`]}
                  onChangeText={v => setNewSubIcon({...newSubIcon, [`expression_${l}`]:v})}
                  style={[styles.input, { marginBottom:5, backgroundColor: currentTheme.background, color: currentTheme.text }]}
                />
              </View>
            ))}

            <TextInput
              placeholder="Icon name (FontAwesome5)"
              placeholderTextColor={currentTheme.text}
              value={newSubIcon.iconName}
              onChangeText={v => setNewSubIcon({...newSubIcon, iconName:v})}
              style={[styles.input, { marginBottom:10, backgroundColor: currentTheme.background, color: currentTheme.text }]}
            />

            <TouchableOpacity style={[styles.btn, { backgroundColor: currentTheme.link }]} onPress={handleAddSubIcon}>
              <Text style={styles.btnText}>{lang === "ar" ? "أضف أيقونة فرعية" : "Add SubIcon"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, { backgroundColor: currentTheme.muted }]} onPress={()=>setShowModal(false)}>
              <Text style={styles.btnText}>{lang === "ar" ? "إلغاء" : "Cancel"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "800", textAlign: "center" },
  controls: { flexDirection: "row", marginBottom: 10, flexWrap: "wrap" },
  input: { padding: 10, borderRadius: 8, width: 140 },
  picker: { width: 120 },
  card: { width: CARD_WIDTH, height: 220, borderRadius: 12, overflow: "hidden" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: CARD_WIDTH, height: 180, marginBottom: 40, borderRadius: 12 },
  cardFooter: { position: "absolute", bottom: 0, width: "100%", padding: 6 },
  cardTitle: { fontWeight: "700" },
  cardExpr: { fontSize: 12 },
  check: { position: "absolute", top: 6, right: 6, zIndex: 10 },
  btn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, alignItems: "center", justifyContent: "center", marginRight: 5, marginBottom: 5 },
  btnText: { color: "#fff", fontWeight: "700" },
  sentenceBox: {},
  modalBox: {}
});