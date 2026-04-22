import fetch from "node-fetch";
import { env } from "../config/env.js";
import { aacExpertKnowledge } from "../data/aacExpertKnowledge.js";
import {
  chatbotDefaultReplies,
  chatbotKnowledgeBase,
} from "../data/chatbotKnowledge.js";

const systemPromptByLang = {
  en:
    "You are an AAC assistant for patients, caregivers, therapists, and teachers. Answer AAC-related questions in a warm, practical, and natural way, similar to a helpful chat assistant. Reply in the same language as the user whenever possible. You can explain AAC basics, core words, modeling, device refusal, behavior as communication, regulation, school support, family coaching, and daily communication needs. If the user asks what to say, give short ready-to-use phrases. If the input is unclear, ask for clarification and give examples of AAC questions. Do not diagnose medical conditions. For emergencies, tell them to seek urgent professional help.",
  ar:
    "أنت مساعد AAC للأشخاص الذين يستخدمون التواصل المعزز والبديل، وللأهل والمعالجين والمعلمين. أجب عن الأسئلة المتعلقة بـ AAC بأسلوب طبيعي وعملي وداعم، مثل مساعد ذكي مفيد. رد بنفس لغة المستخدم كلما أمكن. يمكنك شرح أساسيات AAC والكلمات الأساسية والنمذجة ورفض الجهاز والسلوك باعتباره تواصلا والتنظيم الحسي ودعم المدرسة ودعم الأهل والاحتياجات اليومية. إذا سأل المستخدم ماذا يقول، فأعطه جملا قصيرة جاهزة. إذا كان الكلام غير واضح، فاطلب توضيحا مع أمثلة لأسئلة AAC. لا تقدم تشخيصا طبيا. وفي الطوارئ اطلب المساعدة المهنية العاجلة.",
  fr:
    "You are an AAC assistant for patients, caregivers, therapists, and teachers. Answer AAC-related questions in a warm, practical way. Reply in the same language as the user whenever possible. Explain AAC basics, modeling, core words, device use, behavior as communication, school support, and family coaching. If input is unclear, ask for clarification with examples. Do not diagnose medical conditions.",
  es:
    "You are an AAC assistant for patients, caregivers, therapists, and teachers. Answer AAC-related questions in a warm, practical way. Reply in the same language as the user whenever possible. Explain AAC basics, modeling, core words, device use, behavior as communication, school support, and family coaching. If input is unclear, ask for clarification with examples. Do not diagnose medical conditions.",
};

const clarifyRepliesByLang = {
  en: [
    "I did not understand that yet. Try an AAC question like: How do I start AAC? My child refuses the device. What core words should I teach first?",
    "That message looks unclear. You can ask me things like: How can I help an AAC user ask for water? How do I model language on the device?",
    "I need a clearer message to help well. For example: My child is not using the AAC device. How do I teach yes and no? What should I say during meltdowns?",
  ],
  ar: [
    "لم أفهم الرسالة بعد. جرب سؤالا عن AAC مثل: كيف أبدأ AAC؟ ابني يرفض الجهاز. ما الكلمات الأساسية التي أبدأ بها؟",
    "الرسالة غير واضحة الآن. يمكنك أن تسألني مثلا: كيف أساعد مستخدم AAC يطلب ماء؟ كيف أعمل modeling على الجهاز؟",
    "أحتاج رسالة أوضح لكي أساعدك جيدا. مثلا: ابني لا يستخدم جهاز AAC. كيف أعلمه نعم ولا؟ ماذا أقول وقت الانهيار؟",
  ],
  fr: [
    "I did not understand that yet. Try an AAC question like: How do I start AAC? My child refuses the device. What core words should I teach first?",
    "That message looks unclear. You can ask me things like: How can I help an AAC user ask for water? How do I model language on the device?",
    "I need a clearer message to help well. For example: My child is not using the AAC device. How do I teach yes and no? What should I say during meltdowns?",
  ],
  es: [
    "I did not understand that yet. Try an AAC question like: How do I start AAC? My child refuses the device. What core words should I teach first?",
    "That message looks unclear. You can ask me things like: How can I help an AAC user ask for water? How do I model language on the device?",
    "I need a clearer message to help well. For example: My child is not using the AAC device. How do I teach yes and no? What should I say during meltdowns?",
  ],
};

const sharedStopWords = new Set([
  "the",
  "and",
  "for",
  "that",
  "with",
  "this",
  "have",
  "need",
  "want",
  "please",
  "from",
  "your",
  "what",
  "when",
  "where",
  "how",
  "انا",
  "انت",
  "انتي",
  "هو",
  "هي",
  "هذا",
  "هذه",
  "على",
  "الى",
  "من",
  "في",
  "هل",
  "لو",
  "عايز",
  "اريد",
  "محتاج",
  "que",
  "qui",
  "pour",
  "avec",
  "une",
  "des",
  "los",
  "las",
  "por",
  "para",
  "con",
  "quiero",
  "necesito",
]);

const genericIntentIds = new Set(["greeting", "help", "communication", "goodbye"]);

