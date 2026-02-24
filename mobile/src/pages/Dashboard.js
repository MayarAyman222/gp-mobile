import React, { useState, useEffect, useContext } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from "react-native";
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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllIcons } from "../Api/iconApi";
import { speakText } from "../Api/tts-translate-api";
import { AppContext } from "../context/AppContext";

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
  en: "Welcome to Voxi",
  ar: "مرحبا بك في فوكسى",
  fr: "Bienvenue sur Voxi",
  es: "Bienvenido a Voxi",
};

const Dashboard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const category = route.params?.category || "All";
  const { language: lang, theme } = useContext(AppContext);

  const [icons, setIcons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeOption, setTimeOption] = useState(timeOptionsByLang[lang][0]);
  const [connector, setConnector] = useState(connectorOptionsByLang[lang][0]);
  const [speaking, setSpeaking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newIcon, setNewIcon] = useState({
    title_en: "", expression_en: "",
    title_ar: "", expression_ar: "",
    title_fr: "", expression_fr: "",
    title_es: "", expression_es: "",
    iconName: "", imgUrl: ""
  });

  useEffect(() => {
    const loadIcons = async () => {
      try {
        const data = await getAllIcons(category);
        console.log("Fetched icons:", data);
        setIcons(data);
      } catch (err) {
        console.error("Error loading icons:", err);
      }
    };
    loadIcons();
  }, [category]);

  useEffect(() => {
    setTimeOption(timeOptionsByLang[lang][0]);
    setConnector(connectorOptionsByLang[lang][0]);
  }, [lang]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const generateSentence = () => {
    const expressions = selectedIds
      .map(id => icons.find(i => i.id === id)?.[`expression_${lang}`] || "")
      .filter(Boolean);
    if (!expressions.length) return "";
    return `${timeOption} ${expressions.join(` ${connector} `)}`;
  };

  const handleSpeak = async () => {
    const sentence = generateSentence();
    if (!sentence) return;

    setSpeaking(true);
    try {
      const result = await speakText(sentence, lang);
      const { sound } = await Audio.Sound.createAsync({ uri: result.url });
      await sound.playAsync();
    } catch (e) { console.log(e); }
    finally { setSpeaking(false); }
  };

  const filteredIcons = icons.filter(icon => {
    const title = icon[`title_${lang}`] || "";
    const expr = icon[`expression_${lang}`] || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           expr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  /*const handleIconPress = (icon) => {
    if (icon.subIcons && icon.subIcons.length > 0) {
      navigation.navigate("SubIconDashboard", { parentIcon: icon });
    } else {
      navigation.navigate("IconDetail", { icon });
    }
  };*/
  const handleIconPress = (icon) => {
  if (icon.subIcons && icon.subIcons.length > 0) {
    navigation.navigate("SubIconDashboard", { parentIcon: icon });
  } else {
    navigation.navigate("IconDetail", { iconId: icon.id });
  }
};

  const renderIcon = ({ item }) => {
    const selected = selectedIds.includes(item.id);
    const isDark = theme === "dark";
    return (
      <View style={[styles.card, { backgroundColor: selected ? (isDark?"#3a5a40":"#d4edda") : (isDark?"#222":"#fff") }]}>
        <TouchableOpacity
          style={{ position:"absolute", top:10, right:10, zIndex:10, padding:10 }}
          onPress={() => toggleSelect(item.id)}
        >
          <Text style={{ fontSize:24 }}>{selected ? "✅" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex:1, justifyContent:"center", alignItems:"center" }}
          onPress={() => handleIconPress(item)}
        >
          {item.imgUrl ? (
            <Image
              source={{ uri: item.imgUrl }}
              style={{ width: 95, height: 95, marginTop: 30 }}
              resizeMode="contain"
            />
          ) : item.iconName ? (
            <FontAwesome5
              name={item.iconName}
              size={95}
              color={isDark ? "#fff" : "#000"}
              style={{ textAlign: "center", marginTop: 30 }}
            />
          ) : (
            <View style={{ width: 95, height: 95, marginTop: 30, backgroundColor: "#888", borderRadius: 12 }} />
          )}

          <View style={styles.cardFooter}>
            <Text style={[styles.cardTitle, { color: "#fff" }]}>{item[`title_${lang}`]}</Text>
            <Text style={[styles.cardExpr, { color: isDark?"#ddd":"#fff" }]}>{item[`expression_${lang}`]}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleAddIcon = async () => {
    if (
      !newIcon.title_en.trim() || !newIcon.expression_en.trim() ||
      !newIcon.title_ar.trim() || !newIcon.expression_ar.trim() ||
      !newIcon.title_fr.trim() || !newIcon.expression_fr.trim() ||
      !newIcon.title_es.trim() || !newIcon.expression_es.trim()
    ) {
      alert(lang === "ar" ? "جميع الحقول مطلوبة!" : "All fields are required!");
      return;
    }

    const savedIcon = { ...newIcon, id: Date.now(), category };
    const updatedIcons = [...icons, savedIcon];
    setIcons(updatedIcons);
    try { await AsyncStorage.setItem('icons', JSON.stringify(updatedIcons)); } 
    catch (err) { console.error("Error saving icons locally:", err); }

    setNewIcon({ title_en:"", expression_en:"", title_ar:"", expression_ar:"", title_fr:"", expression_fr:"", title_es:"", expression_es:"", iconName:"", imgUrl:"" });
    setShowModal(false);
  };

  const isDark = theme==="dark";

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark?"#111":"#f8f8f8" }]}>
      <Text style={[styles.title, { color: isDark?"#fff":"#000" }]}>{welcomeByLang[lang]}</Text>
      <Text style={[styles.subtitle, { color: isDark?"#ccc":"#000" }]}>{category}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        <View style={styles.fullControlsRow}>
          <TextInput
            placeholder={lang === "ar" ? "بحث..." : "Search"}
            placeholderTextColor={isDark?"#888":"#555"}
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={[styles.inputRow, { backgroundColor: isDark?"#333":"#fff", color:isDark?"#fff":"#000" }]}
          />

          <Picker
            selectedValue={connector}
            style={[styles.pickerRow, { backgroundColor: isDark?"#444":"#f0f0f0", color:isDark?"#fff":"#000" }]}
            onValueChange={setConnector}
          >
            {connectorOptionsByLang[lang].map(opt => <Picker.Item label={opt} value={opt} key={opt} />)}
          </Picker>

          <Picker
            selectedValue={timeOption}
            style={[styles.pickerRow, { backgroundColor: isDark?"#444":"#f0f0f0", color:isDark?"#fff":"#000" }]}
            onValueChange={setTimeOption}
          >
            {timeOptionsByLang[lang].map(opt => <Picker.Item label={opt} value={opt} key={opt} />)}
          </Picker>

          <TouchableOpacity style={styles.btnRow} onPress={() => setShowModal(true)}>
            <Text style={styles.btnText}>{lang === "ar" ? "أضف أيقونة" : "Add Icon"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnRow} onPress={handleSpeak} disabled={speaking || selectedIds.length===0}>
            <Text style={styles.btnText}>{speaking ? "..." : "🔊 Speak"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {selectedIds.length > 0 && (
        <View style={[styles.sentenceBox, { backgroundColor: isDark?"#333":"#eee" }]}>
          <Text style={{ color:isDark?"#fff":"#000" }}>{generateSentence()}</Text>
        </View>
      )}

      <FlatList
        data={filteredIcons}
        renderItem={renderIcon}
        keyExtractor={item => item.id.toString()}
        numColumns={width > 900 ? 4 : 2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ paddingBottom: 50 }}
      />

      <Modal visible={showModal} animationType="slide" transparent>
        <ScrollView
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          <View style={[styles.modalBox, { backgroundColor: isDark?"#222":"#fff" }]}>
            <Text style={{ fontWeight:"700", marginBottom:10, color:isDark?"#fff":"#000" }}>Enter Icon Details</Text>

            {["en","ar","fr","es"].map(l => (
              <View key={l} style={{ marginBottom:10 }}>
                <TextInput
                  placeholder={`Title (${l.toUpperCase()})`}
                  placeholderTextColor={isDark?"#888":"#555"}
                  value={newIcon[`title_${l}`]}
                  onChangeText={v => setNewIcon({...newIcon, [`title_${l}`]:v})}
                  style={[styles.input, { backgroundColor:isDark?"#333":"#f0f0f0", color:isDark?"#fff":"#000" }]}
                />
                <TextInput
                  placeholder={`Expression (${l.toUpperCase()})`}
                  placeholderTextColor={isDark?"#888":"#555"}
                  value={newIcon[`expression_${l}`]}
                  onChangeText={v => setNewIcon({...newIcon, [`expression_${l}`]:v})}
                  style={[styles.input, { backgroundColor:isDark?"#333":"#f0f0f0", color:isDark?"#fff":"#000" }]}
                />
              </View>
            ))}

            <TextInput
              placeholder="Icon name (FontAwesome5)"
              placeholderTextColor={isDark?"#888":"#555"}
              value={newIcon.iconName}
              onChangeText={v => setNewIcon({...newIcon, iconName:v})}
              style={[styles.input, { backgroundColor:isDark?"#333":"#f0f0f0", color:isDark?"#fff":"#000" }]}
            />

            <TextInput
              placeholder="Image URL"
              placeholderTextColor={isDark?"#888":"#555"}
              value={newIcon.imgUrl}
              onChangeText={v => setNewIcon({...newIcon, imgUrl:v})}
              style={[styles.input, { backgroundColor:isDark?"#333":"#f0f0f0", color:isDark?"#fff":"#000" }]}
            />

            <TouchableOpacity style={styles.btn} onPress={handleAddIcon}>
              <Text style={styles.btnText}>{lang === "ar" ? "أضف أيقونة" : "Add Icon"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, { backgroundColor:"#6c757d" }]} onPress={()=>setShowModal(false)}>
              <Text style={styles.btnText}>{lang === "ar" ? "إلغاء" : "Cancel"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title:{ fontSize:28, fontWeight:"800", textAlign:"center" },
  subtitle:{ textAlign:"center", marginBottom:20 },
  fullControlsRow:{ flexDirection:"row", alignItems:"center", gap:10 },
  inputRow:{ width:150, borderWidth:1, borderRadius:8, padding:10 },
  pickerRow:{ height:40, width:120, borderRadius:8 },
  btnRow:{ backgroundColor:"#0d6efd", paddingVertical:12, paddingHorizontal:16, borderRadius:8, justifyContent:"center", alignItems:"center" },
  btn:{ backgroundColor:"#0d6efd", padding:12, borderRadius:8, alignItems:"center", marginBottom:10 },
  btnText:{ color:"#fff", fontWeight:"700" },
  sentenceBox:{ padding:10, borderRadius:8, marginVertical:10 },
  card:{ width:CARD_WIDTH, height:220, borderRadius:12, overflow:"hidden" },
  cardFooter:{ position:"absolute", bottom:0, width:"100%", backgroundColor:"rgba(0,0,0,0.6)", padding:6 },
  cardTitle:{ color:"#fff", fontWeight:"700" },
  cardExpr:{ color:"#fff", fontSize:12 },
  modalBox:{ margin:20, padding:20, borderRadius:10, gap:10 },
  input:{ padding:10, borderRadius:8, marginBottom:5 }
});