import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, Alert, TextInput } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { useRouter } from "expo-router"

export default function PaymentScreen() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  const handlePay = () => {
    if (!accountNumber || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid account number and amount.")
      return
    }
    setError("")
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      Alert.alert("Payment Successful", `You have paid GH₵ ${amount} from account ${accountNumber}.`, [
        { text: "OK", onPress: () => router.replace("/FeeStatus") },
      ])
    }, 2000)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <LinearGradient
        colors={["#4a5568", "#2d3748", "#553c9a"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Make Payment</Text>
          <Text style={styles.label}>Enter Payment Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Account Number"
            placeholderTextColor="#cbd5e1"
            value={accountNumber}
            onChangeText={setAccountNumber}
            editable={!isProcessing}
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            placeholder="Amount (GH₵)"
            placeholderTextColor="#cbd5e1"
            value={amount}
            onChangeText={setAmount}
            editable={!isProcessing}
            keyboardType="numeric"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.payButton}
            onPress={handlePay}
            disabled={isProcessing}
          >
            <LinearGradient colors={["#38a169", "#2f855a"]} style={styles.payButtonGradient}>
              <Text style={styles.payButtonText}>Pay</Text>
            </LinearGradient>
          </TouchableOpacity>

          {isProcessing && (
            <View style={styles.processingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.processingText}>Processing Payment...</Text>
            </View>
          )}

          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()} disabled={isProcessing}>
            <Text style={styles.cancelText}>Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "800",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 18,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#fff",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  error: {
    color: "#e53e3e",
    marginBottom: 10,
    fontWeight: "600",
  },
  payButton: {
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
  },
  payButtonGradient: {
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  processingOverlay: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  processingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
  },
  cancelText: {
    color: "#2d3748",
    fontWeight: "700",
    fontSize: 16,
  },
})