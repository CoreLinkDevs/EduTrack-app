"use client"

import { useEffect, useState } from "react"
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
  ActivityIndicator,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"

export default function ChildDetailsScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    age: "",
    school: "",
  })

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        // TODO: Replace with actual API endpoint once available
        // Example: const response = await axios.get('/api/parent/children');
        const response = {
          data: {
            fullName: "Joseph Amoako",
            dateOfBirth: "12/06/2015",
            age: "10",
            school: "Learning Field International",
          },
        }
        setFormData(response.data)
      } catch (error) {
        console.error("Failed to fetch child details", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChildDetails()
  }, [])

  const handleProceed = () => {
    router.replace("/Dashboard")
  }

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />

      <LinearGradient colors={["#0f0f23", "#1a1a2e", "#16213e"]} style={styles.backgroundGradient} />
      <View style={[styles.floatingElement, styles.element1]} />
      <View style={[styles.floatingElement, styles.element2]} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.progressText}>Step 2 of 2</Text>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Child's Information</Text>
          <Text style={styles.subtitle}>Here are your child's details as registered by the school</Text>
        </View>

        {/* Form (read-only) */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Child's Full Name *</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>👶</Text>
              </View>
              <TextInput
                style={styles.input}
                value={formData.fullName}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                  <Text style={styles.inputIcon}>📅</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={formData.dateOfBirth}
                  editable={false}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Age</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                  <Text style={styles.inputIcon}>#</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={formData.age}
                  editable={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>School *</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputIconContainer}>
                <Text style={styles.inputIcon}>🏫</Text>
              </View>
              <TextInput
                style={styles.input}
                value={formData.school}
                editable={false}
              />
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed} activeOpacity={0.8}>
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.proceedButtonText}>Complete Setup</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  floatingElement: {
    position: "absolute",
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    borderRadius: 100,
  },
  element1: {
    width: 120,
    height: 120,
    top: 150,
    right: -40,
  },
  element2: {
    width: 80,
    height: 80,
    bottom: 250,
    left: -20,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  backIcon: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#667eea",
    borderRadius: 3,
  },
  progressText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    fontWeight: "500",
  },
  titleSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 24,
  },
  form: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
  },
  inputFocused: {
    borderColor: "#667eea",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    elevation: 4,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  inputIconContainer: {
    width: 50,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  inputIcon: {
    fontSize: 18,
    color: "#94a3b8",
  },
  input: {
    flex: 1,
    height: 56,
    color: "white",
    fontSize: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
  },
  picker: {
    flex: 1,
    height: 56,
    color: "white",
  },
  infoCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 8,
  },
  infoCardGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  buttonRow: {
    gap: 12,
  },
  addButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 12,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  proceedButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  buttonArrow: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  completeButton: {
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})
