// SubIconDetail.js
import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  useWindowDimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useRoute } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { speakText } from "../Api/tts-translate-api";
import { themes } from "../theme/theme";
import { normalizeMediaUrl } from "../config/appConfig";

const SubIconDetail = () => {
  const route = useRoute();
  const { subIcon } = route.params;

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const { language: lang, theme } = useContext(AppContext);
  const currentTheme = themes[theme];

  const [title, setTitle] = useState("");
  const [expression, setExpression] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);

  const soundRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!subIcon) return;
    setTitle(subIcon[`title_${lang}`] || subIcon.title_en);
    setExpression(subIcon[`expression_${lang}`] || subIcon.expression_en);
  }, [subIcon, lang]);

  const handleSpeak = async () => {
    if (!expression) return;

    try {
      setSpeaking(true);

      const result = await speakText(expression, lang);
      if (!result?.url) throw new Error("TTS failed");

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
      console.log("TTS error:", err);
      setSpeaking(false);
    }
  };

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setVolumeAsync(volume);
      soundRef.current.setRateAsync(speed, true);
    }
  }, [volume, speed]);

  const pressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  const pressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  // backend uses `imgUrl`, but some code may send `imageUrl`; support both
  const imageUri = normalizeMediaUrl(subIcon?.imgUrl || subIcon?.imageUrl);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: currentTheme.background }]}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.card,
            flexDirection: isMobile ? "column" : "row",
          },
        ]}
      >
        {/* IMAGE */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity onPressIn={pressIn} onPressOut={pressOut}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <FontAwesome5
                name={subIcon.iconName || "image"}
                size={180}
                color={currentTheme.text}
              />
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={[styles.title, { color: currentTheme.text }]}>
            {title}
          </Text>

          <Text style={[styles.expression, { color: currentTheme.text }]}>
            {expression}
          </Text>

          <TouchableOpacity
            style={[styles.speakBtn, { backgroundColor: currentTheme.link }]}
            onPress={handleSpeak}
            disabled={speaking}
          >
            <Text style={styles.speakText}>
              {speaking ? "..." : "🔊 Speak"}
            </Text>
          </TouchableOpacity>

          {/* CONTROLS */}
          <View
            style={[styles.controls, { backgroundColor: currentTheme.muted }]}
          >
            {/* Volume */}
            <View style={styles.sliderBlock}>
              <Text style={{ color: currentTheme.text }}>
                {lang === "ar" ? "الصوت" : "Volume"} —{" "}
                {(volume * 100).toFixed(0)}%
              </Text>
              <Slider
                style={{ width: "100%" }}
                minimumValue={0}
                maximumValue={1}
                step={0.01}
                value={volume}
                onValueChange={setVolume}
              />
            </View>

            {/* Speed */}
            <View style={styles.sliderBlock}>
              <Text style={{ color: currentTheme.text }}>
                {lang === "ar" ? "السرعة" : "Speed"} — {speed.toFixed(2)}x
              </Text>
              <Slider
                style={{ width: "100%" }}
                minimumValue={0.5}
                maximumValue={2}
                step={0.05}
                value={speed}
                onValueChange={setSpeed}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SubIconDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginTop: 90,
  },
  image: {
    width: "100%",
    height: 330,
    borderRadius: 12,
    marginRight: 40,
    marginBottom: 0,
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },
  expression: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  speakBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  speakText: {
    color: "#fff",
    fontWeight: "700",
  },
  controls: {
    padding: 12,
    borderRadius: 8,
  },
  sliderBlock: {
    marginBottom: 14,
  },
});
