/*import React, { useState } from "react";

import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../Api/auth";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Please enter email and password!");
      return;
    }

    try {
      const data = await login({ email, password });

      if (data && data.user) {
        // حفظ بيانات المستخدم
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(data.user));

        // تحويل المستخدم لصفحة Landing
        navigation.navigate("Landing");
      } else {
        setErrorMsg("Email not registered. Please signup first.");
      }
    } catch (err) {
      // إذا السيرفر رجع إن المستخدم مش موجود
      if (err.message === "User not found") {
        setErrorMsg("Email not registered. Please signup first.");
      } else {
        setErrorMsg(err.message || "Server error. Try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VOXI</Text>
      <Text style={styles.subtitle}>AAC Communication App for everyone</Text>
      
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} color="#6a11cb" />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 32, fontWeight: "700", color: "#6a11cb" },
  subtitle: { fontSize: 16, color: "#2575fc", marginBottom: 20 },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 10 },
  error: { color: "red", marginBottom: 10 },
  signupText: { color: "#6a11cb", marginTop: 10 }
});*/
import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../Api/auth";
import { AppContext } from "../context/AppContext"; // ✅ استدعاء context

export default function Login() {
  const navigation = useNavigation();
  const { saveUser } = useContext(AppContext); // ✅ استخدام saveUser من context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Please enter email and password!");
      return;
    }

    try {
      const data = await login({ email, password });

      if (data && data.user) {
        // حفظ بيانات المستخدم في Context و AsyncStorage
        await saveUser(data.user);

        // تحويل المستخدم لصفحة Landing
        navigation.navigate("Landing");
      } else {
        setErrorMsg("Email not registered. Please signup first.");
      }
    } catch (err) {
      if (err.message === "User not found") {
        setErrorMsg("Email not registered. Please signup first.");
      } else {
        setErrorMsg(err.message || "Server error. Try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VOXI</Text>
      <Text style={styles.subtitle}>AAC Communication App for everyone</Text>
      
      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} color="#6a11cb" />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "center", alignItems: "center",
    padding: 20, backgroundColor: "#fff"
  },
  title: { fontSize: 32, fontWeight: "700", color: "#6a11cb" },
  subtitle: { fontSize: 16, color: "#2575fc", marginBottom: 20 },
  input: {
    width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc",
    borderRadius: 10, padding: 10, marginBottom: 10
  },
  error: { color: "red", marginBottom: 10 },
  signupText: { color: "#6a11cb", marginTop: 10 }
});