const safeLanguage = (language) =>
  ["en", "ar", "fr", "es"].includes(language) ? language : "en";

const sanitizeHistory = (history = []) =>
  history
    .filter(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim(),
    )
    .slice(-10)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 1500),
    }));

const normalizeText = (text = "") =>
  text
    .toLowerCase()
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u0610-\u061a\u064b-\u065f\u06d6-\u06ed]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (text = "") =>
  normalizeText(text)
    .split(" ")
    .filter((token) => token.length > 1 && !sharedStopWords.has(token));

const scorePhrase = (phrase, normalizedMessage, messageTokens) => {
  const normalizedPhrase = normalizeText(phrase);
  if (!normalizedPhrase) return 0;

  let score = 0;
  if (normalizedMessage === normalizedPhrase) {
    score += 10;
  } else if (normalizedMessage.includes(normalizedPhrase)) {
    score += 6;
  }

  const phraseTokens = tokenize(normalizedPhrase);
  if (!phraseTokens.length) return score;

  let overlap = 0;
  for (const token of phraseTokens) {
    if (messageTokens.has(token)) {
      overlap += 1;
    }
  }

  if (overlap > 0) {
    score += overlap * 2;
    score += overlap === phraseTokens.length ? 3 : overlap / phraseTokens.length;
  }

  return score;
};

const selectReplyVariant = (responses, message) => {
  if (!responses?.length) return "";

  const normalizedMessage = normalizeText(message);
  const hash = [...normalizedMessage].reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  return responses[hash % responses.length];
};

const getKnowledgeMatch = (message, language) => {
  const lang = safeLanguage(language);
  const normalizedMessage = normalizeText(message);
  const messageTokens = new Set(tokenize(message));
  const rankedIntents = [];

  for (const intent of chatbotKnowledgeBase) {
    const phrases = [
      ...(intent.phrases?.[lang] || []),
      ...(lang === "en" ? [] : intent.phrases?.en || []),
      ...Object.entries(intent.phrases || {})
        .filter(([key]) => key !== lang && key !== "en")
        .flatMap(([, values]) => values),
    ];

    const rankedScores = phrases
      .map((phrase) => scorePhrase(phrase, normalizedMessage, messageTokens))
      .filter(Boolean)
      .sort((a, b) => b - a)
      .slice(0, 3);

    let totalScore = rankedScores.reduce(
      (sum, current, index) => sum + current / (index + 1),
      0,
    );

    if (genericIntentIds.has(intent.id)) {
      totalScore -= 2.5;
    }

    rankedIntents.push({
      intent,
      score: totalScore,
    });
  }

  rankedIntents.sort((left, right) => right.score - left.score);

  const primaryMatch = rankedIntents[0];
  const secondaryMatch = rankedIntents[1];
  const chosenMatch =
    primaryMatch &&
    genericIntentIds.has(primaryMatch.intent.id) &&
    secondaryMatch &&
    !genericIntentIds.has(secondaryMatch.intent.id) &&
    secondaryMatch.score >= primaryMatch.score - 3
      ? secondaryMatch
      : primaryMatch;

  if (!chosenMatch || chosenMatch.score < 4) {
    return null;
  }

  return {
    intent: chosenMatch.intent,
    score: chosenMatch.score,
  };
};

const getAacExpertMatch = (message, language) => {
  const lang = safeLanguage(language);
  const normalizedMessage = normalizeText(message);
  const messageTokens = new Set(tokenize(message));
  let bestMatch = null;

  for (const topic of aacExpertKnowledge) {
    const keywords = [
      ...(topic.keywords?.[lang] || []),
      ...(lang === "en" ? [] : topic.keywords?.en || []),
    ];

    const rankedScores = keywords
      .map((keyword) => scorePhrase(keyword, normalizedMessage, messageTokens))
      .filter(Boolean)
      .sort((a, b) => b - a)
      .slice(0, 3);

    const totalScore = rankedScores.reduce(
      (sum, current, index) => sum + current / (index + 1),
      0,
    );

    if (!bestMatch || totalScore > bestMatch.score) {
      bestMatch = {
        topic,
        score: totalScore,
      };
    }
  }

  if (!bestMatch || bestMatch.score < 5) {
    return null;
  }

  return bestMatch;
};

const matchAacExpertReply = (message, language) => {
  const lang = safeLanguage(language);
  const match = getAacExpertMatch(message, lang);

  if (!match?.topic) {
    return null;
  }

  const responses =
    match.topic.responses?.[lang] ||
    match.topic.responses?.en ||
    chatbotDefaultReplies[lang] ||
    chatbotDefaultReplies.en;

  return {
    reply: selectReplyVariant(responses, message),
    topicId: match.topic.id,
    score: match.score,
  };
};

