import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";
import { normalizeMediaUrl } from "../config/appConfig";
import { recognizeDrawing, speakText } from "../Api/tts-translate-api";

const BOARD_HEIGHT = 260;
const PREVIEW_HEIGHT = 180;

const LANGUAGES = [
  { value: "ar-EG", label: "العربية (مصر)" },
  { value: "ar-SA", label: "العربية (السعودية)" },
  { value: "en-US", label: "English (US)" },
  { value: "fr-FR", label: "Français" },
  { value: "es-ES", label: "Español" },
];

const createLineSegment = (from, to, strokeWidth, key) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  if (!length) {
    return {
      key,
      type: "dot",
      left: from.x - strokeWidth / 2,
      top: from.y - strokeWidth / 2,
      size: strokeWidth,
    };
  }

  return {
    key,
    type: "line",
    left: from.x,
    top: from.y - strokeWidth / 2,
    width: length,
    height: strokeWidth,
    angle: Math.atan2(dy, dx),
  };
};

const buildSegments = (strokes) => {
  const segments = [];

  strokes.forEach((stroke, strokeIndex) => {
    const points = stroke.points || [];
    if (points.length === 1) {
      segments.push(
        createLineSegment(
          points[0],
          points[0],
          stroke.strokeWidth,
          `${strokeIndex}-0`,
        ),
      );
      return;
    }

    for (let i = 1; i < points.length; i += 1) {
      segments.push(
        createLineSegment(
          points[i - 1],
          points[i],
          stroke.strokeWidth,
          `${strokeIndex}-${i}`,
        ),
      );
    }
  });

  return segments;
};

const SketchSurface = ({
  height,
  segments,
  panHandlers,
  onLayout,
  borderColor,
}) => (
  <View
    onLayout={onLayout}
    style={[styles.board, { height, borderColor }]}
    {...(panHandlers || {})}
  >
    {segments.map((segment) =>
      segment.type === "dot" ? (
        <View
          key={segment.key}
          style={[
            styles.stroke,
            {
              left: segment.left,
              top: segment.top,
              width: segment.size,
              height: segment.size,
              borderRadius: segment.size / 2,
            },
          ]}
        />
      ) : (
        <View
          key={segment.key}
          style={[
            styles.stroke,
            {
              left: segment.left,
              top: segment.top,
              width: segment.width,
              height: segment.height,
              borderRadius: segment.height / 2,
              transform: [{ rotateZ: `${segment.angle}rad` }],
            },
          ]}
        />
      ),
    )}
  </View>
);

const defaultLanguageForApp = (language) => {
  if (language === "ar") return "ar-EG";
  if (language === "fr") return "fr-FR";
  if (language === "es") return "es-ES";
  return "en-US";
};

