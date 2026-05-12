import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";

// ─── Safe import of expo-speech-recognition ───────────────────────────────────
// The native module requires a custom dev-build (expo run:android / run:ios).
// We guard every access so the screen never hard-crashes in Expo Go or when
// the build is missing the native layer.
let ExpoSpeechRecognitionModule = null;
let RecognizerIntentExtraLanguageModel = { LANGUAGE_MODEL_WEB_SEARCH: "web_search" };
let useSpeechRecognitionEvent = (_event, _cb) => {};   // no-op hook shim

try {
  const mod = require("expo-speech-recognition");
  ExpoSpeechRecognitionModule = mod.ExpoSpeechRecognitionModule;
  if (mod.RecognizerIntentExtraLanguageModel)
    RecognizerIntentExtraLanguageModel = mod.RecognizerIntentExtraLanguageModel;
  if (mod.useSpeechRecognitionEvent)
    useSpeechRecognitionEvent = mod.useSpeechRecognitionEvent;
} catch {
  // Module not linked – the UI will show a friendly error below.
}

const SPEECH_AVAILABLE = !!ExpoSpeechRecognitionModule;
// ──────────────────────────────────────────────────────────────────────────────

const NO_SPEECH_GRACE_MS = 900;

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
    new Array(t.length + 1).fill(0),
  );
  for (let i = 0; i <= s.length; i++) dp[i][0] = i;
  for (let j = 0; j <= t.length; j++) dp[0][j] = j;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
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

const getAttemptsKey = (word) => `speech_attempts_${normalizeText(word)}`;

const getSpeechErrorMessage = (event) => {
  switch (event?.error) {
    case "not-allowed":
      return "لازم تسمح باستخدام الميكروفون والتعرف على الكلام.";
    case "language-not-supported":
      return "اللغة المختارة غير مدعومة على هذا الجهاز.";
    case "service-not-allowed":
      return "التعرف على الكلام غير متاح على هذا الجهاز. جرّب تفعيل خدمة التعرف على الصوت من إعدادات الجهاز.";
    case "network":
      return "خدمة التعرف على الكلام احتاجت اتصال ولم تستطع الوصول. جرّب مرة أخرى.";
    case "busy":
      return "خدمة التعرف على الكلام مشغولة الآن. انتظر لحظة وجرب مرة أخرى.";
    case "no-speech":
    case "speech-timeout":
      return "لم يتم التقاط صوت. حاول مرة أخرى.";
    default:
      return event?.message || "حدث خطأ أثناء التعرف على الكلام.";
  }
};

// ─── Banner shown when native module is missing ───────────────────────────────
const ModuleMissingBanner = ({ theme }) => (
  <View style={[styles.missingBanner, { backgroundColor: "#fff3cd" }]}>
    <Text style={[styles.missingTitle, { color: "#856404" }]}>
      ⚠️ التعرف على الكلام غير متاح
    </Text>
    <Text style={{ color: "#856404", fontSize: 13, lineHeight: 20 }}>
      الحل: شغّل الأمر التالي في مجلد المشروع ثم أعد بناء التطبيق:
    </Text>
    <View style={styles.codeBox}>
      <Text style={styles.code}>npx expo install expo-speech-recognition</Text>
      <Text style={styles.code}>npx expo run:android</Text>
    </View>
    <Text style={{ color: "#856404", fontSize: 12, marginTop: 6 }}>
      ملاحظة: هذه الميزة لا تعمل في Expo Go — يلزم Custom Dev Build.
    </Text>
  </View>
);
// ──────────────────────────────────────────────────────────────────────────────

