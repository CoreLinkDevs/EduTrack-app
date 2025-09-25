import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, ActivityIndicator, FlatList } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { useRouter } from "expo-router" // Add this import
import { getAcademicCalendar } from "./api/mobile";
import { useAuth } from "./context/AuthContext";

export default function CalendarScreen() {
  const router = useRouter() // Add this line
  const { token } = useAuth();
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Calendar data
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Academic events
  const academicEvents: { [key: number]: { type: string; title: string } } = {
    5: { type: "exam", title: "Math Test" },
    12: { type: "holiday", title: "School Holiday" },
    18: { type: "event", title: "Sports Day" },
    22: { type: "assignment", title: "Science Project Due" },
    28: { type: "exam", title: "Final Exams Begin" },
  }

  useEffect(() => {
      if (!token) {
        setError("No token provided");
        setLoading(false);
        return;
      }
      getAcademicCalendar(token)
        .then(setCalendar)
        .catch(() => setError("Failed to load calendar"))
        .finally(() => setLoading(false));
    }, [token]);

  // Get calendar days
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth)
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
    setSelectedDate(null)
  }

  const getEventStyle = (eventType: string) => {
    switch (eventType) {
      case 'exam':
        return { backgroundColor: '#e53e3e', color: 'white' }
      case 'holiday':
        return { backgroundColor: '#38a169', color: 'white' }
      case 'event':
        return { backgroundColor: '#3182ce', color: 'white' }
      case 'assignment':
        return { backgroundColor: '#d69e2e', color: 'white' }
      default:
        return { backgroundColor: '#4a5568', color: 'white' }
    }
  }

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

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
          {/* Back Button replaces menu */}
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => router.back()}
          >
            <LinearGradient
              colors={["#4a5568", "#2d3748"]}
              style={styles.menuGradient}
            >
              <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>←</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => router.push("/Notifications")}
            >
              <LinearGradient
                colors={["#e53e3e", "#c53030"]}
                style={styles.notificationGradient}
              >
                <View style={styles.bellShape}>
                  <View style={styles.bellTop} />
                  <View style={styles.bellBody} />
                </View>
                <View style={styles.notificationDot} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => router.push("/Profile")}
            >
              <LinearGradient
                colors={["#3182ce", "#2c5282"]}
                style={styles.profileRing}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                  }}
                  style={styles.profileImage}
                />
              </LinearGradient>
              <View style={styles.onlineIndicator} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Page Title */}
        <View style={styles.titleSection}>
          <View style={styles.titleCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
              style={styles.titleGradient}
            >
              <Text style={styles.pageTitle}>Academic Calendar</Text>
              <Text style={styles.pageSubtitle}>School Year 2024-2025</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Calendar Card */}
        <View style={styles.calendarCard}>
          <LinearGradient
            colors={["#4a5568", "#2d3748", "#553c9a"]}
            style={styles.calendarHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => navigateMonth('prev')}
            >
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>
            
            <Text style={styles.monthYear}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => navigateMonth('next')}
            >
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.calendarContent}>
            {/* Days of Week Header */}
            <View style={styles.daysHeader}>
              {daysOfWeek.map((day) => (
                <View key={day} style={styles.dayHeaderCell}>
                  <Text style={styles.dayHeaderText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {getDaysInMonth().map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCell,
                    day === null && styles.emptyCell,
                    selectedDate === day && styles.selectedDayCell,
                    day && academicEvents[day] ? styles.eventDayCell : undefined
                  ]}
                  onPress={() => day && setSelectedDate(day)}
                  disabled={day === null}
                >
                  {day && (
                    <>
                      <Text style={[
                        styles.dayText,
                        selectedDate === day && styles.selectedDayText,
                        academicEvents[day] && styles.eventDayText
                      ]}>
                        {day}
                      </Text>
                      {academicEvents[day] && (
                        <View style={[
                          styles.eventDot,
                          getEventStyle(academicEvents[day].type)
                        ]} />
                      )}
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Event Details */}
        {selectedDate && academicEvents[selectedDate] && (
          <View style={styles.eventDetailsCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
              style={styles.eventDetailsGradient}
            >
              <Text style={styles.eventDate}>
                {monthNames[currentMonth.getMonth()]} {selectedDate}, {currentMonth.getFullYear()}
              </Text>
              <View style={[
                styles.eventTypeTag,
                getEventStyle(academicEvents[selectedDate].type)
              ]}>
                <Text style={styles.eventTypeText}>
                  {academicEvents[selectedDate].type.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.eventTitle}>
                {academicEvents[selectedDate].title}
              </Text>
            </LinearGradient>
          </View>
        )}

        {/* Legend */}
        <View style={styles.legendCard}>
          <LinearGradient
            colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
            style={styles.legendGradient}
          >
            <Text style={styles.legendTitle}>Event Types</Text>
            <View style={styles.legendGrid}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#e53e3e' }]} />
                <Text style={styles.legendText}>Exams</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#38a169' }]} />
                <Text style={styles.legendText}>Holidays</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#3182ce' }]} />
                <Text style={styles.legendText}>Events</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#d69e2e' }]} />
                <Text style={styles.legendText}>Assignments</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <FlatList
          data={calendar}
          keyExtractor={item => item.id?.toString() || item.date}
          renderItem={({ item }) => (
            <View style={{ padding: 16 }}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text>{item.date}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <LinearGradient
          colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)"]}
          style={styles.navGradient}
        >
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => router.push("/Dashboard")}
          >
            <View style={styles.inactiveNavBg}>
              <Text style={styles.navIcon}>🏠</Text>
            </View>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, styles.navItemActive]}
            onPress={() => router.push("/Calendar")}
          >
            <LinearGradient
              colors={["#4a5568", "#2d3748"]}
              style={styles.activeNavBg}
            >
              <Text style={[styles.navIcon, styles.navIconActive]}>📅</Text>
            </LinearGradient>
            <Text style={[styles.navLabel, styles.navLabelActive]}>Calendar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => router.push("/Settings")}
          >
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
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#f8fafc",
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
  calendarCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    backgroundColor: "white",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  navButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  monthYear: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  calendarContent: {
    backgroundColor: "white",
    padding: 20,
  },
  daysHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  dayHeaderCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 5,
  },
  emptyCell: {
    backgroundColor: "transparent",
  },
  selectedDayCell: {
    backgroundColor: "#4a5568",
    borderRadius: 8,
  },
  eventDayCell: {
    backgroundColor: "rgba(74, 85, 104, 0.1)",
    borderRadius: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  selectedDayText: {
    color: "white",
  },
  eventDayText: {
    color: "#4a5568",
    fontWeight: "700",
  },
  eventDot: {
    position: "absolute",
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  eventDetailsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  eventDetailsGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  eventDate: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 10,
  },
  eventTypeTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a5568",
  },
  legendCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  legendGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 15,
  },
  legendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 10,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
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