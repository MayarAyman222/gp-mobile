import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";
import { sendChatMessage } from "../Api/chatApi";
import { speakText } from "../Api/tts-translate-api";
import { normalizeMediaUrl } from "../config/appConfig";

const welcomeByLang = {
  en: "Hello. I am your AAC assistant. Ask me about device use, core words, behavior, modeling, school, or daily communication needs.",
  ar: "أهلا. أنا مساعد AAC. اسألني عن استخدام الجهاز، الكلمات الأساسية، السلوك، modeling، المدرسة، أو احتياجات التواصل اليومية.",
  fr: "Hello. I am your AAC assistant. Ask me about device use, core words, behavior, modeling, school, or daily communication needs.",
  es: "Hello. I am your AAC assistant. Ask me about device use, core words, behavior, modeling, school, or daily communication needs.",
};

const placeholderByLang = {
  en: "Ask an AAC question...",
  ar: "اكتب سؤالا عن AAC...",
  fr: "Ask an AAC question...",
  es: "Ask an AAC question...",
};

const sendLabelByLang = {
  en: "Send",
  ar: "إرسال",
  fr: "Envoyer",
  es: "Enviar",
};

const speakLabelByLang = {
  en: "Speak",
  ar: "تشغيل",
  fr: "Parler",
  es: "Hablar",
};

const titleByLang = {
  en: "AAC Assistant",
  ar: "مساعد AAC",
  fr: "AAC Assistant",
  es: "AAC Assistant",
};

const quickPromptsByLang = {
  en: [
    "How do I start AAC?",
    "My child refuses the device",
    "What core words should I teach first?",
  ],
  ar: [
    "كيف أبدأ AAC؟",
    "ابني يرفض الجهاز",
    "ما الكلمات الأساسية التي أبدأ بها؟",
  ],
  fr: [
    "How do I start AAC?",
    "My child refuses the device",
    "What core words should I teach first?",
  ],
  es: [
    "How do I start AAC?",
    "My child refuses the device",
    "What core words should I teach first?",
  ],
};

const errorReplyByLang = {
  en: "I could not reply right now. Please try again.",
  ar: "لم أستطع الرد الآن. حاول مرة أخرى.",
  fr: "Je ne peux pas repondre maintenant. Reessaie.",
  es: "No pude responder ahora. Intenta otra vez.",
};

const buildMessage = (role, text) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  text,
});

