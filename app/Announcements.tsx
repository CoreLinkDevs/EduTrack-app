"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, TextInput } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { useRouter } from "expo-router"


export default function AnnouncementsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Use expo-router for navigation if available
 
  const router = useRouter()
  // Replace handleNavigation with router.push/back as needed
  const handleNavigation = (screen: string) => {
    if (screen === "Back") {
      router.back()
    }
    // ...other navigation logic...
  }

  const announcements = [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      content:
        "We are pleased to invite all parents to our upcoming Parent-Teacher Conference scheduled for next week. This is an excellent opportunity to discuss your child's academic progress and development.",
      category: "academic",
      priority: "high",
      date: "2024-07-10",
      time: "2 hours ago",
      author: "School Administration",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      readStatus: false,
      attachments: ["conference_schedule.pdf"],
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      title: "Sports Day Preparation",
      content:
        "Get ready for our annual Sports Day! All students are encouraged to participate in various sporting activities. Registration forms are available at the school office.",
      category: "events",
      priority: "medium",
      date: "2024-07-09",
      time: "1 day ago",
      author: "Sports Department",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      readStatus: true,
      attachments: [],
      likes: 78,
      comments: 23,
    },
    {
      id: 3,
      title: "School Closure Notice",
      content:
        "Please note that the school will be closed on Friday, July 12th, due to a public holiday. Regular classes will resume on Monday, July 15th.",
      category: "general",
      priority: "high",
      date: "2024-07-08",
      time: "2 days ago",
      author: "Principal's Office",
      authorAvatar: "https://images.unsplash.com/photo-1559582927-62cddd4dae97?w=100&h=100&fit=crop&crop=face",
      readStatus: true,
      attachments: [],
      likes: 156,
      comments: 8,
    },
    {
      id: 4,
      title: "New Library Books Available",
      content:
        "We're excited to announce that our library has received a new collection of books covering various subjects. Students are encouraged to visit and explore these new additions.",
      category: "academic",
      priority: "low",
      date: "2024-07-07",
      time: "3 days ago",
      author: "Library Department",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      readStatus: true,
      attachments: ["book_list.pdf"],
      likes: 34,
      comments: 5,
    },
    {
      id: 5,
      title: "Health and Safety Guidelines",
      content:
        "As we continue to prioritize the health and safety of our students and staff, please review the updated health guidelines. All students must follow these protocols.",
      category: "health",
      priority: "high",
      date: "2024-07-06",
      time: "4 days ago",
      author: "Health Department",
      authorAvatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      readStatus: false,
      attachments: ["health_guidelines.pdf"],
      likes: 89,
      comments: 15,
    },
    {
      id: 6,
      title: "Science Fair Registration",
      content:
        "Registration is now open for our annual Science Fair! Students interested in showcasing their scientific projects should submit their applications by the end of this month.",
      category: "events",
      priority: "medium",
      date: "2024-07-05",
      time: "5 days ago",
      author: "Science Department",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      readStatus: true,
      attachments: ["registration_form.pdf"],
      likes: 67,
      comments: 18,
    },
  ]

  const categories = [
    { key: "all", label: "All", count: announcements.length, icon: "📢" },
    {
      key: "academic",
      label: "Academic",
      count: announcements.filter((a) => a.category === "academic").length,
      icon: "📚",
    },
    { key: "events", label: "Events", count: announcements.filter((a) => a.category === "events").length, icon: "🎉" },
    {
      key: "general",
      label: "General",
      count: announcements.filter((a) => a.category === "general").length,
      icon: "📋",
    },
    { key: "health", label: "Health", count: announcements.filter((a) => a.category === "health").length, icon: "🏥" },
  ]

  const filteredAnnouncements =
    selectedCategory === "all" ? announcements : announcements.filter((a) => a.category === selectedCategory)

  const searchedAnnouncements = filteredAnnouncements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getPriorityColor = (priority: string): [string, string] => {
    switch (priority) {
      case "high":
        return ["#e53e3e", "#c53030"]
      case "medium":
        return ["#d69e2e", "#b7791f"]
      case "low":
        return ["#38a169", "#2f855a"]
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

  const getCategoryColor = (category: string): [string, string] => {
    switch (category) {
      case "academic":
        return ["#3182ce", "#2c5282"]
      case "events":
        return ["#805ad5", "#6b46c1"]
      case "general":
        return ["#4a5568", "#2d3748"]
      case "health":
        return ["#e53e3e", "#c53030"]
      default:
        return ["#64748b", "#4a5568"]
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
        <View style={styles.header}>
          {/* Replace 3 bars with back icon */}
          <TouchableOpacity onPress={() => handleNavigation("Back")}>
            <Text style={{ fontSize: 28, color: "#4a5568", fontWeight: "bold" }}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton} onPress={() => handleNavigation("Notifications")}>
              <LinearGradient colors={["#e53e3e", "#c53030"]} style={styles.notificationGradient}>
                <View style={styles.bellShape}>
                  <View style={styles.bellTop} />
                  <View style={styles.bellBody} />
                </View>
                <View style={styles.notificationDot} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={() => handleNavigation("Profile")}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.profileRing}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
                  }}
                  style={styles.profileImage}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Page Title */}
        <View style={styles.titleSection}>
          <View style={styles.titleCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.titleGradient}>
              <Text style={styles.pageTitle}>Announcements</Text>
              <Text style={styles.pageSubtitle}>Stay updated with school news</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.searchGradient}>
              <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search announcements..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#94a3b8"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery("")}>
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Category Filters */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[styles.filterTab, selectedCategory === category.key && styles.activeFilterTab]}
                  onPress={() => setSelectedCategory(category.key)}
                >
                  {selectedCategory === category.key ? (
                    <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.activeFilterGradient}>
                      <Text style={styles.filterIcon}>{category.icon}</Text>
                      <Text style={styles.activeFilterText}>{category.label}</Text>
                      <View style={styles.filterBadge}>
                        <Text style={styles.filterBadgeText}>{category.count}</Text>
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={styles.inactiveFilter}>
                      <Text style={styles.filterIcon}>{category.icon}</Text>
                      <Text style={styles.inactiveFilterText}>{category.label}</Text>
                      <View style={styles.inactiveFilterBadge}>
                        <Text style={styles.inactiveFilterBadgeText}>{category.count}</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Announcements List */}
        <View style={styles.announcementsSection}>
          {searchedAnnouncements.map((announcement) => (
            <TouchableOpacity
              key={announcement.id}
              style={styles.announcementCard}
              onPress={() => handleNavigation(`Announcement_${announcement.id}`)}
            >
              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
                style={styles.announcementGradient}
              >
                {/* Unread Indicator */}
                {!announcement.readStatus && <View style={styles.unreadIndicator} />}

                {/* Header */}
                <View style={styles.announcementHeader}>
                  <View style={styles.authorSection}>
                    <Image source={{ uri: announcement.authorAvatar }} style={styles.authorAvatar} />
                    <View style={styles.authorInfo}>
                      <Text style={styles.authorName}>{announcement.author}</Text>
                      <Text style={styles.announcementTime}>{announcement.time}</Text>
                    </View>
                  </View>

                  <View style={styles.badgesSection}>
                    <View style={styles.priorityBadge}>
                      <LinearGradient colors={getPriorityColor(announcement.priority)} style={styles.priorityGradient}>
                        <Text style={styles.priorityIcon}>{getPriorityIcon(announcement.priority)}</Text>
                      </LinearGradient>
                    </View>
                    <View style={styles.categoryBadge}>
                      <LinearGradient colors={getCategoryColor(announcement.category)} style={styles.categoryGradient}>
                        <Text style={styles.categoryText}>{announcement.category.toUpperCase()}</Text>
                      </LinearGradient>
                    </View>
                  </View>
                </View>

                {/* Content */}
                <View style={styles.announcementContent}>
                  <Text style={styles.announcementTitle}>{announcement.title}</Text>
                  <Text style={styles.announcementText} numberOfLines={3}>
                    {announcement.content}
                  </Text>
                </View>

                {/* Attachments */}
                {announcement.attachments.length > 0 && (
                  <View style={styles.attachmentsSection}>
                    <Text style={styles.attachmentsTitle}>📎 Attachments:</Text>
                    {announcement.attachments.map((attachment, index) => (
                      <TouchableOpacity key={index} style={styles.attachmentItem}>
                        <Text style={styles.attachmentText}>{attachment}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Footer */}
                <View style={styles.announcementFooter}>
                  <View style={styles.engagementSection}>
                    <TouchableOpacity style={styles.engagementButton}>
                      <Text style={styles.engagementIcon}>👍</Text>
                      <Text style={styles.engagementText}>{announcement.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.engagementButton}>
                      <Text style={styles.engagementIcon}>💬</Text>
                      <Text style={styles.engagementText}>{announcement.comments}</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={styles.readMoreButton}>
                    <Text style={styles.readMoreText}>Read More</Text>
                    <Text style={styles.readMoreArrow}>→</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {searchedAnnouncements.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyCard}>
              <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.emptyGradient}>
                <Text style={styles.emptyIcon}>📢</Text>
                <Text style={styles.emptyTitle}>No announcements found</Text>
                <Text style={styles.emptySubtitle}>
                  {searchQuery ? "Try adjusting your search terms" : "Check back later for new updates"}
                </Text>
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={() => handleNavigation("CreateAnnouncement")}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.quickActionGradient}>
                <Text style={styles.quickActionIcon}>✏️</Text>
                <Text style={styles.quickActionText}>Create Post</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={() => handleNavigation("SavedAnnouncements")}>
              <LinearGradient colors={["#38a169", "#2f855a"]} style={styles.quickActionGradient}>
                <Text style={styles.quickActionIcon}>🔖</Text>
                <Text style={styles.quickActionText}>Saved</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  searchGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
    opacity: 0.7,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    fontSize: 14,
    color: "#94a3b8",
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
  announcementsSection: {
    paddingHorizontal: 20,
  },
  announcementCard: {
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
  announcementGradient: {
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
  announcementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 2,
  },
  announcementTime: {
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
    borderRadius: 12,
    overflow: "hidden",
  },
  priorityGradient: {
    padding: 6,
  },
  priorityIcon: {
    fontSize: 12,
  },
  categoryBadge: {
    borderRadius: 12,
    overflow: "hidden",
  },
  categoryGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
  announcementContent: {
    marginBottom: 16,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 8,
    lineHeight: 24,
  },
  announcementText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    lineHeight: 20,
  },
  attachmentsSection: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: 12,
  },
  attachmentsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
  },
  attachmentItem: {
    paddingVertical: 4,
  },
  attachmentText: {
    fontSize: 13,
    color: "#3182ce",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  announcementFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  engagementSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  engagementButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    padding: 4,
  },
  engagementIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  engagementText: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  readMoreText: {
    fontSize: 14,
    color: "#3182ce",
    fontWeight: "700",
    marginRight: 4,
  },
  readMoreArrow: {
    fontSize: 14,
    color: "#3182ce",
    fontWeight: "bold",
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
})
