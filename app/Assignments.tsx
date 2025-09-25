"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import type { ColorValue } from "react-native"
import { useRouter } from "expo-router"

export default function AssignmentsScreen() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const router = useRouter()

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
        // Add more navigation as needed
        break
    }
  }

  type Assignment = {
    id: number
    title: string
    subject: string
    dueDate: string
    status: string
    priority: string
    description: string
    submissionType: string
    marks: number
    teacher: string
    color: [ColorValue, ColorValue]
  }

  const assignments: Assignment[] = [
    {
      id: 1,
      title: "Mathematics - Algebra Problems",
      subject: "Mathematics",
      dueDate: "2024-07-15",
      status: "pending",
      priority: "high",
      description: "Complete exercises 1-20 from Chapter 5",
      submissionType: "Written",
      marks: 25,
      teacher: "Mrs. Abena Mensah",
      color: ["#e53e3e", "#c53030"],
    },
    {
      id: 2,
      title: "English - Essay Writing",
      subject: "English",
      dueDate: "2024-07-18",
      status: "submitted",
      priority: "medium",
      description: "Write a 500-word essay on 'My Future Career'",
      submissionType: "Digital",
      marks: 30,
      teacher: "Mr. John Asante",
      color: ["#3182ce", "#2c5282"],
    },
    {
      id: 3,
      title: "Science - Lab Report",
      subject: "Science",
      dueDate: "2024-07-20",
      status: "overdue",
      priority: "high",
      description: "Submit lab report on plant growth experiment",
      submissionType: "Digital",
      marks: 20,
      teacher: "Dr. Sarah Osei",
      color: ["#38a169", "#2f855a"],
    },
    {
      id: 4,
      title: "Social Studies - Research Project",
      subject: "Social Studies",
      dueDate: "2024-07-25",
      status: "pending",
      priority: "low",
      description: "Research and present on Ghana's independence",
      submissionType: "Presentation",
      marks: 35,
      teacher: "Mr. Kwame Nkrumah",
      color: ["#805ad5", "#6b46c1"],
    },
  ]

  const filters = [
    { key: "all", label: "All", count: assignments.length },
    { key: "pending", label: "Pending", count: assignments.filter((a) => a.status === "pending").length },
    { key: "submitted", label: "Submitted", count: assignments.filter((a) => a.status === "submitted").length },
    { key: "overdue", label: "Overdue", count: assignments.filter((a) => a.status === "overdue").length },
  ]

  const filteredAssignments =
    selectedFilter === "all" ? assignments : assignments.filter((a) => a.status === selectedFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "#38a169"
      case "overdue":
        return "#e53e3e"
      case "pending":
        return "#d69e2e"
      default:
        return "#64748b"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return "🔴"
      case "medium":
        return "🟡"
      case "low":
        return "🟢"
      default:
        return "⚪"
    }
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
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15 }}>
          <TouchableOpacity onPress={() => handleNavigation("Back")}>
            <Text style={{ fontSize: 28, color: "#4a5568", fontWeight: "bold" }}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <View style={styles.titleSection}>
          <View style={styles.titleCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.titleGradient}>
              <Text style={styles.pageTitle}>Assignments</Text>
              <Text style={styles.pageSubtitle}>Track your homework & projects</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterContainer}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  style={[styles.filterTab, selectedFilter === filter.key && styles.activeFilterTab]}
                  onPress={() => setSelectedFilter(filter.key)}
                >
                  {selectedFilter === filter.key ? (
                    <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.activeFilterGradient}>
                      <Text style={styles.activeFilterText}>{filter.label}</Text>
                      <View style={styles.filterBadge}>
                        <Text style={styles.filterBadgeText}>{filter.count}</Text>
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={styles.inactiveFilter}>
                      <Text style={styles.inactiveFilterText}>{filter.label}</Text>
                      <View style={styles.inactiveFilterBadge}>
                        <Text style={styles.inactiveFilterBadgeText}>{filter.count}</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Assignments List */}
        <View style={styles.assignmentsSection}>
          {filteredAssignments.map((assignment) => (
            <TouchableOpacity
              key={assignment.id}
              style={styles.assignmentCard}
              onPress={() => handleNavigation(`Assignment_${assignment.id}`)}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
                style={styles.assignmentGradient}
              >
                <View style={styles.assignmentHeader}>
                  <View style={styles.assignmentTitleSection}>
                    <View style={styles.priorityContainer}>
                      <Text style={styles.priorityIcon}>{getPriorityIcon(assignment.priority)}</Text>
                      <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(assignment.status) }]}>
                      <Text style={styles.statusText}>{assignment.status.toUpperCase()}</Text>
                    </View>
                  </View>

                  <View style={styles.subjectContainer}>
                    <LinearGradient colors={assignment.color} style={styles.subjectBadge}>
                      <Text style={styles.subjectText}>{assignment.subject}</Text>
                    </LinearGradient>
                  </View>
                </View>

                <Text style={styles.assignmentDescription}>{assignment.description}</Text>

                <View style={styles.assignmentDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Due Date:</Text>
                    <Text style={styles.detailValue}>{assignment.dueDate}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Marks:</Text>
                    <Text style={styles.detailValue}>{assignment.marks} pts</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Type:</Text>
                    <Text style={styles.detailValue}>{assignment.submissionType}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Teacher:</Text>
                    <Text style={styles.detailValue}>{assignment.teacher}</Text>
                  </View>
                </View>

                <View style={styles.assignmentActions}>
                  {assignment.status === "pending" && (
                    <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigation("SubmitAssignment")}>
                      <LinearGradient colors={["#38a169", "#2f855a"]} style={styles.actionGradient}>
                        <Text style={styles.actionText}>Submit</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.viewButton} onPress={() => handleNavigation("ViewDetails")}>
                    <Text style={styles.viewText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
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
              <Text style={[styles.navIcon, styles.navIconActive]}>📝</Text>
            </LinearGradient>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Assignments</Text>
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
    backgroundColor: "rgba(229, 62, 62, 0.03)",
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
  filterSection: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    paddingRight: 20,
  },
  filterTab: {
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  activeFilterTab: {
    elevation: 4,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  activeFilterGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  activeFilterText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    marginRight: 8,
  },
  filterBadge: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  filterBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  inactiveFilter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  inactiveFilterText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  inactiveFilterBadge: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  inactiveFilterBadgeText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },
  assignmentsSection: {
    paddingHorizontal: 20,
  },
  assignmentCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  assignmentGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  assignmentHeader: {
    marginBottom: 12,
  },
  assignmentTitleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  priorityContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  priorityIcon: {
    fontSize: 12,
    marginRight: 8,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    flex: 1,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
  subjectContainer: {
    alignSelf: "flex-start",
  },
  subjectBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  subjectText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  assignmentDescription: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 16,
    lineHeight: 20,
  },
  assignmentDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 13,
    color: "#1e293b",
    fontWeight: "700",
  },
  assignmentActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    borderRadius: 12,
    overflow: "hidden",
    flex: 1,
    marginRight: 12,
  },
  actionGradient: {
    paddingVertical: 12,
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  viewButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  viewText: {
    color: "#3182ce",
    fontSize: 14,
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
