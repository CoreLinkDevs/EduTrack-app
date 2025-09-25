"use client"

import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, ActivityIndicator, FlatList } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { getAttendanceRecords } from "./api/mobile"
import { useAuth } from "./context/AuthContext"

export default function AttendanceScreen() {
  const router = useRouter()
  const { token } = useAuth()
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("June 2025")

  const monthlyStats = {
    totalDays: 22,
    presentDays: 20,
    absentDays: 2,
    percentage: 91,
  }

  useEffect(() => {
    getAttendanceRecords(token)
      .then(setAttendance)
      .catch(() => setError("Failed to load attendance records"))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#553c9a" />
      </View>
    )
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    )
  }

  if (!attendance.length) {
    return (
      <View style={styles.center}>
        <Text>No attendance records found.</Text>
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
        {/* Modern Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.backButtonGradient}>
              <View style={styles.backArrow}>
                <View style={styles.arrowLine1} />
                <View style={styles.arrowLine2} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Attendance Record</Text>
            <Text style={styles.studentName}>Osei Koomson Ajei</Text>
          </View>
        </View>

        {/* Monthly Overview Card */}
        <View style={styles.overviewSection}>
          <TouchableOpacity style={styles.overviewCard}>
            <LinearGradient
              colors={["#4a5568", "#2d3748", "#553c9a"]}
              style={styles.overviewGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.overviewHeader}>
                <Text style={styles.overviewMonth}>{selectedMonth}</Text>
                <View style={styles.percentageBadge}>
                  <Text style={styles.percentageText}>{monthlyStats.percentage}%</Text>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{monthlyStats.presentDays}</Text>
                  <Text style={styles.statLabel}>Present</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{monthlyStats.absentDays}</Text>
                  <Text style={styles.statLabel}>Absent</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{monthlyStats.totalDays}</Text>
                  <Text style={styles.statLabel}>Total Days</Text>
                </View>
              </View>

              {/* Decorative Elements */}
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Weekly Attendance Section */}
        <View style={styles.weeklySection}>
          <Text style={styles.sectionTitle}>This Week</Text>

          <View style={styles.attendanceList}>
            {attendance.map((item, index) => (
              <View key={index} style={styles.attendanceItem}>
                <LinearGradient
                  colors={
                    item.status === "present"
                      ? ["rgba(34, 197, 94, 0.1)", "rgba(34, 197, 94, 0.05)"]
                      : ["rgba(239, 68, 68, 0.1)", "rgba(239, 68, 68, 0.05)"]
                  }
                  style={styles.attendanceItemGradient}
                >
                  <View style={styles.attendanceLeft}>
                    <View style={styles.dateContainer}>
                      <Text style={styles.attendanceDate}>{item.date}</Text>
                      <Text style={styles.attendanceDay}>{item.day}</Text>
                    </View>
                  </View>

                  <View style={styles.attendanceCenter}>
                    <Text style={styles.attendanceTime}>{item.time}</Text>
                  </View>

                  <View style={styles.attendanceRight}>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: item.status === "present" ? "#22c55e" : "#ef4444" },
                      ]}
                    >
                      <View style={styles.statusIcon}>
                        {item.status === "present" ? (
                          <View style={styles.checkIcon}>
                            <View style={styles.checkLine1} />
                            <View style={styles.checkLine2} />
                          </View>
                        ) : (
                          <View style={styles.crossIcon}>
                            <View style={styles.crossLine1} />
                            <View style={styles.crossLine2} />
                          </View>
                        )}
                      </View>
                      <Text style={styles.statusText}>{item.status === "present" ? "Present" : "Absent"}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.actionButtonGradient}>
              <Text style={styles.actionButtonText}>View Full Report</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient colors={["#d69e2e", "#b7791f"]} style={styles.actionButtonGradient}>
              <Text style={styles.actionButtonText}>Request Leave</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Teacher's Note */}
        <View style={styles.noteSection}>
          <View style={styles.noteCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.noteGradient}>
              <Text style={styles.noteTitle}>Teacher's Note</Text>
              <Text style={styles.noteText}>
                Osei has shown excellent attendance this month. Keep up the good work! Please ensure to notify the
                school in advance for any planned absences.
              </Text>
              <Text style={styles.noteAuthor}>- Mrs. Johnson, Class Teacher</Text>
            </LinearGradient>
          </View>
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
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 16,
  },
  backButtonGradient: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowLine1: {
    position: "absolute",
    width: 12,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
    transform: [{ rotate: "45deg" }, { translateX: -2 }],
  },
  arrowLine2: {
    position: "absolute",
    width: 12,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
    transform: [{ rotate: "-45deg" }, { translateX: -2 }],
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 4,
  },
  studentName: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "600",
  },
  overviewSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  overviewCard: {
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  overviewGradient: {
    padding: 28,
    minHeight: 160,
    position: "relative",
  },
  overviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  overviewMonth: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  percentageBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  percentageText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: 10,
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
    left: -20,
  },
  weeklySection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  attendanceList: {
    gap: 12,
  },
  attendanceItem: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  attendanceItemGradient: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  attendanceLeft: {
    flex: 1,
  },
  dateContainer: {
    alignItems: "flex-start",
  },
  attendanceDate: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 2,
  },
  attendanceDay: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  attendanceCenter: {
    flex: 1,
    alignItems: "center",
  },
  attendanceTime: {
    fontSize: 14,
    color: "#4a5568",
    fontWeight: "600",
  },
  attendanceRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusIcon: {
    marginRight: 6,
  },
  checkIcon: {
    width: 12,
    height: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkLine1: {
    position: "absolute",
    width: 6,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
    transform: [{ rotate: "45deg" }, { translateX: -1 }],
  },
  checkLine2: {
    position: "absolute",
    width: 10,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
    transform: [{ rotate: "-45deg" }, { translateX: 1 }],
  },
  crossIcon: {
    width: 12,
    height: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  crossLine1: {
    position: "absolute",
    width: 10,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
    transform: [{ rotate: "45deg" }],
  },
  crossLine2: {
    position: "absolute",
    width: 10,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
    transform: [{ rotate: "-45deg" }],
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  actionSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  actionButtonGradient: {
    padding: 16,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  noteSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  noteCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  noteGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 12,
  },
  noteText: {
    fontSize: 14,
    color: "#4a5568",
    lineHeight: 20,
    marginBottom: 12,
  },
  noteAuthor: {
    fontSize: 12,
    color: "#64748b",
    fontStyle: "italic",
    fontWeight: "500",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recordCard: {
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 4,
  },
  status: {
    fontSize: 15,
    color: "#4a5568",
    marginBottom: 2,
  },
  remarks: {
    fontSize: 14,
    color: "#6b7280",
  },
})
