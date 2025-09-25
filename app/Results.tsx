"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import type { ColorValue } from "react-native"
import { useRouter } from "expo-router"

export default function ResultsScreen() {
  const [selectedTerm, setSelectedTerm] = useState("current")
  const router = useRouter()

  const handleNavigation = (screen: string) => {
    if (screen === "Back") {
      router.back()
    }
    // Add other navigation as needed
  }

  const terms = [
    { key: "current", label: "Current Term", period: "Term 2, 2024" },
    { key: "previous", label: "Previous Term", period: "Term 1, 2024" },
    { key: "annual", label: "Annual Report", period: "2023-2024" },
  ]

  const currentResults = {
    term: "Term 2, 2024",
    position: 3,
    totalStudents: 45,
    overallGrade: "A-",
    overallPercentage: 87.5,
    subjects: [
      {
        name: "Mathematics",
        teacher: "Mrs. Abena Mensah",
        classScore: 92,
        examScore: 88,
        totalScore: 90,
        grade: "A+",
        position: 2,
        comment: "Excellent performance in algebra and geometry. Keep up the great work!",
        color: ["#e53e3e", "#c53030"] as [ColorValue, ColorValue],
      },
      {
        name: "English Language",
        teacher: "Mr. John Asante",
        classScore: 85,
        examScore: 82,
        totalScore: 84,
        grade: "A",
        position: 5,
        comment: "Good improvement in essay writing. Focus more on grammar.",
        color: ["#3182ce", "#2c5282"] as [ColorValue, ColorValue],
      },
      {
        name: "Science",
        teacher: "Dr. Sarah Osei",
        classScore: 88,
        examScore: 90,
        totalScore: 89,
        grade: "A+",
        position: 1,
        comment: "Outstanding performance in all science topics. Excellent lab work!",
        color: ["#38a169", "#2f855a"] as [ColorValue, ColorValue],
      },
      {
        name: "Social Studies",
        teacher: "Mr. Kwame Nkrumah",
        classScore: 80,
        examScore: 85,
        totalScore: 83,
        grade: "A",
        position: 4,
        comment: "Good understanding of historical concepts. Improve map work.",
        color: ["#805ad5", "#6b46c1"] as [ColorValue, ColorValue],
      },
      {
        name: "French",
        teacher: "Mme. Akosua Boateng",
        classScore: 78,
        examScore: 80,
        totalScore: 79,
        grade: "B+",
        position: 8,
        comment: "Good progress in speaking. Practice more vocabulary.",
        color: ["#d69e2e", "#b7791f"] as [ColorValue, ColorValue],
      },
      {
        name: "Physical Education",
        teacher: "Coach Michael",
        classScore: 95,
        examScore: 92,
        totalScore: 94,
        grade: "A+",
        position: 1,
        comment: "Excellent athletic performance and team spirit!",
        color: ["#48bb78", "#38a169"] as [ColorValue, ColorValue],
      },
    ],
  }

  

  const performanceStats = [
    {
      label: "Class Position",
      value: `${currentResults.position}/${currentResults.totalStudents}`,
      icon: "🏆",
      color: ["#e53e3e", "#c53030"] as [ColorValue, ColorValue],
    },
    { label: "Overall Grade", value: currentResults.overallGrade, icon: "📊", color: ["#3182ce", "#2c5282"] as [ColorValue, ColorValue] },
    { label: "Percentage", value: `${currentResults.overallPercentage}%`, icon: "📈", color: ["#38a169", "#2f855a"] as [ColorValue, ColorValue] },
    { label: "Subjects", value: `${currentResults.subjects.length}`, icon: "📚", color: ["#805ad5", "#6b46c1"] as [ColorValue, ColorValue] },
  ]

  const getGradeColor = (grade: string) => {
    if (grade.includes("A")) return "#38a169"
    if (grade.includes("B")) return "#3182ce"
    if (grade.includes("C")) return "#d69e2e"
    if (grade.includes("D")) return "#e53e3e"
    return "#64748b"
  }

  const getPositionSuffix = (position: number) => {
    if (position === 1) return "st"
    if (position === 2) return "nd"
    if (position === 3) return "rd"
    return "th"
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
          {/* Back Button replaces menu */}
          <TouchableOpacity onPress={() => handleNavigation("Back")}>
            <Text style={{ fontSize: 28, color: "#4a5568", fontWeight: "bold" }}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <View style={styles.titleSection}>
          <View style={styles.titleCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.titleGradient}>
              <Text style={styles.pageTitle}>Academic Results</Text>
              <Text style={styles.pageSubtitle}>Track your Child's academic progress</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Term Selector */}
        <View style={styles.termSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.termContainer}>
              {terms.map((term) => (
                <TouchableOpacity
                  key={term.key}
                  style={[styles.termTab, selectedTerm === term.key && styles.activeTermTab]}
                  onPress={() => setSelectedTerm(term.key)}
                >
                  {selectedTerm === term.key ? (
                    <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.activeTermGradient}>
                      <Text style={styles.activeTermText}>{term.label}</Text>
                      <Text style={styles.activeTermPeriod}>{term.period}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.inactiveTerm}>
                      <Text style={styles.inactiveTermText}>{term.label}</Text>
                      <Text style={styles.inactiveTermPeriod}>{term.period}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Performance Overview */}
        <View style={styles.overviewSection}>
          <View style={styles.overviewCard}>
            <LinearGradient
              colors={["#4a5568", "#2d3748", "#553c9a"]}
              style={styles.overviewGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.overviewContent}>
                <View style={styles.overviewHeader}>
                  <Text style={styles.overviewTitle}>Overall Performance</Text>
                  <Text style={styles.overviewTerm}>{currentResults.term}</Text>
                </View>

                <View style={styles.mainStats}>
                  <View style={styles.positionSection}>
                    <Text style={styles.positionNumber}>{currentResults.position}</Text>
                    <Text style={styles.positionSuffix}>{getPositionSuffix(currentResults.position)}</Text>
                    <Text style={styles.positionLabel}>Position</Text>
                    <Text style={styles.totalStudents}>out of {currentResults.totalStudents} students</Text>
                  </View>

                  <View style={styles.gradeSection}>
                    <Text style={styles.overallGrade}>{currentResults.overallGrade}</Text>
                    <Text style={styles.overallPercentage}>{currentResults.overallPercentage}%</Text>
                  </View>
                </View>
              </View>

              {/* Decorative Elements */}
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
            </LinearGradient>
          </View>
        </View>

        {/* Performance Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {performanceStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <LinearGradient colors={stat.color} style={styles.statGradient}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        {/* Subject Results */}
        <View style={styles.subjectsSection}>
          <Text style={styles.sectionTitle}>Subject Results</Text>
          {currentResults.subjects.map((subject, index) => (
            <View key={index} style={styles.subjectCard}>
              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
                style={styles.subjectGradient}
              >
                <View style={styles.subjectHeader}>
                  <View style={styles.subjectInfo}>
                    <LinearGradient colors={subject.color} style={styles.subjectIcon}>
                      <Text style={styles.subjectIconText}>📚</Text>
                    </LinearGradient>
                    <View style={styles.subjectDetails}>
                      <Text style={styles.subjectName}>{subject.name}</Text>
                      <Text style={styles.teacherName}>👨‍🏫 {subject.teacher}</Text>
                    </View>
                  </View>

                  <View style={styles.subjectGrades}>
                    <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(subject.grade) }]}>
                      <Text style={styles.gradeText}>{subject.grade}</Text>
                    </View>
                    <Text style={styles.subjectPosition}>
                      {subject.position}
                      {getPositionSuffix(subject.position)}
                    </Text>
                  </View>
                </View>

                <View style={styles.scoresSection}>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreLabel}>Class Work</Text>
                    <Text style={styles.scoreValue}>{subject.classScore}%</Text>
                  </View>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreLabel}>Exam</Text>
                    <Text style={styles.scoreValue}>{subject.examScore}%</Text>
                  </View>
                  <View style={styles.scoreItem}>
                    <Text style={styles.scoreLabel}>Total</Text>
                    <Text style={[styles.scoreValue, styles.totalScore]}>{subject.totalScore}%</Text>
                  </View>
                </View>

                <View style={styles.progressSection}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${subject.totalScore}%` }]} />
                  </View>
                </View>

                <View style={styles.commentSection}>
                  <Text style={styles.commentTitle}>Teacher's Comment:</Text>
                  <Text style={styles.commentText}>{subject.comment}</Text>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => handleNavigation("DownloadReport")}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.actionGradient}>
                <Text style={styles.actionIcon}>📄</Text>
                <Text style={styles.actionText}>Download Report</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard} onPress={() => handleNavigation("ShareResults")}>
              <LinearGradient colors={["#38a169", "#2f855a"]} style={styles.actionGradient}>
                <Text style={styles.actionIcon}>📤</Text>
                <Text style={styles.actionText}>Share Results</Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* Removed Book Meeting and View Trends */}
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation removed */}
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
  termSelector: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  termContainer: {
    flexDirection: "row",
    paddingRight: 20,
  },
  termTab: {
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  activeTermTab: {
    elevation: 4,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  activeTermGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  activeTermText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 2,
  },
  activeTermPeriod: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
  inactiveTerm: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  inactiveTermText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  inactiveTermPeriod: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "500",
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
    position: "relative",
  },
  overviewContent: {
    zIndex: 2,
  },
  overviewHeader: {
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  overviewTerm: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  mainStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  positionSection: {
    alignItems: "center",
  },
  positionNumber: {
    fontSize: 48,
    fontWeight: "900",
    color: "white",
    lineHeight: 48,
  },
  positionSuffix: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
    marginTop: -8,
  },
  positionLabel: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    marginTop: 4,
  },
  totalStudents: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },
  gradeSection: {
    alignItems: "center",
  },
  overallGrade: {
    fontSize: 36,
    fontWeight: "900",
    color: "white",
    marginBottom: 4,
  },
  overallPercentage: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
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
  subjectsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  subjectCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  subjectGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  subjectInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  subjectIcon: {
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  subjectIconText: {
    fontSize: 16,
    color: "white",
  },
  subjectDetails: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  teacherName: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
  },
  subjectGrades: {
    alignItems: "center",
  },
  gradeBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 4,
  },
  gradeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  subjectPosition: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },
  scoresSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  scoreItem: {
    alignItems: "center",
    flex: 1,
  },
  scoreLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "700",
  },
  totalScore: {
    color: "#38a169",
    fontSize: 18,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 3,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#38a169",
    borderRadius: 3,
  },
  commentSection: {
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: 12,
    padding: 12,
  },
  commentTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 6,
  },
  commentText: {
    fontSize: 14,
    color: "#4a5568",
    fontWeight: "500",
    lineHeight: 18,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
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
  actionGradient: {
    padding: 16,
    alignItems: "center",
    minHeight: 80,
    justifyContent: "center",
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  actionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
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