export default function Chat() {
  const navigation = useNavigation();
  const { language: lang, theme } = useContext(AppContext);
  const currentTheme = themes[theme];
  const flatListRef = useRef(null);
  const soundRef = useRef(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [speechStatus, setSpeechStatus] = useState("idle");
  const [lastReplyText, setLastReplyText] = useState("");
  const [messages, setMessages] = useState(() => [
    buildMessage("assistant", welcomeByLang.en),
  ]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unloadAsync().catch(() => {});
      soundRef.current = null;
    }

    setSpeechStatus("idle");
    setLastReplyText("");
    setMessages([buildMessage("assistant", welcomeByLang[lang] || welcomeByLang.en)]);
  }, [lang]);

  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 50);

    return () => clearTimeout(timer);
  }, [messages, sending]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, []);

  const quickPrompts = quickPromptsByLang[lang] || quickPromptsByLang.en;
  const speechLoading = speechStatus === "loading";
  const speechPlaying = speechStatus === "playing";
  const speechPaused = speechStatus === "paused";
  const speechActive = speechLoading || speechPlaying || speechPaused;
  const speakButtonDisabled = sending || !lastReplyText || speechLoading;
  const speakButtonLabel = speechLoading
    ? "..."
    : speechPlaying
      ? "Pause"
      : speechPaused
        ? "Play"
        : speakLabelByLang[lang] || speakLabelByLang.en;
  const speakIconName = speechPlaying ? "pause" : speechPaused ? "play" : "volume-up";

  const handleSend = async (presetText) => {
    const text = (presetText ?? input).trim();
    if (!text || sending) return;

    const history = messages.map((message) => ({
      role: message.role,
      content: message.text,
    }));
    const userMessage = buildMessage("user", text);

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setSending(true);
    if (soundRef.current) {
      soundRef.current.unloadAsync().catch(() => {});
      soundRef.current = null;
      setSpeechStatus("idle");
    }

    try {
      const result = await sendChatMessage({
        message: text,
        language: lang,
        history,
      });

      const replyText = result?.reply || errorReplyByLang[lang] || errorReplyByLang.en;
      setLastReplyText(replyText);
      setMessages((previous) => [
        ...previous,
        buildMessage("assistant", replyText),
      ]);
    } catch (error) {
      console.error("Chat screen error:", error);
      const replyText = errorReplyByLang[lang] || errorReplyByLang.en;
      setLastReplyText(replyText);
      setMessages((previous) => [
        ...previous,
        buildMessage("assistant", replyText),
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleSpeak = async () => {
    const textToSpeak = lastReplyText.trim();
    if (!textToSpeak || speechLoading) return;

    try {
      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();

        if (status.isLoaded) {
          if (status.isPlaying) {
            await soundRef.current.pauseAsync();
            setSpeechStatus("paused");
            return;
          }

          await soundRef.current.playAsync();
          setSpeechStatus("playing");
          return;
        }

        await soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }

      setSpeechStatus("loading");
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });

      const result = await speakText(textToSpeak, lang);
      if (!result?.ok || !result?.url) {
        throw new Error(result?.message || "TTS failed");
      }

      const { sound } = await Audio.Sound.createAsync({
        uri: normalizeMediaUrl(result.url),
      });

      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) {
          if (status.error) {
            console.error("Chat audio playback error:", status.error);
            setSpeechStatus("idle");
          }
          return;
        }

        if (status.didJustFinish) {
          setSpeechStatus("idle");
          sound.unloadAsync().catch(() => {});
          if (soundRef.current === sound) {
            soundRef.current = null;
          }
        }
      });

      await sound.playAsync();
      setSpeechStatus("playing");
    } catch (error) {
      console.error("Chat speak error:", error);
      if (soundRef.current) {
        await soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
      setSpeechStatus("idle");
    }
  };

  const renderItem = ({ item }) => {
    const isUser = item.role === "user";

    return (
      <View
        style={[
          styles.messageRow,
          { justifyContent: isUser ? "flex-end" : "flex-start" },
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isUser ? currentTheme.link : currentTheme.card,
              borderColor: isUser ? currentTheme.link : `${currentTheme.text}22`,
            },
          ]}
        >
          <Text
            style={[
              styles.messageText,
              { color: isUser ? "#ffffff" : currentTheme.text },
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: currentTheme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: currentTheme.card,
            borderBottomColor: `${currentTheme.text}14`,
          },
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={18} color={currentTheme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>
          {titleByLang[lang] || titleByLang.en}
        </Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.quickPromptRow}>
        {quickPrompts.map((prompt) => (
          <TouchableOpacity
            key={prompt}
            style={[
              styles.promptChip,
              {
                backgroundColor: `${currentTheme.link}18`,
                borderColor: `${currentTheme.link}44`,
              },
            ]}
            onPress={() => handleSend(prompt)}
            disabled={sending}
          >
            <Text style={[styles.promptText, { color: currentTheme.link }]}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        keyboardShouldPersistTaps="handled"
      />

      <View
        style={[
          styles.composer,
          {
            backgroundColor: currentTheme.card,
            borderTopColor: `${currentTheme.text}14`,
          },
        ]}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={placeholderByLang[lang] || placeholderByLang.en}
          placeholderTextColor={`${currentTheme.text}88`}
          style={[
            styles.input,
            {
              color: currentTheme.text,
              borderColor: `${currentTheme.text}18`,
              backgroundColor: currentTheme.background,
            },
          ]}
          multiline
        />

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[
              styles.speakButton,
              {
                backgroundColor:
                  speechActive || !lastReplyText
                    ? `${currentTheme.link}24`
                    : `${currentTheme.link}16`,
                borderColor:
                  speechActive || !lastReplyText
                    ? `${currentTheme.link}30`
                    : `${currentTheme.link}44`,
              },
            ]}
            onPress={handleSpeak}
            disabled={speakButtonDisabled}
          >
            <FontAwesome5
              name={speakIconName}
              size={18}
              color={speakButtonDisabled ? `${currentTheme.link}80` : currentTheme.link}
            />
            <Text
              style={[
                styles.speakButtonText,
                {
                  color: speakButtonDisabled ? `${currentTheme.link}80` : currentTheme.link,
                },
              ]}
            >
              {speakButtonLabel}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: sending ? `${currentTheme.link}80` : currentTheme.link,
              },
            ]}
            onPress={() => handleSend()}
            disabled={sending}
          >
            {sending ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.sendButtonText}>
                {sendLabelByLang[lang] || sendLabelByLang.en}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
  },
  quickPromptRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  promptChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  promptText: {
    fontWeight: "700",
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  messageRow: {
    flexDirection: "row",
  },
  messageBubble: {
    maxWidth: "82%",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  composer: {
    borderTopWidth: 1,
    padding: 12,
    gap: 10,
  },
  input: {
    minHeight: 48,
    maxHeight: 110,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    textAlignVertical: "top",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  speakButton: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  speakButtonText: {
    fontWeight: "800",
    fontSize: 15,
  },
  sendButton: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  sendButtonText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
  },
});
