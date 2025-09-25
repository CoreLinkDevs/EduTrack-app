"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, TextInput } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { useRouter } from "expo-router"

export default function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const router = useRouter()

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case "Back":
        router.back()
        break
      case "NewMessage":
        router.push("/NewMessage")
        break
      case "Home":
        router.push("/Dashboard")
        break
      case "Settings":
        router.push("/Settings")
        break
      case "Chats":
        router.push("/Chat")
        break
      default:
        break
    }
  }

  const chats = [
    {
      id: 1,
      name: "Mrs. Abena Mensah",
      role: "Mathematics Teacher",
      lastMessage: "Great job on the algebra assignment! Keep up the excellent work.",
      time: "2 min ago",
      unreadCount: 2,
      avatar: "https://images.unsplash.com/photo-1559582927-62cddd4dae97?w=100&h=100&fit=crop&crop=face",
      online: true,
      type: "teacher",
    },
    {
      id: 2,
      name: "Class 5 Group",
      role: "Class Discussion",
      lastMessage: "Don't forget about tomorrow's science project presentation!",
      time: "15 min ago",
      unreadCount: 5,
      avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=face",
      online: false,
      type: "group",
    },
    {
      id: 3,
      name: "Dr. Sarah Osei",
      role: "Science Teacher",
      lastMessage: "The lab results look fantastic! Well done on your experiment.",
      time: "1 hour ago",
      unreadCount: 0,
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      online: true,
      type: "teacher",
    },
    {
      id: 4,
      name: "School Administration",
      role: "Official Updates",
      lastMessage: "Reminder: Parent-teacher conference scheduled for next week.",
      time: "3 hours ago",
      unreadCount: 1,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      online: false,
      type: "admin",
    },
    {
      id: 5,
      name: "Mr. John Asante",
      role: "English Teacher",
      lastMessage: "Your essay shows great improvement in writing skills!",
      time: "5 hours ago",
      unreadCount: 0,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      online: false,
      type: "teacher",
    },
    {
      id: 6,
      name: "Parents Group",
      role: "Parent Community",
      lastMessage: "Anyone interested in organizing a school trip?",
      time: "1 day ago",
      unreadCount: 3,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      online: true,
      type: "group",
    },
  ]

  const tabs = [
    { key: "all", label: "All", count: chats.length },
    { key: "teacher", label: "Teachers", count: chats.filter((c) => c.type === "teacher").length },
    { key: "group", label: "Groups", count: chats.filter((c) => c.type === "group").length },
    { key: "admin", label: "Admin", count: chats.filter((c) => c.type === "admin").length },
  ]

  const filteredChats = selectedTab === "all" ? chats : chats.filter((c) => c.type === selectedTab)

  const searchedChats = filteredChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "teacher":
        return "👨‍🏫"
      case "group":
        return "👥"
      case "admin":
        return "🏛️"
      default:
        return "💬"
    }
  }

  const getTypeColor = (type: string): [string, string] => {
    switch (type) {
      case "teacher":
        return ["#3182ce", "#2c5282"]
      case "group":
        return ["#38a169", "#2f855a"]
      case "admin":
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
          {/* Back Button */}
          <TouchableOpacity onPress={() => handleNavigation("Back")}>
            <Text style={{ fontSize: 28, color: "#4a5568", fontWeight: "bold" }}>←</Text>
          </TouchableOpacity>
          {/* New Chat Icon */}
          <TouchableOpacity style={{ marginLeft: "auto" }} onPress={() => handleNavigation("NewMessage")}>
            <LinearGradient colors={["#3182ce", "#2c5282"]} style={{ padding: 10, borderRadius: 20 }}>
              <Text style={{ fontSize: 22, color: "#fff" }}>✏️</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <View style={styles.titleSection}>
          <View style={styles.titleCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.titleGradient}>
              <Text style={styles.pageTitle}>Messages</Text>
              <Text style={styles.pageSubtitle}>Stay connected with teachers & classmates</Text>
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
                  placeholder="Search messages..."
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

        {/* Filter Tabs */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterContainer}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  style={[styles.filterTab, selectedTab === tab.key && styles.activeFilterTab]}
                  onPress={() => setSelectedTab(tab.key)}
                >
                  {selectedTab === tab.key ? (
                    <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.activeFilterGradient}>
                      <Text style={styles.activeFilterText}>{tab.label}</Text>
                      <View style={styles.filterBadge}>
                        <Text style={styles.filterBadgeText}>{tab.count}</Text>
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={styles.inactiveFilter}>
                      <Text style={styles.inactiveFilterText}>{tab.label}</Text>
                      <View style={styles.inactiveFilterBadge}>
                        <Text style={styles.inactiveFilterBadgeText}>{tab.count}</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Chat List */}
        <View style={styles.chatListSection}>
          {searchedChats.map((chat) => (
            <TouchableOpacity key={chat.id} style={styles.chatCard} onPress={() => handleNavigation(`Chat_${chat.id}`)}>
              <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.chatGradient}>
                <View style={styles.chatContent}>
                  <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                      <Image source={{ uri: chat.avatar }} style={styles.chatAvatar} />
                      {chat.online && <View style={styles.onlineIndicator} />}
                    </View>
                    <View style={styles.typeIndicator}>
                      <LinearGradient colors={getTypeColor(chat.type)} style={styles.typeGradient}>
                        <Text style={styles.typeIcon}>{getTypeIcon(chat.type)}</Text>
                      </LinearGradient>
                    </View>
                  </View>

                  <View style={styles.chatInfo}>
                    <View style={styles.chatHeader}>
                      <Text style={styles.chatName}>{chat.name}</Text>
                      <Text style={styles.chatTime}>{chat.time}</Text>
                    </View>
                    <Text style={styles.chatRole}>{chat.role}</Text>
                    <Text style={styles.lastMessage} numberOfLines={2}>
                      {chat.lastMessage}
                    </Text>
                  </View>

                  <View style={styles.chatActions}>
                    {chat.unreadCount > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                      </View>
                    )}
                    <TouchableOpacity style={styles.moreButton} onPress={() => handleNavigation("ChatOptions")}>
                      <Text style={styles.moreIcon}>⋯</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {searchedChats.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyCard}>
              <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.emptyGradient}>
                <Text style={styles.emptyIcon}>💬</Text>
                <Text style={styles.emptyTitle}>No messages found</Text>
                <Text style={styles.emptySubtitle}>
                  {searchQuery ? "Try adjusting your search" : "Start a conversation with your teachers"}
                </Text>
                <TouchableOpacity style={styles.emptyButton} onPress={() => handleNavigation("NewMessage")}>
                  <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.emptyButtonGradient}>
                    <Text style={styles.emptyButtonText}>Start Chatting</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        )}
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
    backgroundColor: "rgba(49, 130, 206, 0.03)",
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
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
  chatListSection: {
    paddingHorizontal: 20,
  },
  chatCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chatGradient: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  chatContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  avatarSection: {
    position: "relative",
    marginRight: 16,
  },
  avatarContainer: {
    position: "relative",
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "white",
  },
  typeIndicator: {
    position: "absolute",
    top: -4,
    right: -4,
    borderRadius: 10,
    overflow: "hidden",
  },
  typeGradient: {
    padding: 4,
  },
  typeIcon: {
    fontSize: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    flex: 1,
  },
  chatTime: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  chatRole: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    lineHeight: 18,
  },
  chatActions: {
    alignItems: "center",
    marginLeft: 12,
  },
  unreadBadge: {
    backgroundColor: "#e53e3e",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
    minWidth: 24,
    alignItems: "center",
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  moreButton: {
    padding: 4,
  },
  moreIcon: {
    fontSize: 16,
    color: "#94a3b8",
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
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  emptyButtonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
})
