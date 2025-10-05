"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, Modal } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { getParentHome } from "./api/mobile"
import { useAuth } from "./context/AuthContext"

const DashboardScreen = () => {
  const router = useRouter()
  const [menuVisible, setMenuVisible] = useState(false)
  const { user, token } = useAuth()
  const [homeData, setHomeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch home data for the parent
  useEffect(() => {
    if (!token) return
    setLoading(true)
    getParentHome(token)
      .then(setHomeData)
      .catch(() => setError("Failed to load home data"))
      .finally(() => setLoading(false))
  }, [token])

  // Get parent's first name from API response
  const parentFirstName = homeData?.parent?.name
    ? homeData.parent.name.split(" ")[0]
    : "Parent";

  // Get first child's info from API response
  const firstChild = Array.isArray(homeData?.children) && homeData.children.length > 0
    ? homeData.children[0]
    : null;
  const studentName = firstChild?.name || "No student found";
  const studentClass = firstChild?.class || "No class found";

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Side Menu Modal */}
      <Modal visible={menuVisible} animationType="slide" transparent onRequestClose={() => setMenuVisible(false)}>
        <View style={styles.menuOverlay}>
          <View style={styles.sideMenu}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false)
                router.push("/Profile")
              }}
            >
              <Text style={styles.menuItemText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false)
                router.push("/Settings")
              }}
            >
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false)
                router.push("/Help")
              }}
            >
              <Text style={styles.menuItemText}>Help</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false)
                router.push("/Logout") // <-- Navigate to the logout page
              }}
            >
              <Text style={[styles.menuItemText, { color: "#e53e3e" }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.menuBackdrop} onPress={() => setMenuVisible(false)} />
        </View>
      </Modal>

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
        {/* Enhanced Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
            <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.menuGradient}>
              {/* Professional 3-bar menu icon */}
              <View style={styles.menuBars}>
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
                <View style={styles.menuLine} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton} onPress={() => router.push("/Notifications")}>
              <LinearGradient colors={["#e53e3e", "#c53030"]} style={styles.notificationGradient}>
                {/* Professional bell notification icon */}
                <View style={styles.bellIcon}>
                  <View style={styles.bellTop} />
                  <View style={styles.bellBody} />
                  <View style={styles.bellBottom} />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileButton} onPress={() => router.push("/Profile")}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.profileRing}>
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

        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <View style={styles.greetingCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.greetingGradient}>
              <Text style={styles.greeting}>Welcome, {parentFirstName}</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Student Profile Card (UI only, not functional yet) */}
        <View style={styles.childCardWrapper}>
          <LinearGradient
            colors={["#4a5568", "#2d3748", "#553c9a"]}
            style={styles.childCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.childCardContent}>
              <View style={styles.childInfo}>
                <Text style={styles.childLabel}>Student Profile</Text>
                <Text style={styles.childName}>{studentName}</Text>
                <Text style={styles.childClass}>{studentClass}</Text>
                {!firstChild && (
                  <Text style={{ color: "#e53e3e", marginTop: 8 }}>
                    No child profile found for this parent.
                  </Text>
                )}
                <View style={styles.achievementBadge}>
                  <Text style={styles.achievementText}>Honor Student</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.childProfileButton}
                onPress={() => router.push("/ChildProfile")}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                  style={styles.profileButtonGradient}
                >
                  <Text style={styles.profileButtonText}>View Profile</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Enhanced Activities Section */}
        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Activities</Text>
          <View style={styles.activitiesGrid}>
            <TouchableOpacity style={styles.activityCard} onPress={() => router.push("/Attendance")}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.activityGradient}>
                <Image
                  source={require("../assets/illustrations/attendance.png")}
                  style={{ width: 48, height: 48, marginBottom: 8 }}
                />
                <Text style={styles.activityTitle}>Attendance</Text>
                <Text style={styles.activitySubtitle}>95% This Month</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityCard} onPress={() => router.push("/Assignments")}>
              <LinearGradient colors={["#d69e2e", "#b7791f"]} style={styles.activityGradient}>
                <Image
                  source={require("../assets/illustrations/assignments.png")}
                  style={{ width: 48, height: 48, marginBottom: 8 }}
                />
                <Text style={styles.activityTitle}>Assignments</Text>
                <Text style={styles.activitySubtitle}>12 Pending</Text>
              </LinearGradient>
            </TouchableOpacity>


            <TouchableOpacity style={styles.activityCard} onPress={() => router.push("/TimeTable")}>
              <LinearGradient colors={["#38a169", "#2f855a"]} style={styles.activityGradient}>
                <Image
                  source={require("../assets/illustrations/timetable.png")}
                  style={{ width: 48, height: 48, marginBottom: 8 }}
                />
                <Text style={styles.activityTitle}>Time Table</Text>
                <Text style={styles.activitySubtitle}>Today's Schedule</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityCard} onPress={() => router.push("/Chat")}>
              <LinearGradient colors={["#805ad5", "#6b46c1"]} style={styles.activityGradient}>
                <Image
                  source={require("../assets/illustrations/chat.png")}
                  style={{ width: 48, height: 48, marginBottom: 8 }}
                />
                <Text style={styles.activityTitle}>Chat</Text>
                <Text style={styles.activitySubtitle}>3 New Messages</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Enhanced Action Buttons */}
        <View style={styles.actionButtonsSection}>
          {/* Enhanced Fees Status Button */}
          <TouchableOpacity style={styles.feesButton} onPress={() => router.push("/FeeStatus")}>
            <LinearGradient
              colors={["#4a5568", "#2d3748", "#553c9a"]}
              style={styles.feesButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.feesContent}>
                <View style={styles.feesLeft}>
                  <View>
                    <Text style={styles.feesButtonText}>Fees Status</Text>
                    <Text style={styles.feesSubtext}>Check Payment History</Text>
                  </View>
                </View>
                <View style={styles.feesRight}>
                  <Text style={styles.feesAmount}>$2,450</Text>
                  <Text style={styles.feesStatus}>Paid</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Enhanced Bottom Action Buttons */}
          <View style={styles.bottomButtonsRow}>
            <TouchableOpacity style={styles.announcementButton} onPress={() => router.push("/Announcements")}>
              <LinearGradient
                colors={["#e53e3e", "#c53030"]}
                style={styles.announcementGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.announcementText}>Announcements</Text>
                <Text style={styles.actionSubtext}>5 New Updates</Text>
                <View style={styles.actionBadge}>
                  <Text style={styles.badgeText}>NEW</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resultsButton} onPress={() => router.push("/Results")}>
              <LinearGradient
                colors={["#d69e2e", "#b7791f"]}
                style={styles.resultsGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.resultsText}>Results</Text>
                <Text style={styles.actionSubtext}>Latest Grades</Text>
                <View style={styles.gradeIndicator}>
                  <Text style={styles.gradeText}>A+</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Enhanced Bottom Navigation */}
      <View style={styles.bottomNav}>
        <LinearGradient colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)"]} style={styles.navGradient}>
          <TouchableOpacity
            style={[styles.navItem, styles.navItemActive]}
            onPress={() => router.push("/Dashboard")}
          >
            <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.activeNavBg}>
              <Text style={[styles.navIcon, styles.navIconActive]}>🏠</Text>
            </LinearGradient>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/Calendar")}
          >
            <View style={styles.inactiveNavBg}>
              <Text style={styles.navIcon}>📅</Text>
            </View>
            <Text style={styles.navLabel}>Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/Settings")}
          >
            <View style={styles.inactiveNavBg}>
              <Text style={styles.navIcon}>⚙️</Text>
            </View>
            <Text style={styles.navLabel}>Settings</Text>
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
    top: 200,
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
  menuButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  menuGradient: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  // Professional 3-bar menu icon styles
  menuBars: {
    alignItems: "center",
    justifyContent: "center",
  },
  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: "white",
    marginVertical: 2,
    borderRadius: 1,
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
  // Professional bell notification icon styles
  bellIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  bellTop: {
    width: 3,
    height: 3,
    backgroundColor: "white",
    borderRadius: 1.5,
    marginBottom: 1,
  },
  bellBody: {
    width: 16,
    height: 14,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 8,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  bellBottom: {
    width: 8,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
    marginTop: 1,
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
  greetingSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greetingCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  greetingGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 8,
  },
  roleContainer: {
    alignSelf: "flex-start",
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userRole: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  activitiesSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  activitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  activityCard: {
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
  activityGradient: {
    padding: 20,
    alignItems: "center",
    minHeight: 110,
    justifyContent: "center",
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
    textAlign: "center",
  },
  activitySubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
    textAlign: "center",
  },
  actionButtonsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  feesButton: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  feesButtonGradient: {
    padding: 24,
  },
  feesContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feesLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  feesButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  feesSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
  feesRight: {
    alignItems: "flex-end",
  },
  feesAmount: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 2,
  },
  feesStatus: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontWeight: "600",
  },
  bottomButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  announcementButton: {
    width: "48%",
    borderRadius: 18,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#e53e3e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  announcementGradient: {
    padding: 20,
    alignItems: "center",
    minHeight: 120,
    justifyContent: "center",
    position: "relative",
  },
  announcementText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  actionSubtext: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  actionBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
  resultsButton: {
    width: "48%",
    borderRadius: 18,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#d69e2e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  resultsGradient: {
    padding: 20,
    alignItems: "center",
    minHeight: 120,
    justifyContent: "center",
    position: "relative",
  },
  resultsText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  gradeIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  gradeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "800",
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
  menuOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sideMenu: {
    width: "65%",
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 24,
    height: "100%",
    elevation: 10,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    color: "#1e293b",
  },
  menuItem: {
    paddingVertical: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: "#22223b",
    fontWeight: "600",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 16,
  },
  menuBackdrop: {
    flex: 1,
  },
  childCardWrapper: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  childCardGradient: {
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  childCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  childInfo: {
    flex: 1,
  },
  childLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
    marginBottom: 4,
  },
  childName: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  classContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  childClass: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    marginRight: 8,
  },
  achievementBadge: {
    backgroundColor: "#38a169",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  achievementText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  childProfileButton: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  profileButtonText: {
    color: "#1e293b",
    fontSize: 14,
    fontWeight: "600",
  },
})

export default DashboardScreen