export const matchLocalKnowledgeReply = (message, language) => {
  const lang = safeLanguage(language);
  const match = getKnowledgeMatch(message, lang);

  if (match?.intent) {
    const responses =
      match.intent.responses?.[lang] ||
      match.intent.responses?.en ||
      chatbotDefaultReplies[lang];

    return {
      reply: selectReplyVariant(responses, message),
      intentId: match.intent.id,
      score: match.score,
    };
  }

  return {
    reply: selectReplyVariant(
      chatbotDefaultReplies[lang] || chatbotDefaultReplies.en,
      message,
    ),
    intentId: "default",
    score: 0,
  };
};

const isLikelyUnclearInput = (message) => {
  const normalized = normalizeText(message);
  if (!normalized) return true;

  const compact = normalized.replace(/\s+/g, "");
  const tokens = normalized.split(" ").filter(Boolean);
  const hasArabicLetters = /[\u0600-\u06ff]/u.test(message);
  const hasWhitespace = /\s/u.test(message);

  if (hasArabicLetters) {
    return !hasWhitespace && /(.)\1{5,}/u.test(compact);
  }

  if (compact.length >= 6 && !hasWhitespace && tokens.length === 1) {
    const uniqueRatio = new Set(compact).size / compact.length;
    if (/(.)\1{4,}/.test(compact) || uniqueRatio < 0.25) {
      return true;
    }
  }

  if (!hasWhitespace && tokens.length === 1) {
    const [token] = tokens;
    if (token.length >= 6 && new Set(token).size <= 2) {
      return true;
    }

    if (/^[a-z]+$/i.test(token) && token.length >= 7 && !/[aeiou]/i.test(token)) {
      return true;
    }
  }

  return false;
};

const getClarifyReply = (language, message) =>
  selectReplyVariant(
    clarifyRepliesByLang[safeLanguage(language)] || clarifyRepliesByLang.en,
    message,
  );

const callConfiguredProvider = async ({ message, language, history }) => {
  if (!env.chatbotApiUrl || !env.chatbotApiKey || !env.chatbotModel) {
    return null;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.chatbotApiKey}`,
  };

  if (env.chatbotHttpReferer) {
    headers["HTTP-Referer"] = env.chatbotHttpReferer;
  }

  if (env.chatbotAppTitle) {
    headers["X-Title"] = env.chatbotAppTitle;
  }

  const response = await fetch(env.chatbotApiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: env.chatbotModel,
      messages: [
        {
          role: "system",
          content: systemPromptByLang[safeLanguage(language)],
        },
        ...history,
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 500,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error?.message || payload?.message || "Chat API failed");
  }

  const reply =
    payload?.choices?.[0]?.message?.content?.trim() ||
    payload?.output_text?.trim() ||
    payload?.reply?.trim();

  if (!reply) {
    throw new Error("Chat API returned an empty reply");
  }

  return reply;
};

export const chatWithBot = async (req, res) => {
  try {
    const message = req.body?.message?.trim();
    const language = safeLanguage(req.body?.language);
    const history = sanitizeHistory(req.body?.history);
    const usingExternalProvider = env.chatbotProviderName !== "local";

    if (!message) {
      return res.status(400).json({
        ok: false,
        message: "Message is required",
      });
    }

    const unclearInput = isLikelyUnclearInput(message);

    try {
      const providerReply = await callConfiguredProvider({
        message,
        language,
        history,
      });

      if (providerReply) {
        return res.json({
          ok: true,
          reply: providerReply,
          provider: env.chatbotProviderName || "configured-api",
        });
      }
    } catch (providerError) {
      console.error("Configured chatbot provider failed:", providerError.message);

      if (usingExternalProvider) {
        return res.status(502).json({
          ok: false,
          message:
            language === "ar"
              ? "تعذر الوصول إلى Groq الآن. تأكد من الـ API key والاتصال ثم حاول مرة أخرى."
              : "Groq is unavailable right now. Check the API key and connection, then try again.",
          provider: env.chatbotProviderName,
        });
      }
    }

    if (usingExternalProvider) {
      return res.status(502).json({
        ok: false,
        message:
          language === "ar"
            ? "لم يصل رد من Groq. تأكد من الإعدادات ثم حاول مرة أخرى."
            : "No reply was received from Groq. Check the configuration and try again.",
        provider: env.chatbotProviderName,
      });
    }

    const expertMatch = matchAacExpertReply(message, language);
    if (expertMatch) {
      return res.json({
        ok: true,
        reply: expertMatch.reply,
        provider: "local-aac-expert",
        intentId: expertMatch.topicId,
      });
    }

    const localMatch = matchLocalKnowledgeReply(message, language);
    if (localMatch.intentId !== "default") {
      return res.json({
        ok: true,
        reply: localMatch.reply,
        provider: "local-dataset",
        intentId: localMatch.intentId,
      });
    }

    if (unclearInput) {
      return res.json({
        ok: true,
        reply: getClarifyReply(language, message),
        provider: "local-clarify",
        intentId: "clarify",
      });
    }

    return res.json({
      ok: true,
      reply: localMatch.reply,
      provider: "local-dataset",
      intentId: localMatch.intentId,
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return res.status(500).json({
      ok: false,
      message: error.message || "Failed to generate chatbot reply",
    });
  }
};
