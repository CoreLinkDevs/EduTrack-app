"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"

export default function HelpScreen() {
  const router = useRouter()

  const helpSections = [
    {
      title: "Getting Started",
      items: [
        {
          question: "How do I set up my account?",
          answer: "Follow the registration process with your child's student ID and your contact information.",
        },
        {
          question: "How do I add my child's profile?",
          answer: "Navigate to the Child Profile section and enter the required academic information.",
        },
        {
          question: "What information do I need to register?",
          answer: "You'll need your child's student ID, your contact details, and emergency contact information.",
        },
      ],
    },
    {
      title: "Student Information",
      items: [
        {
          question: "How do I view my child's attendance?",
          answer: "Go to the Activities section and tap on Attendance to see detailed records.",
        },
        {
          question: "Where can I check assignments?",
          answer: "Access the Assignments section from the main dashboard to view pending and completed tasks.",
        },
        {
          question: "How do I view academic results?",
          answer: "Tap on Results from the dashboard to see grades and academic performance.",
        },
      ],
    },
    {
      title: "Fees & Payments",
      items: [
        {
          question: "How do I check fee status?",
          answer: "Use the Fees Status button on the dashboard to view payment history and outstanding amounts.",
        },
        {
          question: "What payment methods are accepted?",
          answer: "We accept bank transfers, credit cards, and online payment platforms.",
        },
        {
          question: "When are fees due?",
          answer: "Fee schedules are available in the Fees section with detailed due dates.",
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          question: "How do I chat with teachers?",
          answer: "Use the Chat feature to communicate directly with your child's teachers and school staff.",
        },
        {
          question: "How do I receive announcements?",
          answer: "Important school announcements appear in the Announcements section and via notifications.",
        },
        {
          question: "Can I schedule parent-teacher meetings?",
          answer: "Contact the school through the Chat feature to schedule meetings with teachers.",
        },
      ],
    },
  ]

  const contactInfo = [
    { type: "Phone", value: "+1 (555) 123-4567", icon: "📞" },
    { type: "Email", value: "support@school.edu", icon: "📧" },
    { type: "Address", value: "123 Education Street, Learning City", icon: "📍" },
    { type: "Hours", value: "Mon-Fri: 8:00 AM - 5:00 PM", icon: "🕐" },
  ]

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
      </View>

      {/* Simple Header with Back Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <LinearGradient colors={["#4a5568", "#2d3748"]} style={styles.backGradient}>
            <View style={styles.backArrow}>
              <View style={styles.arrowLine1} />
              <View style={styles.arrowLine2} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.welcomeGradient}>
            <Text style={styles.welcomeTitle}>How can we help you?</Text>
            <Text style={styles.welcomeSubtitle}>Find answers to common questions or contact our support team</Text>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.quickActionGradient}>
                <Text style={styles.quickActionIcon}>📚</Text>
                <Text style={styles.quickActionTitle}>User Guide</Text>
                <Text style={styles.quickActionSubtitle}>Step-by-step tutorials</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient colors={["#38a169", "#2f855a"]} style={styles.quickActionGradient}>
                <Text style={styles.quickActionIcon}>💬</Text>
                <Text style={styles.quickActionTitle}>Live Chat</Text>
                <Text style={styles.quickActionSubtitle}>Chat with support</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient colors={["#d69e2e", "#b7791f"]} style={styles.quickActionGradient}>
                <Text style={styles.quickActionIcon}>📞</Text>
                <Text style={styles.quickActionTitle}>Call Support</Text>
                <Text style={styles.quickActionSubtitle}>Speak to an agent</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard}>
              <LinearGradient colors={["#805ad5", "#6b46c1"]} style={styles.quickActionGradient}>
                <Text style={styles.quickActionIcon}>❓</Text>
                <Text style={styles.quickActionTitle}>FAQ</Text>
                <Text style={styles.quickActionSubtitle}>Common questions</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Help Sections */}
        {helpSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.helpSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.helpItem}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
                  style={styles.helpItemGradient}
                >
                  <Text style={styles.helpQuestion}>{item.question}</Text>
                  <Text style={styles.helpAnswer}>{item.answer}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        ))}

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <LinearGradient
              colors={["#4a5568", "#2d3748", "#553c9a"]}
              style={styles.contactGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.contactTitle}>Get in Touch</Text>
              <Text style={styles.contactSubtitle}>Our support team is here to help you</Text>

              {contactInfo.map((contact, index) => (
                <View key={index} style={styles.contactItem}>
                  <Text style={styles.contactIcon}>{contact.icon}</Text>
                  <View style={styles.contactDetails}>
                    <Text style={styles.contactType}>{contact.type}</Text>
                    <Text style={styles.contactValue}>{contact.value}</Text>
                  </View>
                </View>
              ))}
            </LinearGradient>
          </View>
        </View>

        {/* Additional Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Additional Resources</Text>

          <TouchableOpacity style={styles.resourceItem}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.resourceGradient}>
              <View style={styles.resourceContent}>
                <Text style={styles.resourceIcon}>📖</Text>
                <View style={styles.resourceText}>
                  <Text style={styles.resourceTitle}>Parent Handbook</Text>
                  <Text style={styles.resourceSubtitle}>Complete guide for parents</Text>
                </View>
                <View style={styles.resourceArrow}>
                  <View style={styles.arrowRight} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.resourceGradient}>
              <View style={styles.resourceContent}>
                <Text style={styles.resourceIcon}>🎥</Text>
                <View style={styles.resourceText}>
                  <Text style={styles.resourceTitle}>Video Tutorials</Text>
                  <Text style={styles.resourceSubtitle}>Watch how-to videos</Text>
                </View>
                <View style={styles.resourceArrow}>
                  <View style={styles.arrowRight} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.resourceGradient}>
              <View style={styles.resourceContent}>
                <Text style={styles.resourceIcon}>🔧</Text>
                <View style={styles.resourceText}>
                  <Text style={styles.resourceTitle}>Technical Support</Text>
                  <Text style={styles.resourceSubtitle}>Troubleshooting guides</Text>
                </View>
                <View style={styles.resourceArrow}>
                  <View style={styles.arrowRight} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Feedback Section */}
        <View style={styles.feedbackSection}>
          <TouchableOpacity style={styles.feedbackButton}>
            <LinearGradient
              colors={["#e53e3e", "#c53030"]}
              style={styles.feedbackGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.feedbackText}>Send Feedback</Text>
              <Text style={styles.feedbackSubtext}>Help us improve the app</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    transform: [{ rotate: "45deg" }, { translateX: -3 }],
  },
  arrowLine2: {
    position: "absolute",
    width: 12,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
    transform: [{ rotate: "-45deg" }, { translateX: -3 }],
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },
  headerSpacer: {
    width: 44, // Same width as back button for centering
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  welcomeGradient: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
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
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionCard: {
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
  quickActionGradient: {
    padding: 20,
    alignItems: "center",
    minHeight: 110,
    justifyContent: "center",
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
    textAlign: "center",
  },
  quickActionSubtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
    textAlign: "center",
  },
  helpSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  helpItem: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  helpItemGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  helpQuestion: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
  },
  helpAnswer: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  contactSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  contactCard: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  contactGradient: {
    padding: 24,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    marginBottom: 6,
  },
  contactSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  contactIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: "center",
  },
  contactDetails: {
    flex: 1,
  },
  contactType: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  resourcesSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  resourceItem: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  resourceGradient: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  resourceContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  resourceIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: "center",
  },
  resourceText: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  resourceSubtitle: {
    fontSize: 13,
    color: "#64748b",
  },
  resourceArrow: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowRight: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#94a3b8",
    transform: [{ rotate: "45deg" }],
  },
  feedbackSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  feedbackButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#e53e3e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  feedbackGradient: {
    padding: 20,
    alignItems: "center",
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  feedbackSubtext: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
})
