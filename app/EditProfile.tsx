"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, TextInput, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"

type UserProfile = {
  name: string
  email: string
  phone: string
  studentId: string
  class: string
  dateOfBirth: string
  address: string
  emergencyContact: string
  bloodGroup: string
  avatar: string
  parentName: string
  parentEmail: string
  allergies: string
  medicalConditions: string
}

export default function EditProfileScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleNavigation = (screen: string) => {
    console.log(`Navigate to ${screen}`)
  }

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Osei Koomson Ajei",
    email: "osei.ajei@student.lfi.edu.gh",
    phone: "+233 24 123 4567",
    studentId: "LFI2024001",
    class: "Class 5",
    dateOfBirth: "March 15, 2014",
    address: "123 Accra Street, East Legon",
    emergencyContact: "+233 20 987 6543",
    bloodGroup: "O+",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    parentName: "Mr. & Mrs. Koomson",
    parentEmail: "parents@koomson.com",
    allergies: "None",
    medicalConditions: "None",
  })

  const [originalProfile] = useState<UserProfile>({ ...userProfile })

  const profileSections: {
    title: string
    icon: string
    color: [string, string]
    fields: any[]
  }[] = [
    {
      title: "Personal Information",
      icon: "👤",
      color: ["#3182ce", "#2c5282"],
      fields: [
        { key: "name", label: "Full Name", type: "text", required: true },
        { key: "email", label: "Email Address", type: "email", required: true },
        { key: "phone", label: "Phone Number", type: "phone", required: true },
        { key: "dateOfBirth", label: "Date of Birth", type: "date", readonly: true },
        { key: "bloodGroup", label: "Blood Group", type: "text", readonly: true },
        { key: "address", label: "Home Address", type: "multiline", required: true },
      ],
    },
    {
      title: "Academic Information",
      icon: "📚",
      color: ["#38a169", "#2f855a"],
      fields: [
        { key: "studentId", label: "Student ID", type: "text", readonly: true },
        { key: "class", label: "Current Class", type: "text", readonly: true },
      ],
    },
    {
      title: "Emergency Contact",
      icon: "🚨",
      color: ["#e53e3e", "#c53030"],
      fields: [
        { key: "parentName", label: "Parent/Guardian Name", type: "text", required: true },
        { key: "parentEmail", label: "Parent Email", type: "email", required: true },
        { key: "emergencyContact", label: "Emergency Phone", type: "phone", required: true },
      ],
    },
    {
      title: "Medical Information",
      icon: "🏥",
      color: ["#805ad5", "#6b46c1"],
      fields: [
        { key: "allergies", label: "Known Allergies", type: "multiline" },
        { key: "medicalConditions", label: "Medical Conditions", type: "multiline" },
      ],
    },
  ]

  const handleInputChange = (key: string, value: string) => {
    setUserProfile((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleImageUpload = () => {
    // Simulate image picker
    Alert.alert(
      "Change Profile Picture",
      "Choose an option",
      [
        { text: "Camera", onPress: () => selectImageFromCamera() },
        { text: "Gallery", onPress: () => selectImageFromGallery() },
        { text: "Remove Photo", onPress: () => removeProfilePicture(), style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true },
    )
  }

  const selectImageFromCamera = () => {
    console.log("Opening camera...")
    // Simulate image selection
    setTimeout(() => {
      const newImageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
      setUserProfile((prev) => ({ ...prev, avatar: newImageUrl }))
      setHasChanges(true)
    }, 1000)
  }

  const selectImageFromGallery = () => {
    console.log("Opening gallery...")
    // Simulate image selection
    setTimeout(() => {
      const newImageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
      setUserProfile((prev) => ({ ...prev, avatar: newImageUrl }))
      setHasChanges(true)
    }, 1000)
  }

  const removeProfilePicture = () => {
    const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face"
    setUserProfile((prev) => ({ ...prev, avatar: defaultAvatar }))
    setHasChanges(true)
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)

    // Validate required fields
    const requiredFields: any[] = []
    profileSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (
          field.required &&
          !(userProfile[field.key as keyof UserProfile] as string)?.trim()
        ) {
          requiredFields.push(field.label)
        }
      })
    })

    if (requiredFields.length > 0) {
      Alert.alert("Missing Information", `Please fill in: ${requiredFields.join(", ")}`)
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setHasChanges(false)
      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => handleNavigation("Profile") },
      ])
    }, 2000)
  }

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure you want to discard them?",
        [
          { text: "Keep Editing", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              setUserProfile({ ...originalProfile })
              setHasChanges(false)
              handleNavigation("Profile")
            },
          },
        ],
        { cancelable: true }
      )
    } else {
      handleNavigation("Profile")
    }
  }

  const renderField = (field: any) => {
    const value = userProfile[field.key as keyof UserProfile] || ""

    if (field.readonly) {
      return (
        <View key={field.key} style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{field.label}</Text>
          <View style={styles.readonlyField}>
            <Text style={styles.readonlyText}>{value}</Text>
          </View>
        </View>
      )
    }

    return (
      <View key={field.key} style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {field.label}
          {field.required && <Text style={styles.requiredStar}> *</Text>}
        </Text>
        <TextInput
          style={[styles.textInput, field.type === "multiline" && styles.multilineInput]}
          value={value}
          onChangeText={(text) => handleInputChange(field.key, text)}
          placeholder={`Enter ${field.label.toLowerCase()}`}
          placeholderTextColor="#94a3b8"
          multiline={field.type === "multiline"}
          numberOfLines={field.type === "multiline" ? 3 : 1}
          keyboardType={field.type === "email" ? "email-address" : field.type === "phone" ? "phone-pad" : "default"}
          autoCapitalize={field.type === "email" ? "none" : "sentences"}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
            <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.backGradient}>
              <Text style={styles.backIcon}>‹</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit Profile</Text>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile} disabled={isLoading || !hasChanges}>
            <LinearGradient
              colors={hasChanges ? ["#38a169", "#2f855a"] : ["#94a3b8", "#64748b"]}
              style={styles.saveGradient}
            >
              {isLoading ? (
                <View style={styles.loadingContent}>
                  <View style={styles.spinner} />
                  <Text style={styles.saveText}>Saving...</Text>
                </View>
              ) : (
                <Text style={styles.saveText}>Save</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Profile Picture Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCard}>
            <LinearGradient
              colors={["#4a5568", "#2d3748", "#553c9a"]}
              style={styles.avatarGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.avatarContent}>
                <Text style={styles.avatarTitle}>Profile Picture</Text>
                <Text style={styles.avatarSubtitle}>Tap to change your profile photo</Text>

                <TouchableOpacity style={styles.avatarContainer} onPress={handleImageUpload}>
                  <View style={styles.avatarWrapper}>
                    <LinearGradient
                      colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                      style={styles.avatarRing}
                    >
                      <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} />
                    </LinearGradient>
                    <View style={styles.cameraOverlay}>
                      <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5)"]} style={styles.cameraGradient}>
                        <Text style={styles.cameraIcon}>📷</Text>
                        <Text style={styles.cameraText}>Change</Text>
                      </LinearGradient>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={styles.uploadOptions}>
                  <TouchableOpacity style={styles.uploadOption} onPress={selectImageFromCamera}>
                    <LinearGradient
                      colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
                      style={styles.optionGradient}
                    >
                      <Text style={styles.optionIcon}>📷</Text>
                      <Text style={styles.optionText}>Camera</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.uploadOption} onPress={selectImageFromGallery}>
                    <LinearGradient
                      colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
                      style={styles.optionGradient}
                    >
                      <Text style={styles.optionIcon}>🖼️</Text>
                      <Text style={styles.optionText}>Gallery</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.uploadOption} onPress={removeProfilePicture}>
                    <LinearGradient
                      colors={["rgba(229,62,62,0.3)", "rgba(197,48,48,0.2)"]}
                      style={styles.optionGradient}
                    >
                      <Text style={styles.optionIcon}>🗑️</Text>
                      <Text style={styles.optionText}>Remove</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Decorative Elements */}
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
            </LinearGradient>
          </View>
        </View>

        {/* Form Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.formSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <LinearGradient colors={section.color} style={styles.sectionIconContainer}>
                  <Text style={styles.sectionIcon}>{section.icon}</Text>
                </LinearGradient>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
                style={styles.sectionGradient}
              >
                {section.fields.map((field) => renderField(field))}
              </LinearGradient>
            </View>
          </View>
        ))}

        {/* Save Instructions */}
        <View style={styles.instructionsSection}>
          <View style={styles.instructionsCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
              style={styles.instructionsGradient}
            >
              <Text style={styles.instructionsIcon}>💡</Text>
              <Text style={styles.instructionsTitle}>Profile Tips</Text>
              <Text style={styles.instructionsText}>
                • Keep your information up to date for better communication{"\n"}• Use a clear profile picture for easy
                identification{"\n"}• Emergency contact information is crucial for safety{"\n"}• Medical information
                helps in case of emergencies
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} disabled={isLoading}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.cancelGradient}>
              <Text style={styles.cancelText}>Cancel</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveMainButton}
            onPress={handleSaveProfile}
            disabled={isLoading || !hasChanges}
          >
            <LinearGradient
              colors={hasChanges ? ["#38a169", "#2f855a"] : ["#94a3b8", "#64748b"]}
              style={styles.saveMainGradient}
            >
              {isLoading ? (
                <View style={styles.loadingContent}>
                  <View style={styles.spinner} />
                  <Text style={styles.saveMainText}>Saving Changes...</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.saveIcon}>💾</Text>
                  <Text style={styles.saveMainText}>Save Changes</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(74, 85, 104, 0.03)",
    top: -50,
    right: -50,
  },
  patternCircle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(56, 161, 105, 0.03)",
    top: 300,
    left: -30,
  },
  patternCircle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(128, 90, 213, 0.03)",
    bottom: 200,
    right: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  backButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  backGradient: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
  },
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  saveGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  spinner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    borderTopColor: "white",
    marginRight: 6,
  },
  saveText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  avatarSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  avatarCard: {
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  avatarGradient: {
    padding: 28,
    position: "relative",
  },
  avatarContent: {
    alignItems: "center",
    zIndex: 2,
  },
  avatarTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  avatarSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarRing: {
    padding: 4,
    borderRadius: 70,
  },
  profileAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    overflow: "hidden",
  },
  cameraGradient: {
    paddingVertical: 12,
    alignItems: "center",
  },
  cameraIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  cameraText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  uploadOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  uploadOption: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    overflow: "hidden",
  },
  optionGradient: {
    padding: 12,
    alignItems: "center",
  },
  optionIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  optionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  decorativeCircle1: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    top: -40,
    right: -40,
  },
  decorativeCircle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    bottom: -30,
    left: -30,
  },
  formSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionIconContainer: {
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
  },
  sectionCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
  },
  requiredStar: {
    color: "#e53e3e",
  },
  textInput: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  readonlyField: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  readonlyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
  },
  instructionsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  instructionsCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  instructionsGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
  },
  instructionsIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "left",
  },
  actionsSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  cancelButton: {
    flex: 1,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cancelGradient: {
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#64748b",
  },
  saveMainButton: {
    flex: 2,
    marginLeft: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#38a169",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  saveMainGradient: {
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  saveIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  saveMainText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
})
