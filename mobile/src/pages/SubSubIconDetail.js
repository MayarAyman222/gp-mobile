import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useRoute } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { speakText } from "../Api/tts-translate-api";
import { themes } from "../theme/theme";
import { APP_CONFIG, normalizeMediaUrl } from "../config/appConfig";

const SubSubIconDetail = () => {
  const route = useRoute();
  const { subSubIcon, parentSubIcon, parentIcon } = route.params || {};
  const { width } = useWindowDimensions();
  const { language: lang, theme } = useContext(AppContext);

  const currentTheme = themes[theme] || themes.light;
  const isMobile = width < 768;
  const soundRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [title, setTitle] = useState("");
  const [expression, setExpression] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!subSubIcon) return;

    setTitle(subSubIcon[`title_${lang}`] || subSubIcon.title_en || "");
    setExpression(
      subSubIcon[`expression_${lang}`] || subSubIcon.expression_en || "",
    );
  }, [lang, subSubIcon]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setVolumeAsync(volume);
      soundRef.current.setRateAsync(speed, true);
    }
  }, [speed, volume]);

  const handleSpeak = async () => {
    if (!expression) return;

    try {
      setSpeaking(true);

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });

      const result = await speakText(expression, lang);
      if (!result?.url) throw new Error("TTS failed");

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync({
        uri: normalizeMediaUrl(result.url),
      });

      soundRef.current = sound;
      await sound.setVolumeAsync(volume);
      await sound.setRateAsync(speed, true);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setSpeaking(false);
        }
      });
    } catch (error) {
      console.log("SubSubIcon detail TTS error:", error);
      setSpeaking(false);
    }
  };

  const pressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();

  const pressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

  const imageUri = normalizeMediaUrl(
    subSubIcon?.imgUrl || subSubIcon?.imageUrl,
    APP_CONFIG.contentApiBaseUrl,
  );

  const parentSubIconTitle =
    parentSubIcon?.[`title_${lang}`] || parentSubIcon?.title_en || "";
  const parentIconTitle =
    parentIcon?.[`title_${lang}`] || parentIcon?.title_en || "";

  if (!subSubIcon) {
    return (
      <View
        style={[styles.emptyState, { backgroundColor: currentTheme.background }]}
      >
        <Text style={{ color: currentTheme.text }}>No data found.</Text>
      </View>
    );
  }

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
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity onPressIn={pressIn} onPressOut={pressOut}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.imageFallback}>
                <FontAwesome5 name="image" size={140} color={currentTheme.text} />
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: currentTheme.text }]}>{title}</Text>

          {parentSubIconTitle || parentIconTitle ? (
            <Text style={[styles.subtitle, { color: currentTheme.text }]}>
              {[parentIconTitle, parentSubIconTitle].filter(Boolean).join(" / ")}
            </Text>
          ) : null}

          <Text style={[styles.expression, { color: currentTheme.text }]}>
            {expression}
          </Text>

          <TouchableOpacity
            style={[styles.speakBtn, { backgroundColor: currentTheme.link }]}
            onPress={handleSpeak}
            disabled={speaking}
          >
            <Text style={styles.speakText}>{speaking ? "..." : "Speak"}</Text>
          </TouchableOpacity>

          <View
            style={[styles.controls, { backgroundColor: currentTheme.muted }]}
          >
            <View style={styles.sliderBlock}>
              <Text style={{ color: currentTheme.text }}>
                {lang === "ar" ? "الصوت" : "Volume"} - {(volume * 100).toFixed(0)}%
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

            <View style={styles.sliderBlock}>
              <Text style={{ color: currentTheme.text }}>
                {lang === "ar" ? "السرعة" : "Speed"} - {speed.toFixed(2)}x
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

export default SubSubIconDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  },
  imageFallback: {
    width: 280,
    height: 330,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.8,
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
