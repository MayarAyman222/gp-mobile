import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";
import { APP_CONFIG, normalizeMediaUrl } from "../config/appConfig";
import { speakText } from "../Api/tts-translate-api";
import { getSubIconById } from "../Api/iconApi";
import { FontAwesome5 } from "@expo/vector-icons";
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

const reorderCategories = ["Food and Drink", "Medicine"];
const isLocalMediaUri = (uri = "") =>
  typeof uri === "string" &&
  (uri.startsWith("file:") ||
    uri.startsWith("content:") ||
    uri.startsWith("blob:"));

const blurActiveElementOnWeb = () => {
  if (Platform.OS !== "web") return;

  const activeElement = globalThis.document?.activeElement;
  if (activeElement && typeof activeElement.blur === "function") {
    activeElement.blur();
  }
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

export default function SubIconDashboard() {
  const route = useRoute();
  const navigation = useNavigation();
  const { parentIcon } = route.params;
  const { language: lang, theme } = useContext(AppContext);
  const currentTheme = themes[theme];

  const [mainIcon, setMainIcon] = useState(parentIcon || null);
  const [subIcons, setSubIcons] = useState(parentIcon.subIcons || []);
  const [orderedIcons, setOrderedIcons] = useState(parentIcon.subIcons || []);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeOption, setTimeOption] = useState(timeOptionsByLang[lang][0]);
  const [connector, setConnector] = useState(connectorOptionsByLang[lang][0]);
  const [speaking, setSpeaking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const recordingRef = useRef(null);
  const [imageMethod, setImageMethod] = useState("upload"); // upload | url | camera
  const [audioMethod, setAudioMethod] = useState("upload"); // upload | url | record

  const [newSubIcon, setNewSubIcon] = useState({
    title_en: "",
    expression_en: "",
    title_ar: "",
    expression_ar: "",
    title_fr: "",
    expression_fr: "",
    title_es: "",
    expression_es: "",
    category: parentIcon.category || "",
    imgUrl: "",
    audioUrl: "",
  });

  useEffect(() => {
    setTimeOption(timeOptionsByLang[lang][0]);
    setConnector(connectorOptionsByLang[lang][0]);
  }, [lang]);

  useEffect(() => {
    const enableReorder = reorderCategories.includes(parentIcon.category);
    if (!enableReorder) {
      setOrderedIcons(subIcons);
      return;
    }
    (async () => {
      try {
        const key = `subicon_order_${parentIcon.id}`;
        const saved = await AsyncStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          const reordered = parsed
            .map((id) => subIcons.find((s) => s.id === id))
            .filter(Boolean);
          const missing = subIcons.filter((s) => !parsed.includes(s.id));
          setOrderedIcons([...reordered, ...missing]);
        } else {
          setOrderedIcons(subIcons);
        }
      } catch {
        setOrderedIcons(subIcons);
      }
    })();
  }, [subIcons, parentIcon]);

  const filteredSubIcons = orderedIcons.filter((icon) => {
    const t = icon[`title_${lang}`] || "";
    const e = icon[`expression_${lang}`] || "";
    return (
      t.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleSelect = (id) => {
    setSelectedIds((p) =>
      p.includes(id) ? p.filter((i) => i !== id) : [...p, id],
    );
  };

  const openSubIcon = async (item) => {
    const navigateWithItem = (resolvedItem) => {
      blurActiveElementOnWeb();

      if (resolvedItem?.subSubIcons?.length) {
        navigation.navigate("SubSubIcon", {
          parentSubIcon: resolvedItem,
          parentIcon: mainIcon,
        });
        return;
      }

      navigation.navigate("SubIconDetail", { subIcon: resolvedItem });
    };

    if (item?.subSubIcons?.length) {
      navigateWithItem(item);
      return;
    }

    try {
      const detailedSubIcon = await getSubIconById(mainIcon.id, item.id);
      const resolvedItem = detailedSubIcon || item;

      setSubIcons((previous) =>
        previous.map((subIcon) =>
          subIcon.id === resolvedItem.id ? resolvedItem : subIcon,
        ),
      );
      setOrderedIcons((previous) =>
        previous.map((subIcon) =>
          subIcon.id === resolvedItem.id ? resolvedItem : subIcon,
        ),
      );

      navigateWithItem(resolvedItem);
    } catch (error) {
      console.log("Failed to load sub icon details", error);
      navigateWithItem(item);
    }
  };

  const generateSentence = () => {
    const expressions = selectedIds
      .map((id) => orderedIcons.find((i) => i.id === id)?.[`expression_${lang}`])
      .filter(Boolean);
    if (!expressions.length) return "";
    const mainExpr = mainIcon?.[`expression_${lang}`] || "";
    return `${timeOption} ${mainExpr} ${connector} ${expressions.join(` ${connector} `)}`;
  };

  /*const handleSpeak = async () => {
    const sentence = generateSentence();
    if (!sentence) return;
    const enableReorder = reorderCategories.includes(mainIcon.category);

    setSpeaking(true);
    try {
      const result = await speakText(sentence, lang);
      console.log("TTS result:", result);
      if (result?.url) {
        const audioUrl = normalizeMediaUrl(result.url);
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        await sound.playAsync();
        await sound.unloadAsync();
      } else {
        alert(
          lang === "ar"
            ? "لم يتم استلام رابط الصوت من الخادم."
            : "No audio URL returned from server."
        );
      }
    } catch (e) {
      console.log("TTS error", e);
      alert(
        lang === "ar"
          ? "تعذر تشغيل الصوت. تحقق من اتصال السيرفر."
          : "Could not play audio. Check server connectivity."
      );
    } finally {
      setSpeaking(false);
    }

    if (enableReorder) {
      setOrderedIcons((prev) => {
        const spoken = prev.filter((i) => selectedIds.includes(i.id));
        const rest = prev.filter((i) => !selectedIds.includes(i.id));
        const newOrder = [...rest, ...spoken];
        AsyncStorage.setItem(
          `subicon_order_${mainIcon.id}`,
          JSON.stringify(newOrder.map((i) => i.id)),
        ).catch(() => {});
        return newOrder;
      });
    }
    setSelectedIds([]);
  };*/
const handleSpeak = async () => {
  const sentence = generateSentence();
  if (!sentence) return;

  const enableReorder = reorderCategories.includes(mainIcon.category);
  setSpeaking(true);

  try {
    // مهم عشان الصوت يشتغل حتى لو الموبايل silent
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });

    const result = await speakText(sentence, lang);
    console.log("TTS result:", result);

    if (result?.url) {
      const audioUrl = normalizeMediaUrl(result.url);

      console.log("Final audio URL:", audioUrl); // debug

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true } // 👈 يشغل مباشرة
      );

      // 👇 نستنى لحد ما يخلص
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });

    } else {
      alert(
        lang === "ar"
          ? "لم يتم استلام رابط الصوت من الخادم."
          : "No audio URL returned from server."
      );
    }
  } catch (e) {
    console.log("TTS error", e);
    alert(
      lang === "ar"
        ? "تعذر تشغيل الصوت. تحقق من اتصال السيرفر."
        : "Could not play audio. Check server connectivity."
    );
  } finally {
    setSpeaking(false);
  }

  // reorder logic زي ما هو
  if (enableReorder) {
    setOrderedIcons((prev) => {
      const spoken = prev.filter((i) => selectedIds.includes(i.id));
      const rest = prev.filter((i) => !selectedIds.includes(i.id));
      const newOrder = [...rest, ...spoken];

      AsyncStorage.setItem(
        `subicon_order_${mainIcon.id}`,
        JSON.stringify(newOrder.map((i) => i.id))
      ).catch(() => {});

      return newOrder;
    });
  }

  setSelectedIds([]);
};
  const pickImage = async () => {
    const useCamera = imageMethod === "camera";
    const perm = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== "granted") {
      alert(lang === "ar" ? "يجب منح إذن الكاميرا/المعرض" : "Permission needed");
      return;
    }
    const result = useCamera
      ? await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      const asset = result.assets[0];
      setNewSubIcon((p) => ({ ...p, imgUrl: asset.uri }));
      setImagePreview(asset.uri);
      setImageFile(asset.file ?? null);
    }
  };

  const recordAudio = async () => {
    // يفتح اختيار ملف صوتي (يمكن للمستخدم تسجيل من تطبيق النظام ثم يختاره)
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== "granted") {
      alert(lang === "ar" ? "يجب منح إذن الوصول للملفات" : "Permission needed");
      return;
    }
    const res = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (!res.canceled && res.assets?.length) {
      const asset = res.assets[0];
      setNewSubIcon((p) => ({ ...p, audioUrl: asset.uri }));
      setAudioPreview(asset.uri);
      setAudioFile(asset.file ?? null);
    }
  };

  const stopRecording = async () => {
    if (!recordingRef.current) return;
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      setNewSubIcon((p) => ({ ...p, audioUrl: uri }));
      setAudioPreview(uri);
    } catch (e) {
      console.log(e);
    } finally {
      recordingRef.current = null;
    }
  };

  const handleAddSubIcon = async () => {
    const allFilled =
      ["en", "ar", "fr", "es"].every(
        (l) =>
          newSubIcon[`title_${l}`].trim() &&
          newSubIcon[`expression_${l}`].trim(),
      );
    if (!allFilled) {
      alert(lang === "ar" ? "جميع الحقول مطلوبة!" : "All fields are required!");
      return;
    }
    setIsSubmitting(true);
    const fd = new FormData();
    fd.append("title_en", newSubIcon.title_en);
    fd.append("title_ar", newSubIcon.title_ar);
    fd.append("title_fr", newSubIcon.title_fr);
    fd.append("title_es", newSubIcon.title_es);
    fd.append("expression_en", newSubIcon.expression_en);
    fd.append("expression_ar", newSubIcon.expression_ar);
    fd.append("expression_fr", newSubIcon.expression_fr);
    fd.append("expression_es", newSubIcon.expression_es);
    fd.append("category", parentIcon.category || "");

    if (imageFile) {
      fd.append("image", imageFile);
    } else if (newSubIcon.imgUrl && isLocalMediaUri(newSubIcon.imgUrl)) {
      if (Platform.OS === "web" && newSubIcon.imgUrl.startsWith("blob:")) {
        alert("Please pick the image again before saving.");
        setIsSubmitting(false);
        return;
      }

      fd.append("image", {
        uri: newSubIcon.imgUrl,
        name: "image.jpg",
        type: "image/jpeg",
      });
    } else if (newSubIcon.imgUrl) {
      fd.append("imageUrl", newSubIcon.imgUrl);
    }

    if (audioFile) {
      fd.append("audio", audioFile);
    } else if (newSubIcon.audioUrl && isLocalMediaUri(newSubIcon.audioUrl)) {
      if (Platform.OS === "web" && newSubIcon.audioUrl.startsWith("blob:")) {
        alert("Please pick the audio again before saving.");
        setIsSubmitting(false);
        return;
      }

      fd.append("audio", {
        uri: newSubIcon.audioUrl,
        name: "audio.m4a",
        type: "audio/m4a",
      });
    } else if (newSubIcon.audioUrl) {
      fd.append("audioUrl", newSubIcon.audioUrl);
    }

    try {
      const res = await fetch(
        `${APP_CONFIG.contentApiUrl.replace(/\/$/, "")}/icons/${parentIcon.id}/subicons`,
        {
          method: "POST",
          body: fd,
        },
      );
      const created = await res.json();
      setSubIcons((prev) => [...prev, created]);
      setOrderedIcons((prev) => [...prev, created]);
      blurActiveElementOnWeb();
      setShowModal(false);
      setNewSubIcon({
        title_en: "",
        expression_en: "",
        title_ar: "",
        expression_ar: "",
        title_fr: "",
        expression_fr: "",
        title_es: "",
        expression_es: "",
        category: parentIcon.category || "",
        imgUrl: "",
        audioUrl: "",
      });
      setImagePreview(null);
      setAudioPreview(null);
      setImageFile(null);
      setAudioFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add SubIcon");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mainIcon) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderIcon = ({ item }) => {
    const selected = selectedIds.includes(item.id);
    const hasAnySelection = selectedIds.length > 0;
    const rawImageUri = item?.imgUrl || item?.imageUrl;
    const imageUri = rawImageUri?.startsWith("blob:")
      ? null
      : normalizeMediaUrl(rawImageUri, APP_CONFIG.contentApiBaseUrl);
    return (
      <SelectableZoomCard selected={selected} hasAnySelection={hasAnySelection}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: selected ? "#d4edda" : currentTheme.card,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.check}
          onPress={() => toggleSelect(item.id)}
        >
          <Text style={{ fontSize: 22 }}>{selected ? "✔" : "◯"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={() => openSubIcon(item)}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome5
              name={item.iconName || "image"}
              size={72}
              color={currentTheme.text}
              style={{ marginVertical: 16 }}
            />
          )}
          <View style={styles.cardFooter}>
            <Text style={[styles.cardTitle, { color: currentTheme.text }]}>
              {item[`title_${lang}`] || item.title_en}
            </Text>
            <Text style={[styles.cardExpr, { color: currentTheme.text }]}>
              {item[`expression_${lang}`] || item.expression_en}
            </Text>
            {item?.subSubIcons?.length ? (
              <Text style={[styles.cardExpr, { color: currentTheme.link || "#0d6efd" }]}>
                {lang === "ar" ? "افتح تفاصيل أكثر" : "Open more options"}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
      </SelectableZoomCard>
    );
  };

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: currentTheme.background }}>
      <Text style={[styles.title, { color: currentTheme.text }]}>{mainIcon[`title_${lang}`] || mainIcon.title_en}</Text>

      <View style={styles.controls}>
        <TextInput
          placeholder={lang === "ar" ? "بحث" : "Search"}
          placeholderTextColor={currentTheme.text}
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={[
            styles.input,
            { backgroundColor: currentTheme.card, color: currentTheme.text },
          ]}
        />

        <Picker
          selectedValue={connector}
          onValueChange={setConnector}
          style={[styles.picker, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
        >
          {connectorOptionsByLang[lang].map((o) => (
            <Picker.Item key={o} label={o} value={o} />
          ))}
        </Picker>

        <Picker
          selectedValue={timeOption}
          onValueChange={setTimeOption}
          style={[styles.picker, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
        >
          {timeOptionsByLang[lang].map((o) => (
            <Picker.Item key={o} label={o} value={o} />
          ))}
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
          <Text style={styles.btnText}>
            {lang === "ar" ? "أضف أيقونة فرعية" : "Add SubIcon"}
          </Text>
        </TouchableOpacity>
      </View>

      {selectedIds.length > 0 && (
        <View
          style={[
            styles.sentenceBox,
            { backgroundColor: currentTheme.card },
          ]}
        >
          <Text style={{ color: currentTheme.text }}>{generateSentence()}</Text>
        </View>
      )}

    <FlatList
  data={filteredSubIcons}
  renderItem={renderIcon}
  keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())} 
  numColumns={width > 900 ? 4 : 2}
  columnWrapperStyle={{ gap: 10 }}
  contentContainerStyle={{ paddingBottom: 50 }}
/>
      {/* Add SubIcon Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center" }}>
          <ScrollView
            style={{ maxHeight: "90%" }}
            contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
          >
            <View style={[styles.modalBox, { backgroundColor: currentTheme.card }]}>
              <Text style={[styles.modalTitle, { color: currentTheme.text }]}>Add SubIcon</Text>

            {["en", "ar", "fr", "es"].map((l) => (
              <View key={l} style={{ marginBottom: 10 }}>
                <TextInput
                  placeholder={`Title (${l.toUpperCase()})`}
                  placeholderTextColor={currentTheme.text}
                  value={newSubIcon[`title_${l}`]}
                  onChangeText={(v) => setNewSubIcon({ ...newSubIcon, [`title_${l}`]: v })}
                  style={[styles.input, { backgroundColor: currentTheme.background, color: currentTheme.text }]}
                />
                <TextInput
                  placeholder={`Expression (${l.toUpperCase()})`}
                  placeholderTextColor={currentTheme.text}
                  value={newSubIcon[`expression_${l}`]}
                  onChangeText={(v) => setNewSubIcon({ ...newSubIcon, [`expression_${l}`]: v })}
                  style={[styles.input, { backgroundColor: currentTheme.background, color: currentTheme.text }]}
                />
              </View>
            ))}

           {/* <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Image</Text>
            <Picker
              selectedValue={imageMethod}
              onValueChange={setImageMethod}
              style={[styles.pickerWide, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
            >
              <Picker.Item label="Upload" value="upload" />
              <Picker.Item label="URL" value="url" />
              <Picker.Item label="Camera" value="camera" />
            </Picker>

            {imageMethod === "upload" || imageMethod === "camera" ? (
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: currentTheme.link }]}
                onPress={pickImage}
              >
                <Text style={styles.btnText}>
                  {imageMethod === "camera" ? "Open Camera" : "Pick from Gallery"}
                </Text>
              </TouchableOpacity>
            ) : null}

            {imageMethod === "url" ? (
              <TextInput
                placeholder="Image URL"
                placeholderTextColor={currentTheme.text}
                value={
                  newSubIcon.imgUrl && !isLocalMediaUri(newSubIcon.imgUrl)
                    ? newSubIcon.imgUrl
                    : ""
                }
                onChangeText={(v) => {
                  setNewSubIcon((p) => ({ ...p, imgUrl: v }));
                  setImagePreview(v);
                  setImageFile(null);
                }}
                style={[styles.input, { backgroundColor: currentTheme.background, color: currentTheme.text }]}
              />
            ) : null}

            <TouchableOpacity
              style={[styles.btn, { backgroundColor: currentTheme.muted || "#6c757d" }]}
              onPress={() => {
                setNewSubIcon((p) => ({ ...p, imgUrl: "" }));
                setImagePreview(null);
                setImageFile(null);
              }}
            >
              <Text style={styles.btnText}>Clear</Text>
            </TouchableOpacity>
            {imagePreview ? (
              <Image source={{ uri: imagePreview }} style={{ width: 200, height: 140, alignSelf: "center", borderRadius: 8 }} />
            ) : null}*/}
            <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Image</Text>
<Picker
  selectedValue={imageMethod}
  onValueChange={async (value) => {
    setImageMethod(value);

    if (value === "camera") {
      // فتح الكاميرا مباشرة عند اختيارها
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (perm.status !== "granted") {
        alert(lang === "ar" ? "يجب منح إذن الكاميرا" : "Camera permission needed");
        setImageMethod("upload"); // ارجع للـ upload لو مرفوض
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setNewSubIcon((p) => ({ ...p, imgUrl: asset.uri }));
        setImagePreview(asset.uri);
        setImageFile(asset.file ?? null);
      }

      setImageMethod("camera"); // رجع القيمة بعد التقاط الصورة
    }
  }}
  style={[styles.pickerWide, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
>
  <Picker.Item label="Upload" value="upload" />
  <Picker.Item label="URL" value="url" />
  <Picker.Item label="Camera" value="camera" />
</Picker>

{/* زر Upload موجود فقط لو الطريقة Upload */}
{imageMethod === "upload" && (
  <TouchableOpacity
    style={[styles.btn, { backgroundColor: currentTheme.link }]}
    onPress={pickImage} // picker من المعرض
  >
    <Text style={styles.btnText}>Pick from Gallery</Text>
  </TouchableOpacity>
)}

{/* input URL فقط لو الطريقة URL */}
{imageMethod === "url" && (
  <TextInput
    placeholder="Image URL"
    placeholderTextColor={currentTheme.text}
    value={
      newSubIcon.imgUrl && !isLocalMediaUri(newSubIcon.imgUrl)
        ? newSubIcon.imgUrl
        : ""
    }
    onChangeText={(v) => {
      setNewSubIcon((p) => ({ ...p, imgUrl: v }));
      setImagePreview(v);
      setImageFile(null);
    }}
    style={[styles.input, { backgroundColor: currentTheme.background, color: currentTheme.text }]}
  />
)}

{/* زر Clear مشروط لو فيه صورة */}
{imagePreview && (
  <TouchableOpacity
    style={[styles.btn, { backgroundColor: currentTheme.muted || "#6c757d" }]}
    onPress={() => {
      setNewSubIcon((p) => ({ ...p, imgUrl: "" }));
      setImagePreview(null);
      setImageFile(null);
    }}
  >
    <Text style={styles.btnText}>Clear</Text>
  </TouchableOpacity>
)}

{/* عرض الصورة */}
{imagePreview && (
  <Image
    source={{ uri: imagePreview }}
    style={{ width: 200, height: 290, alignSelf: "center", borderRadius: 8 }}
  />
)}

            <Text style={[styles.sectionTitle, { color: currentTheme.text, marginTop: 10 }]}>Audio</Text>
            <Picker
              selectedValue={audioMethod}
              onValueChange={setAudioMethod}
              style={[styles.pickerWide, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
            >
              <Picker.Item label="Upload" value="upload" />
              <Picker.Item label="URL" value="url" />
              <Picker.Item label="Record (system)" value="record" />
            </Picker>

            {audioMethod === "upload" ? (
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: currentTheme.link }]}
                onPress={recordAudio}
              >
                <Text style={styles.btnText}>Pick audio file</Text>
              </TouchableOpacity>
            ) : null}

            {audioMethod === "record" ? (
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: currentTheme.link }]}
                onPress={recordAudio}
              >
                <Text style={styles.btnText}>Open Recorder / Pick recording</Text>
              </TouchableOpacity>
            ) : null}

            {audioMethod === "url" ? (
              <TextInput
                placeholder="Audio URL"
                placeholderTextColor={currentTheme.text}
                value={
                  newSubIcon.audioUrl && !isLocalMediaUri(newSubIcon.audioUrl)
                    ? newSubIcon.audioUrl
                    : ""
                }
                onChangeText={(v) => {
                  setNewSubIcon((p) => ({ ...p, audioUrl: v }));
                  setAudioPreview(v);
                  setAudioFile(null);
                }}
                style={[styles.input, { backgroundColor: currentTheme.background, color: currentTheme.text }]}
              />
            ) : null}

            <TouchableOpacity
              style={[styles.btn, { backgroundColor: currentTheme.muted || "#6c757d" }]}
              onPress={() => {
                setNewSubIcon((p) => ({ ...p, audioUrl: "" }));
                setAudioPreview(null);
                setAudioFile(null);
              }}
            >
              <Text style={styles.btnText}>Clear</Text>
            </TouchableOpacity>
            {audioPreview ? (
              <Text style={{ color: currentTheme.text, textAlign: "center", marginTop: 6 }}>
                Audio ready ({isLocalMediaUri(audioPreview) ? "local" : "url"})
              </Text>
            ) : null}

            <TouchableOpacity
              style={[styles.btn, { backgroundColor: currentTheme.success, marginTop: 12 }]}
              onPress={handleAddSubIcon}
              disabled={isSubmitting}
            >
              <Text style={styles.btnText}>{isSubmitting ? "Saving..." : "Save"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, { backgroundColor: currentTheme.muted || "#6c757d" }]}
              onPress={() => {
                blurActiveElementOnWeb();
                setShowModal(false);
              }}
            >
              <Text style={styles.btnText}>{lang === "ar" ? "إلغاء" : "Cancel"}</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "800", textAlign: "center", marginBottom: 8 },
  controls: { flexDirection: "row", marginBottom: 10, flexWrap: "wrap", gap: 6 },
  input: { padding: 10, borderRadius: 8, width: 160, borderWidth: 1, borderColor: "#ccc" },
  picker: { width: 130, borderWidth: 1, borderColor: "#ccc" },
  pickerWide: { width: "100%", borderWidth: 1, borderColor: "#ccc", marginBottom: 8 },
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: CARD_WIDTH, height: 160, borderRadius: 12 },
  cardFooter: { position: "absolute", bottom: 0, width: "100%", padding: 6 },
  cardTitle: { fontWeight: "700" },
  cardExpr: { fontSize: 12 },
  check: { position: "absolute", top: 6, right: 6, zIndex: 10 },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginBottom: 5,
  },
  btnText: { color: "#fff", fontWeight: "700" },
  sentenceBox: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
  },
  modalBox: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontWeight: "800", fontSize: 18, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginTop: 8 },
});
