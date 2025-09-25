"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { useRouter } from "expo-router" // Add this import

export default function NotificationsScreen() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Assignment Due Tomorrow",
      message: "Mathematics homework on Algebra is due tomorrow at 9:00 AM. Don't forget to submit!",
      type: "assignment",
      priority: "high",
      timestamp: "2 minutes ago",
      date: "2024-07-02",
      isRead: false,
      actionRequired: true,
      relatedTo: "Mathematics",
      sender: "Mrs. Abena Mensah",
      senderAvatar: "https://images.unsplash.com/photo-1559582927-62cddd4dae97?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      title: "New Announcement Posted",
      message: "Parent-Teacher Conference has been scheduled for next week. Check announcements for details.",
      type: "announcement",
      priority: "medium",
      timestamp: "15 minutes ago",
      date: "2024-07-02",
      isRead: false,
      actionRequired: false,
      relatedTo: "School Administration",
      sender: "Principal's Office",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      title: "Fee Payment Reminder",
      message: "Your school fees for Term 2 are due in 3 days. Please make payment to avoid late charges.",
      type: "payment",
      priority: "high",
      timestamp: "1 hour ago",
      date: "2024-07-02",
      isRead: true,
      actionRequired: true,
      relatedTo: "Finance Department",
      sender: "Accounts Office",
      senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 4,
      title: "New Message from Teacher",
      message: "Great job on your science project! I've left some feedback in the chat.",
      type: "message",
      priority: "low",
      timestamp: "2 hours ago",
      date: "2024-07-02",
      isRead: true,
      actionRequired: false,
      relatedTo: "Science",
      sender: "Dr. Sarah Osei",
      senderAvatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 5,
      title: "Exam Results Published",
      message: "Your Term 2 examination results are now available. Check your results page for details.",
      type: "results",
      priority: "medium",
      timestamp: "1 day ago",
      date: "2024-07-01",
      isRead: true,
      actionRequired: false,
      relatedTo: "Academic Office",
      sender: "Examination Board",
      senderAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 6,
      title: "Sports Day Registration",
      message: "Registration for annual Sports Day is now open. Sign up before the deadline!",
      type: "event",
      priority: "low",
      timestamp: "2 days ago",
      date: "2024-06-30",
      isRead: true,
      actionRequired: true,
      relatedTo: "Sports Department",
      sender: "Coach Michael",
      senderAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face",
    },
  ])
  const router = useRouter() // Add this line

  const filters = [
    { key: "all", label: "All", count: notifications.length, icon: "🔔" },
    { key: "unread", label: "Unread", count: notifications.filter((n) => !n.isRead).length, icon: "🔴" },
    {
      key: "assignment",
      label: "Assignments",
      count: notifications.filter((n) => n.type === "assignment").length,
      icon: "📝",
    },
    {
      key: "announcement",
      label: "News",
      count: notifications.filter((n) => n.type === "announcement").length,
      icon: "📢",
    },
    { key: "payment", label: "Payments", count: notifications.filter((n) => n.type === "payment").length, icon: "💰" },
    { key: "message", label: "Messages", count: notifications.filter((n) => n.type === "message").length, icon: "💬" },
  ]

  const getFilteredNotifications = () => {
    if (selectedFilter === "all") return notifications
    if (selectedFilter === "unread") return notifications.filter((n) => !n.isRead)
    return notifications.filter((n) => n.type === selectedFilter)
  }

  const getTypeColor = (type: string): [string, string] => {
    switch (type) {
      case "assignment":
        return ["#e53e3e", "#c53030"]
      case "announcement":
        return ["#3182ce", "#2c5282"]
      case "payment":
        return ["#d69e2e", "#b7791f"]
      case "message":
        return ["#38a169", "#2f855a"]
      case "results":
        return ["#805ad5", "#6b46c1"]
      case "event":
        return ["#48bb78", "#38a169"]
      default:
        return ["#64748b", "#4a5568"]
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return "📝"
      case "announcement":
        return "📢"
      case "payment":
        return "💰"
      case "message":
        return "💬"
      case "results":
        return "📊"
      case "event":
        return "🎉"
      default:
        return "🔔"
    }
  }

  const markAsRead = (notificationId: number) => {
    console.log(`Mark notification ${notificationId} as read`)
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    )
  }

  // Navigation handler for main routes
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
      case "Notifications":
        router.push("/Notifications")
        break
      default:
        // Add more navigation as needed
        break
    }
  }

  const deleteNotification = (notificationId: number) => {
    console.log(`Delete notification ${notificationId}`)
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

          <Text style={styles.headerTitle}>Notifications</Text>

          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <LinearGradient colors={["#38a169", "#2f855a"]} style={styles.markAllGradient}>
              <Text style={styles.markAllText}>Mark All</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Summary Stats */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <LinearGradient
              colors={["#4a5568", "#2d3748", "#553c9a"]}
              style={styles.summaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.summaryContent}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryNumber}>{notifications.length}</Text>
                  <Text style={styles.summaryLabel}>Total</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryNumber}>{notifications.filter((n) => !n.isRead).length}</Text>
                  <Text style={styles.summaryLabel}>Unread</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryNumber}>{notifications.filter((n) => n.actionRequired).length}</Text>
                  <Text style={styles.summaryLabel}>Action Required</Text>
                </View>
              </View>

              {/* Decorative Elements */}
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
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
                      <Text style={styles.filterIcon}>{filter.icon}</Text>
                      <Text style={styles.activeFilterText}>{filter.label}</Text>
                      <View style={styles.filterBadge}>
                        <Text style={styles.filterBadgeText}>{filter.count}</Text>
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={styles.inactiveFilter}>
                      <Text style={styles.filterIcon}>{filter.icon}</Text>
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

        {/* Notifications List */}
        <View style={styles.notificationsSection}>
          {getFilteredNotifications().map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={styles.notificationCard}
              onPress={() => handleNavigation(`Notification_${notification.id}`)}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
                style={styles.notificationGradient}
              >
                {/* Unread Indicator */}
                {!notification.isRead && <View style={styles.unreadIndicator} />}

                {/* Header */}
                <View style={styles.notificationHeader}>
                  <View style={styles.senderSection}>
                    <Image source={{ uri: notification.senderAvatar }} style={styles.senderAvatar} />
                    <View style={styles.senderInfo}>
                      <Text style={styles.senderName}>{notification.sender}</Text>
                      <Text style={styles.notificationTime}>{notification.timestamp}</Text>
                    </View>
                  </View>

                  <View style={styles.badgesSection}>
                    <View style={styles.priorityBadge}>
                      <Text style={styles.priorityIcon}>{getPriorityIcon(notification.priority)}</Text>
                    </View>
                    <View style={styles.typeBadge}>
                      <LinearGradient colors={getTypeColor(notification.type)} style={styles.typeGradient}>
                        <Text style={styles.typeIcon}>{getTypeIcon(notification.type)}</Text>
                      </LinearGradient>
                    </View>
                  </View>
                </View>

                {/* Content */}
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage} numberOfLines={2}>
                    {notification.message}
                  </Text>
                  <Text style={styles.relatedTo}>Related to: {notification.relatedTo}</Text>
                </View>

                {/* Action Required Badge */}
                {notification.actionRequired && (
                  <View style={styles.actionRequiredSection}>
                    <LinearGradient colors={["#e53e3e", "#c53030"]} style={styles.actionRequiredBadge}>
                      <Text style={styles.actionRequiredIcon}>⚠️</Text>
                      <Text style={styles.actionRequiredText}>Action Required</Text>
                    </LinearGradient>
                  </View>
                )}

                {/* Footer */}
                <View style={styles.notificationFooter}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => markAsRead(notification.id)}>
                    <Text style={styles.actionButtonText}>{notification.isRead ? "Mark Unread" : "Mark Read"}</Text>
                  </TouchableOpacity>

                  <View style={styles.footerActions}>
                    <TouchableOpacity style={styles.footerAction} onPress={() => handleNavigation("ViewDetails")}>
                      <Text style={styles.footerActionText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerAction} onPress={() => deleteNotification(notification.id)}>
                      <Text style={styles.footerActionText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {getFilteredNotifications().length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyCard}>
              <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.emptyGradient}>
                <Text style={styles.emptyIcon}>🔔</Text>
                <Text style={styles.emptyTitle}>No notifications found</Text>
                <Text style={styles.emptySubtitle}>
                  {selectedFilter === "unread"
                    ? "All caught up! No unread notifications."
                    : "Check back later for new updates."}
                </Text>
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={() => handleNavigation("NotificationSettings")}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.quickActionGradient}>
                <Text style={styles.quickActionIcon}>⚙️</Text>
                <Text style={styles.quickActionText}>Settings</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={() => handleNavigation("ClearAll")}>
              <LinearGradient colors={["#e53e3e", "#c53030"]} style={styles.quickActionGradient}>
                <Text style={styles.quickActionIcon}>🗑️</Text>
                <Text style={styles.quickActionText}>Clear All</Text>
              </LinearGradient>
            </TouchableOpacity>
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
            onPress={() => handleNavigation("Notifications")}
          >
            <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.activeNavBg}>
              <Text style={[styles.navIcon, styles.navIconActive]}>🔔</Text>
            </LinearGradient>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Notifications</Text>
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
  markAllButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  markAllGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  markAllText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryCard: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  summaryGradient: {
    padding: 24,
    position: "relative",
  },
  summaryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: "900",
    color: "white",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 16,
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
  filterIcon: {
    fontSize: 14,
    marginRight: 6,
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
  notificationsSection: {
    paddingHorizontal: 20,
  },
  notificationCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: "relative",
  },
  notificationGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  unreadIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 4,
    height: "100%",
    backgroundColor: "#e53e3e",
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  senderSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  senderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  senderInfo: {
    flex: 1,
  },
  senderName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  badgesSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityBadge: {
    marginRight: 8,
  },
  priorityIcon: {
    fontSize: 12,
  },
  typeBadge: {
    borderRadius: 12,
    overflow: "hidden",
  },
  typeGradient: {
    padding: 6,
  },
  typeIcon: {
    fontSize: 12,
  },
  notificationContent: {
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 8,
    lineHeight: 22,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 8,
  },
  relatedTo: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "600",
    fontStyle: "italic",
  },
  actionRequiredSection: {
    marginBottom: 16,
  },
  actionRequiredBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionRequiredIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  actionRequiredText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "rgba(74, 85, 104, 0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#4a5568",
    fontWeight: "700",
  },
  footerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerAction: {
    marginLeft: 16,
  },
  footerActionText: {
    fontSize: 12,
    color: "#3182ce",
    fontWeight: "700",
  },
  emptyState: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  emptyCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  emptyGradient: {
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  quickActionGradient: {
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  quickActionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  quickActionText: {
    color: "white",
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
