import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme"; // استيراد themes

export default function Setting() {
  const { theme, setTheme, language, setLanguage } = useContext(AppContext);
  const currentTheme = themes[theme]; // اللون الحالي حسب theme في AppContext
    // ===== النصوص لكل لغة =====
  const texts = {
    en: {
      settings: "Settings",
      theme: "Theme",
      language: "Language",
      light: "Light",
      dark: "Dark",
      highContrast: "High Contrast",
      languageOptions: { en: "English", ar: "Arabic", fr: "French", es: "Spanish" },
    },
    ar: {
      settings: "الإعدادات",
      theme: "الثيم",
      language: "اللغة",
      light: "فاتح",
      dark: "داكن",
      highContrast: "تباين عالي",
      languageOptions: { en: "إنجليزي", ar: "عربي", fr: "فرنسي", es: "إسباني" },
    },
    fr: {
      settings: "Paramètres",
      theme: "Thème",
      language: "Langue",
      light: "Clair",
      dark: "Sombre",
      highContrast: "Haut Contraste",
      languageOptions: { en: "Anglais", ar: "Arabe", fr: "Français", es: "Espagnol" },
    },
    es: {
      settings: "Configuración",
      theme: "Tema",
      language: "Idioma",
      light: "Claro",
      dark: "Oscuro",
      highContrast: "Alto Contraste",
      languageOptions: { en: "Inglés", ar: "Árabe", fr: "Francés", es: "Español" },
    },
  };
    const t = texts[language]; // النصوص حسب اللغة الحالية

  return (
    /*<View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>Settings</Text>

      {/* ===== THEME ===== *}
      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.subtitle, { color: currentTheme.text }]}>Theme</Text>
        {["light", "dark", "high-contrast"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.button,
              theme === t && styles.activeBtn,
              { borderColor: theme === t ? currentTheme.link : currentTheme.text },
            ]}
            onPress={() => setTheme(t)}
          >
            <Text style={[styles.btnText, { color: currentTheme.text }]}>{t.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ===== LANGUAGE ===== *}
      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.subtitle, { color: currentTheme.text }]}>Language</Text>
        {["en", "ar", "fr", "es"].map((l) => (
          <TouchableOpacity
            key={l}
            style={[
              styles.button,
              language === l && styles.activeBtn,
              { borderColor: language === l ? currentTheme.link : currentTheme.text },
            ]}
            onPress={() => setLanguage(l)}
          >
            <Text style={[styles.btnText, { color: currentTheme.text }]}>{l.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}*/
<View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.title, { color: currentTheme.text }]}>{t.settings}</Text>

      {/* ===== THEME ===== */}
      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.subtitle, { color: currentTheme.text }]}>{t.theme}</Text>
        {["light", "dark", "high-contrast"].map((th) => (
          <TouchableOpacity
            key={th}
            style={[
              styles.button,
              theme === th && styles.activeBtn,
              { borderColor: theme === th ? currentTheme.link : currentTheme.text },
            ]}
            onPress={() => setTheme(th)}
          >
            <Text style={[styles.btnText, { color: currentTheme.text }]}>
              {th === "light" ? t.light : th === "dark" ? t.dark : t.highContrast}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ===== LANGUAGE ===== */}
      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.subtitle, { color: currentTheme.text }]}>{t.language}</Text>
        {["en", "ar", "fr", "es"].map((l) => (
          <TouchableOpacity
            key={l}
            style={[
              styles.button,
              language === l && styles.activeBtn,
              { borderColor: language === l ? currentTheme.link : currentTheme.text },
            ]}
            onPress={() => setLanguage(l)}
          >
            <Text style={[styles.btnText, { color: currentTheme.text }]}>
              {t.languageOptions[l]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 30 },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 4,
  },
  subtitle: { fontSize: 20, fontWeight: "700", marginBottom: 15 },
  button: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  activeBtn: {
    backgroundColor: "#4CAF50",
  },
  btnText: { fontWeight: "600", textAlign: "center" },
});
