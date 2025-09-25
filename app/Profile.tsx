"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, TextInput, Switch } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { useRouter } from "expo-router"
import type { ColorValue } from "react-native"

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const router = useRouter()

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case "Back":
        router.back()
        break
      case "EditProfile":
        router.push("/EditProfile")
        break
      case "Home":
        router.push("/Dashboard")
        break
      case "Calendar":
        router.push("/Calendar")
        break
      default:
        break
    }
  }

  const [userProfile, setUserProfile] = useState({
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
  })

  const menuItems: {
    id: number
    title: string
    subtitle: string
    icon: string
    color: [ColorValue, ColorValue]
    action: string
  }[] = [
    {
      id: 1,
      title: "Academic Records",
      subtitle: "View your academic history",
      icon: "📚",
      color: ["#3182ce", "#2c5282"],
      action: "AcademicRecords",
    },
    {
      id: 2,
      title: "Medical Information",
      subtitle: "Health records and allergies",
      icon: "🏥",
      color: ["#e53e3e", "#c53030"],
      action: "MedicalInfo",
    },
    {
      id: 3,
      title: "Parent Information",
      subtitle: "Contact details and emergency contacts",
      icon: "👨‍👩‍👧‍👦",
      color: ["#38a169", "#2f855a"],
      action: "ParentInfo",
    },
    {
      id: 4,
      title: "Privacy & Security",
      subtitle: "Manage your privacy settings",
      icon: "🔒",
      color: ["#805ad5", "#6b46c1"],
      action: "Privacy",
    },
    {
      id: 5,
      title: "Help & Support",
      subtitle: "Get help and contact support",
      icon: "❓",
      color: ["#d69e2e", "#b7791f"],
      action: "Support",
    },
    {
      id: 6,
      title: "About",
      subtitle: "App version and information",
      icon: "ℹ️",
      color: ["#64748b", "#4a5568"],
      action: "About",
    },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save logic here
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
          <TouchableOpacity style={styles.backButton} onPress={() => handleNavigation("Back")}>
            <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.backGradient}>
              <Text style={styles.backIcon}>‹</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleNavigation("EditProfile")}
          >
            <LinearGradient
              colors={["#3182ce", "#2c5282"]}
              style={styles.editGradient}
            >
              <Text style={styles.editText}>Edit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <LinearGradient
              colors={["#4a5568", "#2d3748", "#553c9a"]}
              style={styles.profileGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.profileContent}>
                <View style={styles.avatarSection}>
                  <View style={styles.avatarContainer}>
                    <LinearGradient
                      colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                      style={styles.avatarRing}
                    >
                      <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} />
                    </LinearGradient>
                    {/* Camera icon removed */}
                  </View>
                </View>

                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{userProfile.name}</Text>
                  <Text style={styles.studentId}>ID: {userProfile.studentId}</Text>
                  <Text style={styles.profileClass}>{userProfile.class}</Text>
                </View>
              </View>

              {/* Decorative Elements */}
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
            </LinearGradient>
          </View>
        </View>

        {/* Removed Stats Grid */}

        {/* Personal Information */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.infoGradient}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Full Name</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.infoInput}
                    value={userProfile.name}
                    onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
                  />
                ) : (
                  <Text style={styles.infoValue}>{userProfile.name}</Text>
                )}
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.infoInput}
                    value={userProfile.email}
                    onChangeText={(text) => setUserProfile({ ...userProfile, email: text })}
                  />
                ) : (
                  <Text style={styles.infoValue}>{userProfile.email}</Text>
                )}
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Phone Number</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.infoInput}
                    value={userProfile.phone}
                    onChangeText={(text) => setUserProfile({ ...userProfile, phone: text })}
                  />
                ) : (
                  <Text style={styles.infoValue}>{userProfile.phone}</Text>
                )}
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Date of Birth</Text>
                <Text style={styles.infoValue}>{userProfile.dateOfBirth}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Blood Group</Text>
                <Text style={styles.infoValue}>{userProfile.bloodGroup}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Address</Text>
                {isEditing ? (
                  <TextInput
                    style={[styles.infoInput, styles.multilineInput]}
                    value={userProfile.address}
                    onChangeText={(text) => setUserProfile({ ...userProfile, address: text })}
                    multiline
                  />
                ) : (
                  <Text style={styles.infoValue}>{userProfile.address}</Text>
                )}
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingsCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.settingsGradient}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingSubtitle}>Receive notifications for updates</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#e2e8f0", true: "#38a169" }}
                  thumbColor={notificationsEnabled ? "#ffffff" : "#f4f4f5"}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Dark Mode</Text>
                  <Text style={styles.settingSubtitle}>Switch to dark theme</Text>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: "#e2e8f0", true: "#4a5568" }}
                  thumbColor={darkModeEnabled ? "#ffffff" : "#f4f4f5"}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Biometric Login</Text>
                  <Text style={styles.settingSubtitle}>Use fingerprint or face ID</Text>
                </View>
                <Switch
                  value={biometricEnabled}
                  onValueChange={setBiometricEnabled}
                  trackColor={{ false: "#e2e8f0", true: "#3182ce" }}
                  thumbColor={biometricEnabled ? "#ffffff" : "#f4f4f5"}
                />
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>More Options</Text>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleNavigation(item.action)}>
              <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.menuGradient}>
                <View style={styles.menuContent}>
                  <View style={styles.menuIcon}>
                    <LinearGradient colors={item.color} style={styles.menuIconGradient}>
                      <Text style={styles.menuIconText}>{item.icon}</Text>
                    </LinearGradient>
                  </View>

                  <View style={styles.menuInfo}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>

                  <Text style={styles.menuArrow}>›</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={() => handleNavigation("Logout")}>
            <LinearGradient colors={["#e53e3e", "#c53030"]} style={styles.logoutGradient}>
              <Text style={styles.logoutIcon}>🚪</Text>
              <Text style={styles.logoutText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <LinearGradient colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)"]} style={styles.navGradient}>
          <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation("Home")}>
            <View style={styles.inactiveNavBg}>
              <Text style={styles.navIcon}>🏠</Text>
            </View>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation("Calendar")}>
            <View style={styles.inactiveNavBg}>
              <Text style={styles.navIcon}>📅</Text>
            </View>
            <Text style={styles.navLabel}>Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navItem, styles.navItemActive]} onPress={() => {}}>
            <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.activeNavBg}>
              <Text style={[styles.navIcon, styles.navIconActive]}>👤</Text>
            </LinearGradient>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Profile</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
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
    backgroundColor: "rgba(128, 90, 213, 0.03)",
    top: 300,
    left: -30,
  },
  patternCircle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(56, 161, 105, 0.03)",
    bottom: 200,
    right: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
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
  editButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  editGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  editText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  profileCard: {
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  profileGradient: {
    padding: 28,
    position: "relative",
  },
  profileContent: {
    alignItems: "center",
    zIndex: 2,
  },
  avatarSection: {
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarRing: {
    padding: 4,
    borderRadius: 60,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  cameraIcon: {
    fontSize: 16,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
    textAlign: "center",
  },
  studentId: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
    marginBottom: 8,
  },
  profileClass: {
    fontSize: 16,
    color: "rgba(255,255,255,0.95)",
    fontWeight: "700",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
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
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statGradient: {
    padding: 16,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    textAlign: "center",
  },
  personalInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  infoGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  infoInput: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#3182ce",
    paddingVertical: 4,
  },
  multilineInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  settingsCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  settingsGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  menuItem: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuGradient: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  menuIcon: {
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  menuIconGradient: {
    padding: 8,
  },
  menuIconText: {
    fontSize: 20,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  menuArrow: {
    fontSize: 20,
    color: "#94a3b8",
    fontWeight: "bold",
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  logoutButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#e53e3e",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  navGradient: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.3)",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navItemActive: {
    // Active styling handled by gradient background
  },
  activeNavBg: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
  },
  inactiveNavBg: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
  },
  navIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },
  navLabelActive: {
    color: "#4a5568",
    fontWeight: "700",
  },
})
