import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../Api/auth";

export default function Signup() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [condition, setCondition] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async () => {
    setErrorMsg("");

    if (!firstName || !lastName || !email || !password || !condition) {
      setErrorMsg("Please fill all fields!");
      return;
    }

    try {
      await signup({
        firstName,
        lastName,
        email,
        password,
        condition,
      });

      // نجاح التسجيل → تحويل للـ login
      navigation.navigate("Login");
    } catch (err) {
      setErrorMsg(err.message || "Signup failed");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>VOXI</Text>
      <Text style={styles.subtitle}>AAC Communication App – Create Account</Text>

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={condition}
          onValueChange={(itemValue) => setCondition(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select patient type" value="" />
          <Picker.Item label="AUTISM" value="AUTISM" />
          <Picker.Item label="STROKE" value="STROKE" />
          <Picker.Item label="ALZHEIMER" value="ALZHEIMER" />
          <Picker.Item label="SPEECH_DELAY" value="SPEECH_DELAY" />
          <Picker.Item label="OTHER" value="OTHER" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={{ color: "#ff7eb3" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 32, fontWeight: "700", color: "#6a11cb", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#2575fc", fontWeight: "500", marginBottom: 20, textAlign: "center" },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    width: "100%",
    height: 50,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#6a11cb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
  loginText: { color: "#6a11cb", marginTop: 10 },
});
