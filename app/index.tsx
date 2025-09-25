import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"

const { width, height } = Dimensions.get("window")

export default function WelcomeScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background with gradient */}
      <LinearGradient
        colors={["#667eea", "#764ba2", "#f093fb"]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Floating elements for visual interest */}
      <View style={[styles.floatingCircle, styles.circle1]} />
      <View style={[styles.floatingCircle, styles.circle2]} />
      <View style={[styles.floatingCircle, styles.circle3]} />

      {/* EduTrack App Name */}
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>EduTrack</Text>
      </View>

      <View style={styles.content}>
        {/* Hero Image Section */}
        <View style={styles.heroSection}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/illustrations/child.png")} // <-- Use your illustration here
              style={styles.heroImage}
            />
            <View style={styles.imageOverlay} />
          </View>

          {/* Decorative elements */}
          <View style={styles.decorativeRing} />
          <View style={styles.decorativeRing2} />
        </View>

        {/* Text Content */}
        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>Connect & Track</Text>
          <Text style={styles.subtitle}>Your Child's Journey</Text>
          <Text style={styles.description}>
            Stay connected with your child's academic progress and engage with their school community in real-time.
          </Text>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => router.replace("/login")}
          >
            <LinearGradient
              colors={["#ff6b6b", "#ee5a24"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.primaryButtonText}>Continue</Text>
              <Text style={styles.buttonIcon}>→</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.authLinks}>
            <Text style={styles.authText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/signUp")}>
              <Text style={styles.authLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  floatingCircle: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 100,
  },
  circle1: {
    width: 120,
    height: 120,
    top: 100,
    right: -30,
  },
  circle2: {
    width: 80,
    height: 80,
    top: 200,
    left: -20,
  },
  circle3: {
    width: 60,
    height: 60,
    bottom: 150,
    right: 50,
  },
  appNameContainer: {
    position: "absolute",
    top: 48,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heroSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
    zIndex: 2,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 0.3)",
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorativeRing: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderStyle: "dashed",
  },
  decorativeRing2: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  textSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  ctaSection: {
    alignItems: "center",
  },
  primaryButton: {
    width: "100%",
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
  },
  buttonIcon: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  authLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  authText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    marginRight: 8,
  },
  authLink: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
})
