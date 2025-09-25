"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { getUserByEmail, registerUser } from './api/auth';
import { useSignUp } from '@clerk/clerk-expo';

export default function RegisterScreen() {
  const router = useRouter()
  const { signUp, isLoaded } = useSignUp();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    dateOfBirth: "",
    age: "",
    password: "",
    confirmPassword: "",
  })

  const [focusedField, setFocusedField] = useState("")
  const [userFetched, setUserFetched] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpCode, setOtpCode] = useState("")

  const handleFetchUserDetails = async () => {
    if (!formData.email.trim()) return;

    if (!isLoaded) {
      Alert.alert("Please wait", "Loading sign-up context...");
      return;
    }

    try {
      const userData = await getUserByEmail(formData.email);

      setFormData((prev) => ({
        ...prev,
        userName: userData.fullName || userData.username || '',
        dateOfBirth: userData.dateOfBirth || '',
        age: userData.age || '',
      }));

      await signUp.create({ emailAddress: formData.email });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      Alert.alert('Verification Code Sent', 'Check your inbox and enter the 6-digit code.');
      setOtpSent(true);
    } catch (err: any) {
      console.error('Failed to fetch user or send code', err);
      Alert.alert('Error', err?.message || 'Something went wrong.');
      setUserFetched(false);
      setOtpSent(false);
    }
  };

  const verifyOTP = async () => {
    if (!isLoaded) {
      Alert.alert("Error", "SignUp not ready yet. Please wait a moment.");
      return;
    }

    try {
      const verification = await signUp.attemptEmailAddressVerification({ code: otpCode });
      if (verification.status === "complete") {
        setOtpVerified(true);
        setUserFetched(true);
        Alert.alert("Verified", "Email verification successful.");
      } else {
        Alert.alert("Error", "Invalid code. Try again.");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
      Alert.alert("Error", "Could not verify code.");
    }
  };

  const handleCreateAccount = async () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (!otpVerified) {
      Alert.alert("Error", "Please verify your email before proceeding.");
      return;
    }

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        username: formData.userName,
        name: formData.userName.split(" ")[0],
        surname: formData.userName.split(" ")[1] || '',
        role: "PARENT",
      };

      await registerUser(payload);
      Alert.alert("Success", "Account created successfully!");
      router.push("/ChildDetails");
    } catch (err: any) {
      Alert.alert("Registration Failed", err?.response?.data?.message || "Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />

      <LinearGradient colors={["#0f0f23", "#1a1a2e", "#16213e"]} style={{ flex: 1, padding: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold', marginBottom: 20 }}>
            Create Account
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            onBlur={handleFetchUserDetails}
            style={styles.input}
          />

          {otpSent && !otpVerified && (
            <>
              <TextInput
                placeholder="Enter 6-digit code"
                placeholderTextColor="#888"
                value={otpCode}
                onChangeText={setOtpCode}
                style={styles.input}
              />
              <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                <Text style={styles.buttonText}>Verify Email</Text>
              </TouchableOpacity>
            </>
          )}

          {userFetched && otpVerified && (
            <>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#aaa"
                value={formData.userName}
                editable={false}
                style={[styles.input, { backgroundColor: '#222' }]}
              />
              <TextInput
                placeholder="Date of Birth"
                placeholderTextColor="#aaa"
                value={formData.dateOfBirth}
                editable={false}
                style={[styles.input, { backgroundColor: '#222' }]}
              />
              <TextInput
                placeholder="Age"
                placeholderTextColor="#aaa"
                value={formData.age}
                editable={false}
                style={[styles.input, { backgroundColor: '#222' }]}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                style={styles.input}
              />
              <TouchableOpacity
                style={[styles.button, { backgroundColor: otpVerified ? '#667eea' : '#888' }]}
                onPress={handleCreateAccount}
                disabled={!otpVerified}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#1e1e2e',
    color: 'white',
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    borderColor: '#333',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
