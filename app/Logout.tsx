import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { useRouter } from "expo-router"

export default function LogoutScreen() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      router.replace("/login")
    }, 1500)
  }

  const handleCancel = () => {
    router.back()
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
          {isLoggingOut ? (
            <>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.text}>Logging you out...</Text>
            </>
          ) : (
            <>
              <Text style={styles.text}>Are you sure you want to logout?</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                  <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 16,
  },
  cancelText: {
    color: "#2d3748",
    fontWeight: "700",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#e53e3e",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
})