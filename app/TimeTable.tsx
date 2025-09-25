"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react";
import { getTimeTable } from "./api/mobile";
import { useAuth } from "./context/AuthContext";
import type { ColorValue } from "react-native"
import { useRouter } from "expo-router"

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"



type Period = {
  time: string
  subject: string
  teacher: string
  room: string
  color: [ColorValue, ColorValue] | [ColorValue, ColorValue, ...ColorValue[]]
}

export default function TimeTableScreen() {
  const { token } = useAuth();
  const [timeTable, setTimeTable] = useState<Record<DayOfWeek, Period[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("Monday")
  const router = useRouter() // Add this line

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case "Back":
        router.back()
        break
      case "Home":
        router.push("/Dashboard")
        break
      case "Settings":
        router.push("/Settings")
        break
      default:
        break
    }
  }

  const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const currentSchedule = timeTable[selectedDay] || [];

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getTimeTable(token)
      .then(setTimeTable)
      .catch(() => setError("Failed to load timetable"))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading timetable...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
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
          {/* Simple Back Button */}
          <TouchableOpacity onPress={() => handleNavigation("Back")}>
            <Text style={{ fontSize: 28, color: "#4a5568", fontWeight: "bold" }}>←</Text>
          </TouchableOpacity>
          {/* Removed notification and profile */}
        </View>

        {/* Page Title */}
        <View style={styles.titleSection}>
          <View style={styles.titleCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.titleGradient}>
              <Text style={styles.pageTitle}>Time Table</Text>
              <Text style={styles.pageSubtitle}>Class 5 - Academic Year 2024-2025</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Day Selector */}
        <View style={styles.daySelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.dayContainer}>
              {daysOfWeek.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayTab, selectedDay === day && styles.activeDayTab]}
                  onPress={() => setSelectedDay(day)}
                >
                  {selectedDay === day ? (
                    <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.activeDayGradient}>
                      <Text style={styles.activeDayText}>{day}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.inactiveDay}>
                      <Text style={styles.inactiveDayText}>{day}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Current Day Info */}
        <View style={styles.currentDayInfo}>
          <View style={styles.dayInfoCard}>
            <LinearGradient
              colors={["#4a5568", "#2d3748", "#553c9a"]}
              style={styles.dayInfoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.dayInfoContent}>
                <Text style={styles.currentDayTitle}>{selectedDay}</Text>
                <Text style={styles.currentDaySubtitle}>{currentSchedule.length} Classes Today</Text>
              </View>
              <View style={styles.dayInfoIcon}>
                <Text style={styles.dayIconText}>📚</Text>
              </View>

              {/* Decorative Elements */}
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
            </LinearGradient>
          </View>
        </View>

        {/* Schedule List */}
        <View style={styles.scheduleSection}>
          {currentSchedule.map((period, index) => (
            <View key={index} style={styles.periodCard}>
              <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.periodGradient}>
                <View style={styles.periodContent}>
                  <View style={styles.timeSection}>
                    <LinearGradient colors={period.color} style={styles.timeGradient}>
                      <Text style={styles.timeText}>{period.time}</Text>
                    </LinearGradient>
                  </View>

                  <View style={styles.subjectSection}>
                    <Text style={styles.subjectTitle}>{period.subject}</Text>
                    {period.teacher && <Text style={styles.teacherName}>👨‍🏫 {period.teacher}</Text>}
                    <Text style={styles.roomLocation}>📍 {period.room}</Text>
                  </View>

                  <TouchableOpacity style={styles.moreButton} onPress={() => handleNavigation("PeriodDetails")}>
                    <Text style={styles.moreIcon}>⋯</Text>
                  </TouchableOpacity>
                </View>

                {/* Period Divider */}
                {index < currentSchedule.length - 1 && <View style={styles.periodDivider} />}
              </LinearGradient>
            </View>
          ))}
        </View>

        {/* Weekly Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Weekly Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <LinearGradient colors={["#e53e3e", "#c53030"]} style={styles.summaryGradient}>
                <Text style={styles.summaryIcon}>📊</Text>
                <Text style={styles.summaryValue}>45</Text>
                <Text style={styles.summaryLabel}>Total Classes</Text>
              </LinearGradient>
            </View>

            <View style={styles.summaryCard}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.summaryGradient}>
                <Text style={styles.summaryIcon}>👨‍🏫</Text>
                <Text style={styles.summaryValue}>8</Text>
                <Text style={styles.summaryLabel}>Teachers</Text>
              </LinearGradient>
            </View>

            <View style={styles.summaryCard}>
              <LinearGradient colors={["#38a169", "#2f855a"]} style={styles.summaryGradient}>
                <Text style={styles.summaryIcon}>📚</Text>
                <Text style={styles.summaryValue}>9</Text>
                <Text style={styles.summaryLabel}>Subjects</Text>
              </LinearGradient>
            </View>

            <View style={styles.summaryCard}>
              <LinearGradient colors={["#805ad5", "#6b46c1"]} style={styles.summaryGradient}>
                <Text style={styles.summaryIcon}>⏰</Text>
                <Text style={styles.summaryValue}>37.5</Text>
                <Text style={styles.summaryLabel}>Hours/Week</Text>
              </LinearGradient>
            </View>
          </View>
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

          <TouchableOpacity
            style={[styles.navItem, styles.navItemActive]}
            // This is the current page, so no navigation
          >
            <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.activeNavBg}>
              <Text style={[styles.navIcon, styles.navIconActive]}>📅</Text>
            </LinearGradient>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Timetable</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation("Settings")}>
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
  menuButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  menuGradient: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLine: {
    width: 18,
    height: 2,
    backgroundColor: "white",
    marginVertical: 1.5,
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
  daySelector: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  dayContainer: {
    flexDirection: "row",
    paddingRight: 20,
  },
  dayTab: {
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  activeDayTab: {
    elevation: 4,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  activeDayGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  activeDayText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  inactiveDay: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  inactiveDayText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
  },
  currentDayInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dayInfoCard: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  dayInfoGradient: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  dayInfoContent: {
    flex: 1,
  },
  currentDayTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  currentDaySubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  dayInfoIcon: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 12,
  },
  dayIconText: {
    fontSize: 24,
  },
  decorativeCircle1: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -20,
    right: -20,
  },
  decorativeCircle2: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    bottom: -15,
    left: -15,
  },
  scheduleSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  periodCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  periodGradient: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  periodContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  timeSection: {
    marginRight: 16,
  },
  timeGradient: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
    alignItems: "center",
  },
  timeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  subjectSection: {
    flex: 1,
  },
  subjectTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 2,
  },
  roomLocation: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  moreButton: {
    padding: 8,
  },
  moreIcon: {
    fontSize: 20,
    color: "#94a3b8",
    fontWeight: "bold",
  },
  periodDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginHorizontal: 16,
  },
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  summaryCard: {
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
  summaryGradient: {
    padding: 16,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
  },
  summaryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    textAlign: "center",
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