const MiniChart = ({ data, color }) => {
  if (!data.length) {
    return (
      <Text style={{ textAlign: "center", color }}>لا توجد محاولات بعد.</Text>
    );
  }
  return (
    <View style={styles.chart}>
      {data.map((v, i) => (
        <View
          key={`${i}-${v}`}
          style={[
            styles.chartBar,
            { height: Math.max(8, (v / 100) * 120), backgroundColor: color },
          ]}
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

  const activeTargetRef = useRef("");
  const finalizedRef = useRef(false);
  const gotResultRef = useRef(false);
  const noSpeechTimerRef = useRef(null);
  const pendingTranscriptRef = useRef("");

  const clearNoSpeechTimer = () => {
    if (noSpeechTimerRef.current) {
      clearTimeout(noSpeechTimerRef.current);
      noSpeechTimerRef.current = null;
    }
  };

  const scheduleNoSpeechError = (text = "لم يتم التقاط صوت. حاول مرة أخرى.") => {
    clearNoSpeechTimer();
    noSpeechTimerRef.current = setTimeout(() => {
      if (!gotResultRef.current && !finalizedRef.current) {
        setError(text);
      }
    }, NO_SPEECH_GRACE_MS);
  };

  const finishTranscript = (text) => {
    const currentTarget = activeTargetRef.current || targetWord.trim();
    const transcriptText = String(text || "").trim();
    if (finalizedRef.current || !currentTarget || !transcriptText) return;

    clearNoSpeechTimer();
    finalizedRef.current = true;
    gotResultRef.current = true;
    pendingTranscriptRef.current = transcriptText;

    const newScore = calcScore(currentTarget, transcriptText);
    setTranscript(transcriptText);
    setScore(newScore);
    setMessage(newScore >= 70 ? "تم ✅" : "Fail – try again ❌");
    setActiveTab("result");

    setAttempts((prev) => {
      const lastScore = prev.length ? prev[prev.length - 1].score : null;
      if (lastScore !== null) {
        const delta = newScore - lastScore;
        if (delta > 0) setImprovement(`تحسنت بنسبة ${delta}% عن آخر مرة`);
        else if (delta < 0) setImprovement(`قلت بنسبة ${Math.abs(delta)}% عن آخر مرة`);
        else setImprovement("لم تتحسن عن آخر مرة");
      } else {
        setImprovement(null);
      }
      const updated = [...prev, { score: newScore, ts: Date.now() }];
      AsyncStorage.setItem(getAttemptsKey(currentTarget), JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  };

  // ── Load stored attempts whenever targetWord changes ───────────────────────
  useEffect(() => {
    let cancelled = false;
    const trimmed = targetWord.trim();
    if (!trimmed || !normalizeText(trimmed)) {
      setAttempts([]);
      setLoadingAttempts(false);
      return undefined;
    }
    const loadAttempts = async () => {
      setLoadingAttempts(true);
      try {
        const saved = await AsyncStorage.getItem(getAttemptsKey(trimmed));
        const parsed = saved ? JSON.parse(saved) : [];
        if (!cancelled) setAttempts(Array.isArray(parsed) ? parsed : []);
      } catch {
        if (!cancelled) setAttempts([]);
      } finally {
        if (!cancelled) setLoadingAttempts(false);
      }
    };
    loadAttempts();
    return () => { cancelled = true; };
  }, [targetWord]);

  // ── Cleanup on unmount ─────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (noSpeechTimerRef.current) clearTimeout(noSpeechTimerRef.current);
      if (SPEECH_AVAILABLE) {
        try { ExpoSpeechRecognitionModule.abort(); } catch {}
      }
    };
  }, []);

  // ── Speech recognition event hooks ────────────────────────────────────────
  // These are safe no-ops when the module is missing (shim above).
  useSpeechRecognitionEvent("result", (event) => {
    const transcriptText = event?.results?.[0]?.transcript?.trim() || "";
    if (!transcriptText) return;
    gotResultRef.current = true;
    pendingTranscriptRef.current = transcriptText;
    setTranscript(transcriptText);
    if (event.isFinal) {
      finishTranscript(transcriptText);
      setListening(false);
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    if (event?.error === "aborted") { setListening(false); return; }
    setListening(false);
    const nextMessage = getSpeechErrorMessage(event);
    if (event?.error === "no-speech" || event?.error === "speech-timeout") {
      scheduleNoSpeechError(nextMessage);
      return;
    }
    clearNoSpeechTimer();
    setError(nextMessage);
  });

  useSpeechRecognitionEvent("start", () => {
    clearNoSpeechTimer();
    setListening(true);
    setError("");
  });

  useSpeechRecognitionEvent("end", () => {
    setListening(false);
    if (!finalizedRef.current && pendingTranscriptRef.current) {
      finishTranscript(pendingTranscriptRef.current);
      return;
    }
    if (!gotResultRef.current && !finalizedRef.current) {
      scheduleNoSpeechError();
    }
  });

  useSpeechRecognitionEvent("nomatch", () => {
    setListening(false);
    scheduleNoSpeechError("لم يتم التعرف على الكلام بوضوح. حاول مرة أخرى.");
  });
  // ──────────────────────────────────────────────────────────────────────────

  const startRecording = async () => {
    // Guard: module not available
    if (!SPEECH_AVAILABLE) {
      setError("الوحدة الأصلية غير مثبتة. راجع التعليمات أعلاه.");
      return;
    }

    const trimmedTarget = targetWord.trim();
    setError("");

    if (!trimmedTarget || !normalizeText(trimmedTarget)) {
      setError("اكتب الكلمة أو الجملة أولاً.");
      return;
    }

    clearNoSpeechTimer();
    activeTargetRef.current = trimmedTarget;
    finalizedRef.current = false;
    gotResultRef.current = false;
    pendingTranscriptRef.current = "";
    setTranscript("");
    setScore(null);
    setMessage("");
    setImprovement(null);
    setActiveTab("result");

    try {
      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) {
        setError("لم يتم السماح باستخدام الميكروفون.");
        return;
      }

      if (!ExpoSpeechRecognitionModule.isRecognitionAvailable()) {
        setError("التعرف على الكلام غير متاح على هذا الجهاز.");
        return;
      }

      setListening(true);
      ExpoSpeechRecognitionModule.start({
        lang: language,
        interimResults: false,
        maxAlternatives: 1,
        continuous: false,
        contextualStrings: [trimmedTarget],
        addsPunctuation: false,
        androidIntentOptions: {
          EXTRA_LANGUAGE_MODEL:
            RecognizerIntentExtraLanguageModel.LANGUAGE_MODEL_WEB_SEARCH,
          EXTRA_PROMPT: trimmedTarget,
        },
      });
    } catch (err) {
      console.error("startRecording error", err);
      setError("فشل تشغيل التعرف على الكلام.");
      setListening(false);
    }
  };

  const stopRecording = () => {
    if (!SPEECH_AVAILABLE) return;
    try {
      ExpoSpeechRecognitionModule.stop();
    } catch (err) {
      console.warn("stopRecording error", err);
      setError("فشل إيقاف التسجيل.");
    }
    setListening(false);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <Text style={[styles.heading, { color: currentTheme.text }]}>
        Try and Train to Speak
      </Text>

      {/* Show banner if native module missing */}
      {!SPEECH_AVAILABLE && <ModuleMissingBanner theme={currentTheme} />}

      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={[styles.label, { color: currentTheme.text }]}>
              الكلمة أو الجملة
            </Text>
            <TextInput
              value={targetWord}
              onChangeText={setTargetWord}
              editable={!listening}
              placeholder="اكتب الكلمة هنا"
              placeholderTextColor={currentTheme.textSecondary || "#888"}
              style={[
                styles.input,
                {
                  color: currentTheme.text,
                  borderColor: currentTheme.textSecondary || "#ccc",
                  opacity: listening ? 0.7 : 1,
                },
              ]}
            />
          </View>
          <View style={styles.field}>
            <Text style={[styles.label, { color: currentTheme.text }]}>
              اللغة
            </Text>
            <View
              style={[
                styles.pickerBox,
                {
                  borderColor: currentTheme.textSecondary || "#ccc",
                  opacity: listening ? 0.7 : 1,
                },
              ]}
            >
              <Picker
                selectedValue={language}
                onValueChange={setLanguage}
                enabled={!listening}
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

        <View style={[styles.row, styles.buttonRow]}>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: "#dc3545",
                opacity: listening || !SPEECH_AVAILABLE ? 0.6 : 1,
              },
            ]}
            onPress={startRecording}
            disabled={listening}
          >
            <Text style={styles.btnText}>
              {listening ? "Listening..." : "Start Recording"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              { backgroundColor: "#6c757d", opacity: listening ? 1 : 0.6 },
            ]}
            onPress={stopRecording}
            disabled={!listening}
          >
            <Text style={styles.btnText}>Stop</Text>
          </TouchableOpacity>
        </View>

        {listening ? (
          <View style={styles.listeningRow}>
            <ActivityIndicator size="small" color={currentTheme.text} />
            <Text style={{ color: currentTheme.text }}>استمع الآن...</Text>
          </View>
        ) : null}

        {error ? (
          <Text style={{ color: "#e55353", marginTop: 8 }}>{error}</Text>
        ) : null}
      </View>

      <View
        style={[
          styles.tabRow,
          { borderColor: currentTheme.textSecondary || "#ccc" },
        ]}
      >
        {[
          { key: "result", label: "النتيجة" },
          { key: "progress", label: "التقدم" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabBtn,
              {
                backgroundColor:
                  activeTab === tab.key ? currentTheme.card : "transparent",
                borderColor:
                  activeTab === tab.key
                    ? currentTheme.text
                    : currentTheme.textSecondary || "#ccc",
              },
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={{
                color: currentTheme.text,
                fontWeight: activeTab === tab.key ? "800" : "600",
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "result" ? (
        <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
            النتيجة
          </Text>
          <Text style={[styles.body, { color: currentTheme.text }]}>
            <Text style={styles.bold}>النص:</Text> {transcript || "-"}
          </Text>
          <Text style={[styles.body, { color: currentTheme.text }]}>
            <Text style={styles.bold}>النسبة:</Text>{" "}
            {score === null ? "-" : `${score}%`}
          </Text>
          {message ? (
            <View
              style={[
                styles.alert,
                { backgroundColor: score >= 70 ? "#d1e7dd" : "#f8d7da" },
              ]}
            >
              <Text style={{ color: "#111" }}>{message}</Text>
            </View>
          ) : null}
          {improvement ? (
            <Text style={{ color: currentTheme.text, marginTop: 4 }}>
              {improvement}
            </Text>
          ) : null}
        </View>
      ) : (
        <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
              التقدم
            </Text>
            {loadingAttempts ? (
              <ActivityIndicator size="small" color={currentTheme.text} />
            ) : null}
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
  heading: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  card: { borderRadius: 12, padding: 12, marginBottom: 12, elevation: 3 },
  row: { flexDirection: "row", gap: 12 },
  field: { flex: 1 },
  label: { fontWeight: "700", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 44,
  },
  pickerBox: { borderWidth: 1, borderRadius: 10, overflow: "hidden" },
  buttonRow: { marginTop: 12 },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },
  listeningRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  body: { marginBottom: 4 },
  bold: { fontWeight: "700" },
  alert: { padding: 10, borderRadius: 8, marginTop: 6 },
  tabRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    paddingVertical: 8,
  },
  chartBar: {
    width: 10,
    borderRadius: 4,
  },
  // ── New styles for missing-module banner ─────────────────────────────────
  missingBanner: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  missingTitle: {
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 6,
  },
  codeBox: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  code: {
    color: "#4ec9b0",
    fontFamily: "monospace",
    fontSize: 12,
  },
});