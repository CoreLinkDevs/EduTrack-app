import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useState, useRef } from "react"
import { useRouter } from "expo-router"
import { ScrollView } from "react-native-gesture-handler"

const { width } = Dimensions.get("window")

type Slide = {
  key: string
  title: string
  description: string
  image: any
  bg: [string, string]
}

const slides: Slide[] = [
  {
    key: "slide1",
    title: "Welcome to EduTrack",
    description: "Monitor your child's academic progress, attendance, and school activities all in one place.",
    image: require("../assets/onboarding1.png"), // Replace with your own image assets
    bg: ["#667eea", "#764ba2"],
  },
  {
    key: "slide2",
    title: "Stay Connected",
    description: "Receive instant updates, announcements, and communicate with teachers and school staff easily.",
    image: require("../assets/onboarding1.png"),
    bg: ["#38a169", "#2f855a"],
  },
  {
    key: "slide3",
    title: "Easy Payments",
    description: "Pay school fees securely and access receipts and statements anytime, anywhere.",
    image: require("../assets/onboarding1.png"),
    bg: ["#3182ce", "#2c5282"],
  },
]

export default function OnboardingScreen() {
  const [current, setCurrent] = useState(0)
  const scrollRef = useRef<ScrollView>(null)
  const router = useRouter()

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: width * (current + 1), animated: true })
      }
    } else {
      router.replace("/index") // Navigate to the main app screen
    }
  }

  const handleSkip = () => {
    router.replace("/index") // Skip to the main app screen
  }

  const onScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width)
    setCurrent(slideIndex)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, idx) => (
          <LinearGradient
            key={slide.key}
            colors={slide.bg}
            style={styles.slide}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={slide.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {slides.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              current === idx && styles.activeDot,
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        {current < slides.length - 1 && (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <LinearGradient
            colors={slides[current].bg}
            style={styles.nextGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextText}>
              {current === slides.length - 1 ? "Get Started" : "Next"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#667eea",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    width,
  },
  slide: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 120,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 18,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#f1f5f9",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#cbd5e1",
    marginHorizontal: 6,
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: "#fff",
    opacity: 1,
    width: 18,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 40,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.8,
  },
  nextButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  nextGradient: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
})