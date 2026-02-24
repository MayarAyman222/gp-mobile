/*import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [language, setLanguage] = useState(null);

  // تحميل القيم المحفوظة
  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      const savedLanguage = await AsyncStorage.getItem("language");

      setTheme(savedTheme || "light");
      setLanguage(savedLanguage || "en");
    };

    loadSettings();
  }, []);

  // حفظ Theme
  useEffect(() => {
    if (theme) AsyncStorage.setItem("theme", theme);
  }, [theme]);

  // حفظ Language
  useEffect(() => {
    if (language) AsyncStorage.setItem("language", language);
  }, [language]);

  if (language === null || theme === null) return null; // منع render قبل التحميل

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};*/
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// إنشاء Context
export const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [language, setLanguage] = useState(null);
  const [user, setUser] = useState(null); // ✅ إضافة user

  // ------------------- تحميل القيم المحفوظة -------------------
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        const savedLanguage = await AsyncStorage.getItem("language");
        const savedUser = await AsyncStorage.getItem("loggedInUser");

        setTheme(savedTheme || "light");
        setLanguage(savedLanguage || "en");
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch (err) {
        console.log("Error loading settings:", err);
        setTheme("light");
        setLanguage("en");
      }
    };

    loadSettings();
  }, []);

  // ------------------- حفظ Theme -------------------
  useEffect(() => {
    if (theme) AsyncStorage.setItem("theme", theme);
  }, [theme]);

  // ------------------- حفظ Language -------------------
  useEffect(() => {
    if (language) AsyncStorage.setItem("language", language);
  }, [language]);

  // ------------------- دالة لحفظ أو تحديث user -------------------
  const saveUser = async (u) => {
    try {
      setUser(u);
      if (u) {
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(u));
      } else {
        await AsyncStorage.removeItem("loggedInUser");
      }
    } catch (err) {
      console.log("Error saving user:", err);
    }
  };

  // ------------------- منع render قبل تحميل theme و language -------------------
  if (theme === null || language === null) return null;

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        user,
        saveUser, // ✅ إضافة saveUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

