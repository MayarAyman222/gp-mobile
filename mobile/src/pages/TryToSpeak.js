import React, { useEffect, useRef, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_CONFIG } from "../config/appConfig";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";
import Voice from "@react-native-voice/voice";

const NO_SPEECH_GRACE_MS = 900;

// Normalization and scoring functions
const normalizeText = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[^\p{L}\p{N} ]+/gu, "")
    .replace(/\s+/g, " ")
    .trim();
};

const levenshteinDistance = (a, b) => {
  const s = normalizeText(a);
  const t = normalizeText(b);
  if (!s && !t) return 0;
  if (!s) return t.length;
  if (!t) return s.length;

  const dp = Array.from({ length: s.length + 1 }, () =>
    new Array(t.length + 1).fill(0)
  );
  for (let i = 0; i <= s.length; i++) dp[i][0] = i;
  for (let j = 0; j <= t.length; j++) dp[0][j] = j;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[s.length][t.length];
};

const calcScore = (target, transcript) => {
  const s = normalizeText(target);
  const t = normalizeText(transcript);
  if (!s && !t) return 100;
  if (!s || !t) return 0;
  const dist = levenshteinDistance(s, t);
  const maxLen = Math.max(s.length, t.length);
  const ratio = maxLen === 0 ? 1 : 1 - dist / maxLen;
  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
};

// Mini chart component
const MiniChart = ({ data, color }) => {
  if (!data.length) return <Text style={{ textAlign: "center", color }}>لا توجد محاولات بعد.</Text>;
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6, paddingVertical: 8 }}>
      {data.map((v, i) => (
        <View
          key={i}
          style={{
            width: 10,
            height: Math.max(8, (v / 100) * 120),
            backgroundColor: color,
            borderRadius: 4,
          }}
        />
      ))}
    </View>
  );
};

const languages = [
  { value: "ar-EG", label: "العربية (مصر)" },
  { value: "ar-SA", label: "العربية (السعودية)" },
  { value: "en-US", label: "English (US)" },
  { value: "fr-FR", label: "Français" },
  { value: "es-ES", label: "Español" },
];

