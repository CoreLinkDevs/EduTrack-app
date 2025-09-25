"use client"

import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, Modal } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { useRouter } from "expo-router"

export default function FeeStatusScreen() {
  const [selectedTerm, setSelectedTerm] = useState("current")
  const [showReceipt, setShowReceipt] = useState(false)
  const [showStatement, setShowStatement] = useState(false)
  const router = useRouter()

  const handleNavigation = (screen: string) => {
    if (screen === "Back") {
      router.back()
    }
    if (screen === "Payment") {
      router.push("/Payment")
    }
  }

  const feeStructure = {
    tuition: 2500,
    books: 300,
    uniform: 200,
    transport: 150,
    meals: 400,
    activities: 100,
    technology: 75,
    insurance: 50,
  }

  const totalFees = Object.values(feeStructure).reduce((sum, fee) => sum + fee, 0)

  const paymentHistory = [
    {
      id: 1,
      date: "2024-01-15",
      amount: 1500,
      type: "Partial Payment",
      method: "Bank Transfer",
      reference: "TXN001234567",
      status: "completed",
      description: "First Term - Partial Payment",
    },
    {
      id: 2,
      date: "2024-02-20",
      amount: 1275,
      type: "Balance Payment",
      method: "Mobile Money",
      reference: "MM987654321",
      status: "completed",
      description: "First Term - Balance Payment",
    },
    {
      id: 3,
      date: "2024-04-10",
      amount: 2000,
      type: "Partial Payment",
      method: "Cash",
      reference: "CASH001",
      status: "completed",
      description: "Second Term - Partial Payment",
    },
  ]

  const currentBalance = {
    totalDue: totalFees,
    totalPaid: paymentHistory.reduce((sum, payment) => sum + payment.amount, 0),
    outstanding: totalFees - paymentHistory.reduce((sum, payment) => sum + payment.amount, 0),
  }

  // Only Mobile Money and Bank Transfer are available
  const paymentMethods = [
    {
      id: 1,
      name: "Mobile Money",
      icon: "📱",
      color: ["#38a169", "#2f855a"] as [string, string],
      description: "MTN/Vodafone/AirtelTigo",
      disabled: false,
    },
    {
      id: 2,
      name: "Bank Transfer",
      icon: "🏦",
      color: ["#3182ce", "#2c5282"] as [string, string],
      description: "Direct bank transfer",
      disabled: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#38a169"
      case "pending":
        return "#d69e2e"
      case "failed":
        return "#e53e3e"
      default:
        return "#64748b"
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
          <TouchableOpacity onPress={() => handleNavigation("Back")}>
            <Text style={{ fontSize: 28, color: "#4a5568", fontWeight: "bold" }}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <View style={styles.titleSection}>
          <View style={styles.titleCard}>
            <LinearGradient colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]} style={styles.titleGradient}>
              <Text style={styles.pageTitle}>Fee Status</Text>
              <Text style={styles.pageSubtitle}>Academic Year 2024-2025</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Current Balance Card */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceCard}>
            <LinearGradient
              colors={["#4a5568", "#2d3748", "#553c9a"]}
              style={styles.balanceGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.balanceContent}>
                <View style={styles.balanceHeader}>
                  <Text style={styles.balanceTitle}>Overview</Text>
                  <Text style={styles.balancePeriod}>2024-2025 Academic Year</Text>
                </View>
                <View style={styles.balanceAmounts}>
                  <View style={styles.amountItem}>
                    <Text style={styles.amountLabel}>Total Due</Text>
                    <Text style={styles.amountValue}>GH₵ {currentBalance.totalDue.toLocaleString()}</Text>
                  </View>
                  <View style={styles.amountItem}>
                    <Text style={styles.amountLabel}>Total Paid</Text>
                    <Text style={[styles.amountValue, styles.paidAmount]}>GH₵ {currentBalance.totalPaid.toLocaleString()}</Text>
                  </View>
                  <View style={styles.amountItem}>
                    <Text style={styles.amountLabel}>Outstanding</Text>
                    <Text style={[styles.amountValue, styles.outstandingAmount]}>GH₵ {currentBalance.outstanding.toLocaleString()}</Text>
                  </View>
                </View>
                {/* Progress Bar */}
                <View style={styles.progressSection}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${Math.min(100, (currentBalance.totalPaid / currentBalance.totalDue) * 100)}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {Math.round((currentBalance.totalPaid / currentBalance.totalDue) * 100)}% Paid
                  </Text>
                </View>
              </View>
              {/* Decorative Circles */}
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
            </LinearGradient>
          </View>
        </View>

        {/* Fee Breakdown */}
        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Fee Breakdown</Text>
          <View style={styles.breakdownCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
              style={styles.breakdownGradient}
            >
              {Object.entries(feeStructure).map(([category, amount], index) => (
                <View key={category} style={styles.breakdownItem}>
                  <View style={styles.breakdownInfo}>
                    <Text style={styles.breakdownCategory}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                    <Text style={styles.breakdownAmount}>GH₵ {amount.toLocaleString()}</Text>
                  </View>
                  {index < Object.entries(feeStructure).length - 1 && <View style={styles.breakdownDivider} />}
                </View>
              ))}

              <View style={styles.totalSection}>
                <View style={styles.totalDivider} />
                <View style={styles.totalItem}>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalAmount}>GH₵ {totalFees.toLocaleString()}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodsSection}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.paymentGrid}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.paymentMethodCard}
                onPress={() => handleNavigation("Payment")}
              >
                <LinearGradient colors={method.color} style={styles.paymentMethodGradient}>
                  <Text style={styles.paymentIcon}>{method.icon}</Text>
                  <Text style={styles.paymentName}>{method.name}</Text>
                  <Text style={styles.paymentDescription}>{method.description}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment History */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Recent Payments</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {paymentHistory.slice(0, 3).map((payment) => (
            <View key={payment.id} style={styles.historyCard}>
              <LinearGradient
                colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
                style={styles.historyGradient}
              >
                <View style={styles.historyContent}>
                  <View style={styles.historyLeft}>
                    <View style={styles.historyIcon}>
                      <Text style={styles.historyIconText}>💰</Text>
                    </View>
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyDescription}>{payment.description}</Text>
                      <Text style={styles.historyDate}>{payment.date}</Text>
                      <Text style={styles.historyMethod}>
                        {payment.method} • {payment.reference}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.historyRight}>
                    <Text style={styles.historyAmount}>GH₵ {payment.amount.toLocaleString()}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.status) }]}>
                      <Text style={styles.statusText}>{payment.status.toUpperCase()}</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>

        {/* Receipt Download */}
        <View style={styles.receiptSection}>
          <Text style={styles.sectionTitle}>Download Receipts</Text>
          <View style={styles.receiptActions}>
            <TouchableOpacity style={styles.receiptButton} onPress={() => setShowReceipt(true)}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.receiptGradient}>
                <Text style={styles.receiptIcon}>📄</Text>
                <Text style={styles.receiptText}>Fee Receipt</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.receiptButton} onPress={() => setShowStatement(true)}>
              <LinearGradient colors={["#805ad5", "#6b46c1"]} style={styles.receiptGradient}>
                <Text style={styles.receiptIcon}>📊</Text>
                <Text style={styles.receiptText}>Fee Statement</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Fee Receipt Modal */}
      <Modal visible={showReceipt} transparent animationType="slide" onRequestClose={() => setShowReceipt(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fee Receipt</Text>
            <Text style={styles.modalLabel}>Student Name: Osei Koomson Ajei</Text>
            <Text style={styles.modalLabel}>Student ID: LFI2024001</Text>
            <Text style={styles.modalLabel}>Date: 2024-04-10</Text>
            <Text style={styles.modalLabel}>Amount Paid: GH₵ 2000</Text>
            <Text style={styles.modalLabel}>Payment Method: Cash</Text>
            <Text style={styles.modalLabel}>Reference: CASH001</Text>
            <TouchableOpacity style={styles.downloadButton} onPress={() => {}}>
              <LinearGradient colors={["#3182ce", "#2c5282"]} style={styles.downloadGradient}>
                <Text style={styles.downloadText}>Download Receipt</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowReceipt(false)}>
              <Text style={styles.closeModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fee Statement Modal */}
      <Modal visible={showStatement} transparent animationType="slide" onRequestClose={() => setShowStatement(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fee Statement</Text>
            <Text style={styles.modalLabel}>Student Name: Osei Koomson Ajei</Text>
            <Text style={styles.modalLabel}>Student ID: LFI2024001</Text>
            <Text style={styles.modalLabel}>Academic Year: 2024-2025</Text>
            <Text style={styles.modalLabel}>Total Paid: GH₵ {currentBalance.totalPaid.toLocaleString()}</Text>
            <Text style={styles.modalLabel}>Outstanding: GH₵ {currentBalance.outstanding.toLocaleString()}</Text>
            <TouchableOpacity style={styles.downloadButton} onPress={() => {}}>
              <LinearGradient colors={["#805ad5", "#6b46c1"]} style={styles.downloadGradient}>
                <Text style={styles.downloadText}>Download Statement</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowStatement(false)}>
              <Text style={styles.closeModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "rgba(56, 161, 105, 0.03)",
    top: 300,
    left: -30,
  },
  patternCircle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(128, 90, 213, 0.03)",
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
  balanceSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  balanceCard: {
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  balanceGradient: {
    padding: 28,
    position: "relative",
  },
  balanceContent: {
    zIndex: 2,
  },
  balanceHeader: {
    marginBottom: 20,
  },
  balanceTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  balancePeriod: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  balanceAmounts: {
    marginBottom: 20,
  },
  amountItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  amountValue: {
    fontSize: 18,
    color: "white",
    fontWeight: "800",
  },
  paidAmount: {
    color: "#68d391",
  },
  outstandingAmount: {
    color: "#feb2b2",
  },
  progressSection: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#68d391",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    textAlign: "center",
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
  breakdownSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  breakdownCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  breakdownGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  breakdownItem: {
    marginBottom: 4,
  },
  breakdownInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  breakdownCategory: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "600",
  },
  breakdownAmount: {
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "700",
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  totalSection: {
    marginTop: 8,
  },
  totalDivider: {
    height: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 12,
  },
  totalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    color: "#1e293b",
    fontWeight: "800",
  },
  totalAmount: {
    fontSize: 20,
    color: "#1e293b",
    fontWeight: "900",
  },
  paymentMethodsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  paymentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  paymentMethodCard: {
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
  paymentMethodGradient: {
    padding: 16,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
  },
  paymentIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
    textAlign: "center",
  },
  paymentDescription: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
    textAlign: "center",
  },
  quickPaySection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  quickPayButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#38a169",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  quickPayGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  quickPayIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  quickPayContent: {
    flex: 1,
  },
  quickPayTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  quickPayAmount: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  quickPayArrow: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  historySection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: "#3182ce",
    fontWeight: "700",
  },
  historyCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyGradient: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  historyContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  historyIcon: {
    backgroundColor: "rgba(56, 161, 105, 0.1)",
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  historyIconText: {
    fontSize: 16,
  },
  historyInfo: {
    flex: 1,
  },
  historyDescription: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 2,
  },
  historyMethod: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "500",
  },
  historyRight: {
    alignItems: "flex-end",
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 6,
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
  receiptSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  receiptActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  receiptButton: {
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
  receiptGradient: {
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  receiptIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  receiptText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 14,
    color: "#4a5568",
    marginBottom: 8,
  },
  downloadButton: {
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  downloadGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  closeModal: {
    marginTop: 16,
    fontSize: 14,
    color: "#3182ce",
    fontWeight: "700",
    textAlign: "center",
  },
})
