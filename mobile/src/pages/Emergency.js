import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Linking,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { APP_CONFIG } from "../config/appConfig";
import { AppContext } from "../context/AppContext";
import { themes } from "../theme/theme";

const normalizePhoneForWhatsApp = (raw) => {
  const digits = String(raw || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) return `20${digits.slice(1)}`;
  if (digits.startsWith("20")) return digits;
  return digits;
};

const labelFor = (item, lang) =>
  item[`label_${lang}`] ||
  item.label ||
  item.label_en ||
  item.label_ar ||
  item.label_fr ||
  item.label_es ||
  "Emergency Number";

const Emergency = () => {
  const { theme, language } = useContext(AppContext);
  const currentTheme = themes[theme];

  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [message, setMessage] = useState("");

  const loadNumbers = async () => {
    try {
      const res = await fetch(
        `${APP_CONFIG.apiUrl}/emergency-numbers?t=${Date.now()}`,
        { method: "GET" },
      );
      const data = await res.json();
      setNumbers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNumbers();
  }, []);

  const handleAddNumber = async () => {
    const trimmed = newNumber.trim();
    if (!trimmed) return;
    try {
      const res = await fetch(`${APP_CONFIG.apiUrl}/emergency-numbers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: trimmed,
          label: newLabel.trim() || null,
        }),
      });
      const created = await res.json();
      console.log("Created:", created); // 👈 اطبع هنا
      setNumbers((prev) => {
        const exists = prev.some((n) => n.number === created.number);
        return exists ? prev : [...prev, created];
      });
      setShowAdd(false);
      setNewNumber("");
      setNewLabel("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = () => {
    const phone = normalizePhoneForWhatsApp(selectedNumber);
    if (!phone) return;
    const text = encodeURIComponent(message || "");
    const url = `https://wa.me/${phone}?text=${text}`;
    Linking.openURL(url);
    setShowMessage(false);
  };

  const renderItem = ({ item }) => {
    const label = labelFor(item, language);
    return (
      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        <Text style={[styles.title, { color: currentTheme.text }]}>{label}</Text>
        <Text style={[styles.number, { color: currentTheme.text }]}>{item.number}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: currentTheme.background }]}>
        <ActivityIndicator size="large" color={currentTheme.text} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.header, { color: currentTheme.text }]}>Emergency</Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#dc3545" }]}
          onPress={() => setShowAdd(true)}
        >
          <Text style={styles.btnText}>Add Emergency Number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#f0ad4e" }]}
          onPress={() => setShowMessage(true)}
        >
          <Text style={styles.btnText}>Send Urgent Message</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={numbers}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id || item.number)}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      {/* Add number modal */}
      <Modal visible={showAdd} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: currentTheme.card }]}>
            <Text style={[styles.modalTitle, { color: currentTheme.text }]}>
              Add Emergency Number
            </Text>
            <TextInput
              value={newNumber}
              onChangeText={setNewNumber}
              placeholder="010XXXXXXXX"
              placeholderTextColor={currentTheme.textSecondary || "#888"}
              style={[styles.input, { color: currentTheme.text, borderColor: currentTheme.text }]}
            />
            <TextInput
              value={newLabel}
              onChangeText={setNewLabel}
              placeholder="Label (optional)"
              placeholderTextColor={currentTheme.textSecondary || "#888"}
              style={[styles.input, { color: currentTheme.text, borderColor: currentTheme.text }]}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.miniBtn, { backgroundColor: "#6c757d" }]} onPress={() => setShowAdd(false)}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.miniBtn, { backgroundColor: "#dc3545" }]} onPress={handleAddNumber}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Send message modal */}
      <Modal visible={showMessage} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: currentTheme.card }]}>
            <Text style={[styles.modalTitle, { color: currentTheme.text }]}>
              Send Urgent Message
            </Text>
            <View
              style={[
                styles.pickerBox,
                { borderColor: currentTheme.text, marginBottom: 10 },
              ]}
            >
              <Picker
                selectedValue={selectedNumber}
                onValueChange={(val) => setSelectedNumber(val)}
                dropdownIconColor={currentTheme.text}
                style={{ color: currentTheme.text }}
              >
                <Picker.Item label="Select" value="" />
                {numbers.map((item) => {
                  const lbl = labelFor(item, language);
                  return (
                    <Picker.Item
                      key={item.id || item.number}
                      label={`${lbl} - ${item.number}`}
                      value={item.number}
                    />
                  );
                })}
              </Picker>
            </View>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Write your urgent message here..."
              placeholderTextColor={currentTheme.textSecondary || "#888"}
              multiline
              numberOfLines={4}
              style={[
                styles.input,
                { color: currentTheme.text, borderColor: currentTheme.text, height: 100, textAlignVertical: "top" },
              ]}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.miniBtn, { backgroundColor: "#6c757d" }]} onPress={() => setShowMessage(false)}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.miniBtn, { backgroundColor: "#f0ad4e", opacity: selectedNumber ? 1 : 0.6 }]}
                onPress={handleSendMessage}
                disabled={!selectedNumber}
              >
                <Text style={styles.btnText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Emergency;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "800", marginBottom: 12, textAlign: "center" },
  actionsRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },
  card: {
    padding: 14,
    borderRadius: 12,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  number: { fontSize: 18, fontWeight: "700" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: {
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    marginBottom: 10,
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 6 },
  miniBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerBox: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});
