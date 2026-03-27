// IconDetail.js
import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { normalizeMediaUrl } from "../config/appConfig"; // adjust path if needed
import Slider from '@react-native-community/slider';
import { Audio } from "expo-av";
import { useRoute } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { getIconById } from "../Api/iconApi";
import { speakText } from "../Api/tts-translate-api";

const IconDetail = () => {
  const route = useRoute();
  const iconParam = route.params?.icon;
  const iconId = route.params?.iconId || iconParam?.id;

  const { language: lang, theme } = useContext(AppContext);

  const [icon, setIcon] = useState(null);
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayExpression, setDisplayExpression] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);

  const soundRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // === FETCH LOGIC (keep exactly the same) ===
  const fetchIcon = async () => {
    try {
      if (!iconId) {
        setError(lang === "ar" ? "معرف الأيقونة مفقود" : "Icon ID is missing");
        setLoading(false);
        return;
      }

      console.log("Fetching icon with ID:", iconId);
      const data = await getIconById(iconId);
      console.log("Icon data fetched:", data);

      if (data.icon) setIcon(data.icon);
      else setIcon(data);

      if (!data) setError(lang === "ar" ? "لم يتم العثور على الأيقونة" : "Icon not found");
    } catch (err) {
      console.error("Error fetching icon:", err);
      setError(lang === "ar" ? "فشل في تحميل الأيقونة" : "Failed to load icon");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If the full icon object is already provided (e.g., from Home), avoid a redundant fetch.
    if (iconParam && !iconId) {
      setIcon(iconParam);
      setLoading(false);
      return;
    }
    fetchIcon();
  }, [iconId, iconParam]);

  // Update displayTitle & displayExpression
  useEffect(() => {
    if (!icon) return;
    setDisplayTitle(icon[`title_${lang}`] || icon.title_en || "No Title");
    setDisplayExpression(icon[`expression_${lang}`] || icon.expression_en || "No Expression");
  }, [icon, lang]);

  // TTS
  const handleSpeak = async () => {
    if (!displayExpression) return;

    try {
      setSpeaking(true);
      const result = await speakText(displayExpression, lang);
      if (!result.ok) throw new Error("TTS failed");

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync({ uri: result.url });
      soundRef.current = sound;
      await sound.setVolumeAsync(volume);
      await sound.setRateAsync(speed, true);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) setSpeaking(false);
      });
    } catch (err) {
      console.error("Speak error:", err);
      setSpeaking(false);
    }
  };

  // Update volume & speed dynamically
  useEffect(() => {
    const updateSound = async () => {
      if (soundRef.current) {
        await soundRef.current.setVolumeAsync(volume);
        await soundRef.current.setRateAsync(speed, true);
      }
    };
    updateSound();
  }, [volume, speed]);

  // Animated press
  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 1.05, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#0d6efd" />
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
    </View>
  );

  // Theme
  const bgColor = theme === "dark" ? "#232323" : theme === "high-contrast" ? "#000" : "#f8f9fa";
  const textColor = theme === "dark" ? "#f7f7f7" : theme === "high-contrast" ? "#ffff00" : "#212529";
  const cardBg = theme === "dark" ? "#2c2c2c" : theme === "high-contrast" ? "#000" : "#fff";
  const controlBg = theme === "dark" ? "#2c2c2c" : theme === "high-contrast" ? "#000" : "#343a40";

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        {/* Icon */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.8} onPressIn={handlePressIn} onPressOut={handlePressOut}>
           {icon.imgUrl ? (
           <Image
            source={{ uri: normalizeMediaUrl(icon.imgUrl) }}
             style={styles.image}
            resizeMode="cover"
            />
           ) : (
  <FontAwesome5 name={icon.iconName} size={150} color={textColor} />
        )}
          </TouchableOpacity>
        </Animated.View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.title, { color: textColor }]}>{displayTitle}</Text>
          <Text style={[styles.expression, { color: textColor }]}>{displayExpression}</Text>

          <TouchableOpacity
            style={[styles.speakBtn, { backgroundColor: theme === "dark" ? "#0d6efd" : "#007bff" }]}
            onPress={handleSpeak}
            disabled={speaking || !displayExpression}
          >
            <Text style={styles.speakText}>{speaking ? (lang === "ar" ? "يتحدث..." : "Speaking...") : "🔊 Speak"}</Text>
          </TouchableOpacity>

          {/* Controls */}
          <View style={[styles.controls, { backgroundColor: controlBg }]}>
            <View style={styles.sliderRow}>
              <Text style={{ color: textColor, width: 60 }}>{lang === "ar" ? "الصوت" : "Volume"}</Text>
              <Slider style={{ flex: 1 }} minimumValue={0} maximumValue={1} step={0.01} value={volume} onValueChange={setVolume} />
              <Text style={{ color: textColor, width: 40 }}>{(volume * 100).toFixed(0)}%</Text>
            </View>
            <View style={styles.sliderRow}>
              <Text style={{ color: textColor, width: 60 }}>{lang === "ar" ? "السرعة" : "Speed"}</Text>
              <Slider style={{ flex: 1 }} minimumValue={0.5} maximumValue={2} step={0.05} value={speed} onValueChange={setSpeed} />
              <Text style={{ color: textColor, width: 40 }}>{speed.toFixed(2)}x</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default IconDetail;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 90 },
  card: { flexDirection: "row", padding: 16, borderRadius: 12, gap: 20, alignItems: "flex-start", marginTop:230 },
  image: { width: 200, height: 220, borderRadius: 12 },
  content: { flex: 1 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 6 },
  expression: { fontSize: 18, marginBottom: 12 },
  speakBtn: { padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  speakText: { color: "#fff", fontWeight: "700" },
  controls: { padding: 12, borderRadius: 8 },
  sliderRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
});
