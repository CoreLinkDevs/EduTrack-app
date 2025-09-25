import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, Switch, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { useRouter } from "expo-router"
import * as LocalAuthentication from "expo-local-authentication";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true)
  const router = useRouter() 

  // Navigation handler for main routes
  const handleNavigation = (screen: string) => {
    switch (screen) {
      case "EditProfile":
        router.push("/EditProfile")
        break
      case "Profile":
        router.push("/Profile")
        break
      case "Notifications":
        router.push("/Notifications")
        break
      case "Home":
        router.push("/Dashboard")
        break
      case "Calendar":
        router.push("/Calendar")
        break
      case "Settings":
        router.push("/Settings")
        break
      default:
        // For other screens, you can add more cases or handle as needed
        break
    }
  }

  // Filtered settings categories and items
  const settingsCategories = [
    {
      title: "Account & Profile",
      icon: "👤",
      items: [
        { title: "Edit Profile", subtitle: "Update personal information", action: "EditProfile" },
        { title: "Child Information", subtitle: "Manage child details", action: "ChildInfo" },
        { title: "Change Password", subtitle: "Update account security", action: "ChangePassword" },
      ]
    },
    {
      title: "Notifications",
      icon: "🔔",
      items: [
        { 
          title: "Push Notifications", 
          subtitle: "Receive app notifications", 
          action: "toggle",
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled
        },
      ]
    },
    {
      title: "Privacy & Security",
      icon: "🔒",
      items: [
        { 
          title: "Biometric Login", 
          subtitle: "Use fingerprint/face ID", 
          action: "toggle",
          value: biometricEnabled,
          onToggle: setBiometricEnabled
        },
        { title: "Two-Factor Authentication", subtitle: "Extra security layer", action: "TwoFactor" },
        { title: "App Permissions", subtitle: "Camera, location, etc.", action: "AppPermissions" },
      ]
    },
    {
      title: "App Preferences",
      icon: "⚙️",
      items: [
        { 
          title: "Dark Mode", 
          subtitle: "Switch to dark theme", 
          action: "toggle",
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled
        },
        { 
          title: "Auto Sync", 
          subtitle: "Sync data automatically", 
          action: "toggle",
          value: autoSyncEnabled,
          onToggle: setAutoSyncEnabled
        },
        { title: "Language", subtitle: "English", action: "Language" },
      ]
    },
    {
      title: "School & Academic",
      icon: "🏫",
      items: [
        { title: "School Information", subtitle: "Learning Field International", action: "SchoolInfo" },
        { title: "Academic Year", subtitle: "2024-2025", action: "AcademicYear" },
      ]
    },
    {
      title: "Support & Help",
      icon: "❓",
      items: [
        { title: "Help Center", subtitle: "FAQs and guides", action: "HelpCenter" },
        { title: "Contact Support", subtitle: "Get help from our team", action: "ContactSupport" },
        { title: "App Tutorial", subtitle: "Learn how to use the app", action: "AppTutorial" },
      ]
    }
  ]

  // When enabling biometric:
  const enableBiometric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (hasHardware && isEnrolled) {
      // Save biometric enabled state (e.g., AsyncStorage)
      setBiometricEnabled(true);
    } else {
      Alert.alert("Biometric not available or not enrolled.");
      setBiometricEnabled(false);
    }
  };

  const isDark = darkModeEnabled;

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDark ? "#18181b" : "#f8fafc",
    },
    greeting: {
      color: isDark ? "#f8fafc" : "#1e293b",
    },
    // ...add more dynamic styles as needed
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
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
          {/* Back Button on the left */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => handleNavigation('Notifications')}
            >
              <LinearGradient
                colors={["#e53e3e", "#c53030"]}
                style={styles.notificationGradient}
              >
                <View style={styles.bellShape}>
                  <View style={styles.bellTop} />
                  <View style={styles.bellBody} />
                </View>
                <View style={styles.notificationDot} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => handleNavigation('Profile')}
            >
              <LinearGradient
                colors={["#3182ce", "#2c5282"]}
                style={styles.profileRing}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                  }}
                  style={styles.profileImage}
                />
              </LinearGradient>
              <View style={styles.onlineIndicator} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Page Title */}
        <View style={styles.titleSection}>
          <View style={styles.titleCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
              style={styles.titleGradient}
            >
              <Text style={styles.pageTitle}>Settings</Text>
              <Text style={styles.pageSubtitle}>Manage your preferences</Text>
            </LinearGradient>
          </View>
        </View>

        {/* User Profile Card */}
        <View style={styles.userCard}>
          <LinearGradient
            colors={["#4a5568", "#2d3748", "#553c9a"]}
            style={styles.userCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.userCardContent}>
              <View style={styles.userInfo}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                  }}
                  style={styles.userAvatar}
                />
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>Mrs. Osei</Text>
                  <Text style={styles.userRole}>Parent Account</Text>
                  <Text style={styles.userEmail}>mrs.osei@email.com</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.editProfileButton}
                onPress={() => handleNavigation('EditProfile')}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                  style={styles.editButtonGradient}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            {/* Decorative Elements */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />
          </LinearGradient>
        </View>

        {/* Settings Categories */}
        {settingsCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.settingsCategory}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </View>
            
            <View style={styles.categoryCard}>
              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
                style={styles.categoryGradient}
              >
                {category.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingsItem,
                      itemIndex === category.items.length - 1 && styles.lastSettingsItem
                    ]}
                    onPress={() => item.action !== 'toggle' && handleNavigation(item.action)}
                  >
                    <View style={styles.settingsItemContent}>
                      <View style={styles.settingsItemText}>
                        <Text style={styles.settingsItemTitle}>{item.title}</Text>
                        <Text style={styles.settingsItemSubtitle}>{item.subtitle}</Text>
                      </View>
                      
                      {item.action === 'toggle' ? (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: '#d1d5db', true: '#4a5568' }}
                          thumbColor={item.value ? '#ffffff' : '#f3f4f6'}
                        />
                      ) : (
                        <Text style={styles.settingsItemArrow}>›</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </LinearGradient>
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>School Tracker v2.1.0</Text>
          <Text style={styles.versionSubtext}>© 2024 Learning Field International</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <LinearGradient
          colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)"]}
          style={styles.navGradient}
        >
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Home')}
          >
            <View style={styles.inactiveNavBg}>
              <Text style={styles.navIcon}>🏠</Text>
            </View>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Calendar')}
          >
            <View style={styles.inactiveNavBg}>
              <Text style={styles.navIcon}>📅</Text>
            </View>
            <Text style={styles.navLabel}>Calendar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, styles.navItemActive]}
            onPress={() => handleNavigation('Settings')}
          >
            <LinearGradient
              colors={["#4a5568", "#2d3748"]}
              style={styles.activeNavBg}
            >
              <Text style={[styles.navIcon, styles.navIconActive]}>⚙️</Text>
            </LinearGradient>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Settings</Text>
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
    bottom: 300,
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
    color: "#1e293b",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
  },
  notificationGradient: {
    padding: 10,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  bellShape: {
    alignItems: "center",
  },
  bellTop: {
    width: 4,
    height: 4,
    backgroundColor: "white",
    borderRadius: 2,
    marginBottom: 1,
  },
  bellBody: {
    width: 12,
    height: 10,
    backgroundColor: "white",
    borderRadius: 6,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  profileButton: {
    position: "relative",
    borderRadius: 25,
    overflow: "hidden",
  },
  profileRing: {
    padding: 3,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#f8fafc",
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  titleGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  userCard: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  userCardGradient: {
    padding: 24,
    position: "relative",
  },
  userCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  editProfileButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  editButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  editButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  decorativeCircle1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    top: -30,
    right: -30,
  },
  decorativeCircle2: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    bottom: -20,
    left: -20,
  },
  settingsCategory: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  categoryCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  categoryGradient: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  settingsItem: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  lastSettingsItem: {
    borderBottomWidth: 0,
  },
  settingsItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  settingsItemText: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  settingsItemSubtitle: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
  settingsItemArrow: {
    fontSize: 20,
    color: "#94a3b8",
    fontWeight: "300",
  },
  versionSection: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
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