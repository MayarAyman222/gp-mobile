import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "../theme/theme";
import { AppContext } from "../context/AppContext";

export default function Profile() {
  const { theme, language } = useContext(AppContext); // هاجبي theme و language
  const currentTheme = themes[theme];

  // ====== النصوص لكل لغة ======
  const texts = {
    en: {
      profile: "Profile",
      edit: "Edit",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      condition: "Condition",
      save: "Save",
      cancel: "Cancel",
      loading: "Loading...",
      success: "Your data has been updated!",
    },
    ar: {
      profile: "الملف الشخصي",
      edit: "تعديل",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      email: "البريد الإلكتروني",
      condition: "الحالة",
      save: "حفظ",
      cancel: "إلغاء",
      loading: "جاري التحميل...",
      success: "تم تحديث بياناتك!",
    },
  };

  const t = texts[language] || texts.en;

  // ====== State المستخدم ======
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    condition: "",
  });
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState({ ...userData });

  // ===== Load user from AsyncStorage =====
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("loggedInUser");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData(user);
          setEditData(user);
        }
        setLoading(false);
      } catch (err) {
        console.log("Error loading user:", err);
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // ===== Save changes =====
  const handleSave = async () => {
    setUserData({ ...editData });
    await AsyncStorage.setItem("loggedInUser", JSON.stringify(editData));
    setModalVisible(false);
    Alert.alert(t.success);
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center", backgroundColor: currentTheme.background },
        ]}
      >
        <Text style={{ color: currentTheme.text }}>{t.loading}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: currentTheme.background }]}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.headerText, { color: currentTheme.text }]}>{t.profile}</Text>
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: currentTheme.link }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.editButtonText}>{t.edit}</Text>
        </TouchableOpacity>
      </View>

      {/* PROFILE CARD */}
      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/user-avatar.png")} // صورة ثابتة من المشروع
            style={styles.avatar}
          />
        </View>

        <View style={styles.info}>
          <Text style={[styles.name, { color: currentTheme.text }]}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={[styles.label, { color: currentTheme.text }]}>
            {t.email}: <Text style={styles.value}>{userData.email}</Text>
          </Text>
          <Text style={[styles.label, { color: currentTheme.text }]}>
            {t.condition}: <Text style={styles.value}>{userData.condition}</Text>
          </Text>
        </View>
      </View>

      {/* EDIT MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: currentTheme.card }]}>
            <Text style={[styles.modalTitle, { color: currentTheme.text }]}>{t.edit} {t.profile}</Text>

            <ScrollView style={{ width: "100%" }}>
              {["firstName", "lastName", "email", "condition"].map((key) => (
                <TextInput
                  key={key}
                  style={[styles.input, { borderColor: currentTheme.text, color: currentTheme.text }]}
                  placeholder={t[key]}
                  placeholderTextColor="#888"
                  value={editData[key]}
                  onChangeText={(text) => setEditData({ ...editData, [key]: text })}
                />
              ))}

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: currentTheme.link }]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>{t.save}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>{t.cancel}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// ===== Styles =====
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, marginBottom: 20 },
  headerText: { fontSize: 24, fontWeight: "bold" },
  editButton: { padding: 10, borderRadius: 8 },
  editButtonText: { color: "#fff", fontWeight: "700" },
  card: { borderRadius: 12, padding: 30, alignItems: "center", marginTop: 130, flexDirection: "row" },
  avatarContainer: { marginRight: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  info: { flex: 1 },
  name: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  label: { fontSize: 16, marginBottom: 6 },
  value: { fontWeight: "600" },
  modalOverlay: { flex: 1, backgroundColor: "#00000080", justifyContent: "center", alignItems: "center", padding: 20 },
  modalContainer: { width: "100%", borderRadius: 12, padding: 20, maxHeight: "80%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: Platform.OS === "ios" ? 14 : 10, marginBottom: 15, fontSize: 16 },
  saveButton: { padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  saveButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cancelButton: { padding: 14, borderRadius: 8, alignItems: "center", marginTop: 10, borderWidth: 1, borderColor: "#888" },
  cancelButtonText: { color: "#888", fontWeight: "600" },
});