const TryToSpeak = () => {
  const { theme } = useContext(AppContext);
  const currentTheme = themes[theme];

  const [targetWord, setTargetWord] = useState("");
  const [language, setLanguage] = useState("ar-EG");
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState("");
  const [improvement, setImprovement] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [error, setError] = useState("");
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [activeTab, setActiveTab] = useState("result");

  const startTimeRef = useRef(0);
  const webRecognitionRef = useRef(null);
  const hadErrorRef = useRef(false);
  const gotResultRef = useRef(false);
  const userStopRef = useRef(false);

  // Load past attempts
  const loadAttempts = async (word) => {
    const trimmed = String(word || "").trim();
    if (!trimmed) {
      setAttempts([]);
      return;
    }
    setLoadingAttempts(true);
    try {
      const key = `speech_attempts_${trimmed.toLowerCase()}`;
      const saved = await AsyncStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setAttempts(parsed);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAttempts(false);
    }
  };

  useEffect(() => {
    loadAttempts(targetWord);
  }, [targetWord]);

  const handleTranscript = (text) => {
    gotResultRef.current = true;
    setTranscript(text);
    const newScore = calcScore(targetWord, text);
    setScore(newScore);
    setMessage(newScore >= 70 ? "تم" : "Fail and try again");

    const lastScore = attempts.length ? attempts[attempts.length - 1].score : null;
    if (lastScore !== null && lastScore !== undefined) {
      const delta = newScore - lastScore;
      if (delta > 0) setImprovement(`تحسنت بنسبة ${delta}% عن آخر مرة`);
      else if (delta < 0) setImprovement(`قلت بنسبة ${Math.abs(delta)}% عن آخر مرة`);
      else setImprovement("لم تتحسن عن آخر مرة");
    } else {
      setImprovement(null);
    }

    setAttempts((prev) => {
      const updated = [...prev, { score: newScore, ts: Date.now() }];
      const key = `speech_attempts_${String(targetWord).trim().toLowerCase()}`;
      AsyncStorage.setItem(key, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  };

  // Voice events (native)
  useEffect(() => {
    if (Platform.OS === "web") return;

    Voice.onSpeechResults = (event) => {
      const text = event.value?.[0] || "";
      handleTranscript(text);
    };

    Voice.onSpeechError = (event) => {
      setError(event.error?.message || "حدث خطأ أثناء التعرف على الصوت");
      setListening(false);
    };

    Voice.onSpeechEnd = () => setListening(false);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [targetWord, attempts]);

  // Start recording
  const startRecording = async () => {
    setError("");
    if (!targetWord.trim()) {
      setError("اكتب الكلمة أولاً.");
      return;
    }
    setTranscript("");
    setScore(null);
    setMessage("");
    setImprovement(null);
    hadErrorRef.current = false;
    gotResultRef.current = false;
    userStopRef.current = false;
    startTimeRef.current = Date.now();

    if (Platform.OS === "web") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition || null;
      if (!SpeechRecognition) {
        setError("المتصفح لا يدعم التعرف على الصوت (جرّب Chrome).");
        return;
      }
      try {
        const perm = await navigator.mediaDevices.getUserMedia({ audio: true });
        perm.getTracks().forEach((t) => t.stop());
      } catch (err) {
        setError("يجب منح إذن الميكروفون للمتصفح.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const text = event.results?.[0]?.[0]?.transcript || "";
        handleTranscript(text);
      };

      recognition.onerror = (e) => {
        hadErrorRef.current = true;
        setError(e?.error || "تعذر التعرف على الصوت.");
      };

      recognition.onend = () => {
        setListening(false);
        const elapsed = Date.now() - startTimeRef.current;
        if (!gotResultRef.current && !hadErrorRef.current && elapsed >= NO_SPEECH_GRACE_MS) {
          setError("لم يتم التقاط أي كلام. جرّب التحدث أقرب للميكروفون.");
        }
      };

      webRecognitionRef.current = recognition;
      setListening(true);
      try {
        recognition.start();
      } catch (err) {
        setListening(false);
        setError("تعذر بدء التعرف على الصوت.");
      }
      return;
    }

    try {
      await Voice.start(language);
      setListening(true);
    } catch (err) {
      setError("تعذر بدء التسجيل الصوتي");
    }
  };

  const stopRecording = async () => {
    userStopRef.current = true;
    if (Platform.OS === "web") {
      if (webRecognitionRef.current) {
        try {
          webRecognitionRef.current.stop();
        } catch {}
      }
      setListening(false);
      const elapsed = Date.now() - startTimeRef.current;
      if (!gotResultRef.current && !hadErrorRef.current && elapsed >= NO_SPEECH_GRACE_MS) {
        setError("لم يتم التقاط أي كلام. جرّب التحدث أقرب للميكروفون.");
      }
      return;
    }
    try {
      await Voice.stop();
      setListening(false);
      const elapsed = Date.now() - startTimeRef.current;
      if (!transcript && elapsed >= NO_SPEECH_GRACE_MS) {
        setError("لم يتم التقاط أي كلام. جرّب التحدث أقرب للميكروفون.");
      }
    } catch (err) {
      setError("تعذر إيقاف التسجيل الصوتي");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.heading, { color: currentTheme.text }]}>Try and Train to Speak</Text>

      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: currentTheme.text }]}>الكلمة أو الجملة</Text>
            <TextInput
              value={targetWord}
              onChangeText={setTargetWord}
              placeholder="اكتب الكلمة هنا"
              placeholderTextColor={currentTheme.textSecondary || "#888"}
              style={[styles.input, { color: currentTheme.text, borderColor: currentTheme.textSecondary || "#ccc" }]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: currentTheme.text }]}>اللغة</Text>
            <View style={[styles.pickerBox, { borderColor: currentTheme.textSecondary || "#ccc" }]}>
              <Picker
                selectedValue={language}
                onValueChange={setLanguage}
                dropdownIconColor={currentTheme.text}
                style={{ color: currentTheme.text }}
              >
                {languages.map((l) => (
                  <Picker.Item key={l.value} label={l.label} value={l.value} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 12 }]}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#dc3545", opacity: listening ? 0.7 : 1 }]}
            onPress={startRecording}
            disabled={listening}
          >
            <Text style={styles.btnText}>Start Recording</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#6c757d", opacity: listening ? 1 : 0.6 }]}
            onPress={stopRecording}
            disabled={!listening}
          >
            <Text style={styles.btnText}>Stop</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={{ color: "#e55353", marginTop: 8 }}>{error}</Text> : null}
      </View>

      <View style={[styles.tabRow, { borderColor: currentTheme.textSecondary || "#ccc" }]}>
        {[
          { key: "result", label: "النتيجة" },
          { key: "progress", label: "التقدم" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabBtn, { backgroundColor: activeTab === tab.key ? currentTheme.card : "transparent", borderColor: activeTab === tab.key ? currentTheme.text : currentTheme.textSecondary || "#ccc" }]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={{ color: currentTheme.text, fontWeight: activeTab === tab.key ? "800" : "600" }}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "result" ? (
        <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>النتيجة</Text>
          <Text style={[styles.body, { color: currentTheme.text }]}><Text style={{ fontWeight: "700" }}>النص:</Text> {transcript || "-"}</Text>
          <Text style={[styles.body, { color: currentTheme.text }]}><Text style={{ fontWeight: "700" }}>النسبة:</Text> {score === null ? "-" : `${score}%`}</Text>
          {message ? <View style={[styles.alert, { backgroundColor: score >= 70 ? "#d1e7dd" : "#f8d7da" }]}><Text style={{ color: "#111" }}>{message}</Text></View> : null}
          {improvement ? <Text style={{ color: currentTheme.text, marginTop: 4 }}>{improvement}</Text> : null}
        </View>
      ) : (
        <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>التقدم</Text>
            {loadingAttempts && <ActivityIndicator size="small" color={currentTheme.text} />}
          </View>
          <MiniChart data={attempts.map((a) => a.score)} color="#dc3545" />
        </View>
      )}
    </ScrollView>
  );
};

export default TryToSpeak;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: "800", marginBottom: 12, textAlign: "center" },
  card: { borderRadius: 12, padding: 12, marginBottom: 12, elevation: 3 },
  row: { flexDirection: "row", gap: 12 },
  label: { fontWeight: "700", marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, height: 44 },
  pickerBox: { borderWidth: 1, borderRadius: 10, overflow: "hidden" },
  btn: { flex: 1, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  body: { marginBottom: 4 },
  alert: { padding: 10, borderRadius: 8, marginTop: 6 },
  tabRow: { flexDirection: "row", borderWidth: 1, borderRadius: 10, marginBottom: 10, overflow: "hidden" },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: "center", justifyContent: "center", borderRightWidth: 1 },
});