const ExpressByDrawing = () => {
  const { theme, language: appLanguage } = useContext(AppContext);
  const currentTheme = themes[theme];
  const soundRef = useRef(null);
  const boardSizeRef = useRef({ width: 1, height: BOARD_HEIGHT });
  const [language, setLanguage] = useState(defaultLanguageForApp(appLanguage));
  const [strokes, setStrokes] = useState([]);
  const [ocrText, setOcrText] = useState("");
  const [editableText, setEditableText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
      }
    };
  }, []);

  const appendPoint = (point) => {
    setStrokes((prev) => {
      if (!prev.length) return prev;
      const next = [...prev];
      const currentStroke = next[next.length - 1];
      next[next.length - 1] = {
        ...currentStroke,
        points: [...currentStroke.points, point],
      };
      return next;
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => {
        setError("");
        const point = {
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        };
        setStrokes((prev) => [
          ...prev,
          {
            strokeWidth: 10,
            points: [point],
          },
        ]);
      },
      onPanResponderMove: (event) => {
        appendPoint({
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        });
      },
    }),
  ).current;

  const segments = buildSegments(strokes);

  const buildDrawingPayload = () => ({
    width: boardSizeRef.current.width,
    height: boardSizeRef.current.height,
    strokes,
  });

  const clearDrawing = () => {
    setStrokes([]);
    setError("");
  };

  const handleRecognize = async () => {
    if (!strokes.length) {
      setError("Draw something first.");
      return;
    }

    setProcessing(true);
    setError("");
    try {
      const result = await recognizeDrawing(buildDrawingPayload(), language);
      const nextText = result?.text || "";
      setOcrText(nextText);
      setEditableText(nextText);
      if (!nextText) {
        setError("No text was recognized. Try writing larger and more clearly.");
      }
    } catch (err) {
      setError(err.message || "OCR failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleSpeak = async () => {
    const text = editableText.trim();
    if (!text) {
      setError("Type or recognize text first.");
      return;
    }

    setSpeaking(true);
    setError("");

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });

      if (soundRef.current) {
        await soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }

      const result = await speakText(text, language);
      if (!result?.url) {
        throw new Error("No audio URL returned from the server.");
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: normalizeMediaUrl(result.url) },
        { shouldPlay: true },
      );

      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish && soundRef.current) {
          soundRef.current.unloadAsync().catch(() => {});
          soundRef.current = null;
        }
      });
    } catch (err) {
      setError(err.message || "TTS failed.");
    } finally {
      setSpeaking(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: currentTheme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { color: currentTheme.text }]}>
        Express By Drawing
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: currentTheme.textSecondary || currentTheme.text },
        ]}
      >
        Draw, recognize the text, edit it, then play it as speech.
      </Text>

      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.label, { color: currentTheme.text }]}>Language</Text>
        <View
          style={[
            styles.pickerBox,
            { borderColor: currentTheme.textSecondary || "#ccc" },
          ]}
        >
          <Picker
            selectedValue={language}
            onValueChange={setLanguage}
            style={{ color: currentTheme.text }}
            dropdownIconColor={currentTheme.text}
          >
            {LANGUAGES.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.label, { color: currentTheme.text }]}>
          1. Draw
        </Text>
        <SketchSurface
          height={BOARD_HEIGHT}
          segments={segments}
          panHandlers={panResponder.panHandlers}
          borderColor={currentTheme.textSecondary || "#ccc"}
          onLayout={(event) => {
            boardSizeRef.current = {
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            };
          }}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#dc3545" }]}
            onPress={clearDrawing}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "#0d6efd",
                opacity: processing ? 0.7 : 1,
              },
            ]}
            onPress={handleRecognize}
            disabled={processing}
          >
            <Text style={styles.buttonText}>
              {processing ? "Recognizing..." : "Run OCR"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.label, { color: currentTheme.text }]}>
          2. Image Preview
        </Text>
        <SketchSurface
          height={PREVIEW_HEIGHT}
          segments={segments}
          borderColor={currentTheme.textSecondary || "#ccc"}
        />
      </View>

      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.label, { color: currentTheme.text }]}>
          3. OCR Result
        </Text>
        {processing ? (
          <ActivityIndicator
            size="small"
            color={currentTheme.link || currentTheme.text}
          />
        ) : null}
        <TextInput
          multiline
          value={editableText}
          onChangeText={setEditableText}
          placeholder="Recognized text will appear here."
          placeholderTextColor={currentTheme.textSecondary || "#888"}
          style={[
            styles.textArea,
            {
              color: currentTheme.text,
              borderColor: currentTheme.textSecondary || "#ccc",
            },
          ]}
        />
        {!!ocrText && (
          <Text style={{ color: currentTheme.text, marginTop: 8 }}>
            Raw OCR: {ocrText}
          </Text>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "#198754",
                opacity: speaking ? 0.7 : 1,
              },
            ]}
            onPress={handleSpeak}
            disabled={speaking}
          >
            <Text style={styles.buttonText}>
              {speaking ? "Speaking..." : "Speak Text"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#6c757d" }]}
            onPress={() => {
              setOcrText("");
              setEditableText("");
              setError("");
            }}
          >
            <Text style={styles.buttonText}>Clear Text</Text>
          </TouchableOpacity>
        </View>
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
};

export default ExpressByDrawing;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 14,
  },
  card: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },
  label: {
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 16,
  },
  pickerBox: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  board: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
  },
  stroke: {
    position: "absolute",
    backgroundColor: "#111",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  button: {
    flex: 1,
    minHeight: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 140,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#dc3545",
    textAlign: "center",
    marginBottom: 20,
  },
});
