import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, TextInput } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import type { ColorValue } from "react-native"
import { getChildProfile } from "./api/mobile"
import { useAuth } from "./context/AuthContext"

export default function ChildProfileScreen() {
  const { token } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editableData, setEditableData] = useState({
    emergencyContact: "+233 24 123 4567",
    address: "123 Accra Street, East Legon",
    medicalInfo: "No known allergies",
    parentPhone: "+233 20 987 6543"
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError("")
        const data = await getChildProfile(token)
        setProfile(data)
      } catch (err: any) {
        setError("Failed to load profile")
      }
      setLoading(false)
    }
    fetchProfile()
  }, [token])

  const handleNavigation = (screen: string) => {
    console.log(`Navigate to ${screen}`)
  }

  const handleSaveChanges = () => {
    setIsEditing(false)
    console.log("Saving changes:", editableData)
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    )
  }
  if (error || !profile) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error || "No profile data found."}</Text>
      </View>
    )
  }

  const childData = profile.child
  const parentData = profile.parent
  const teacherData = profile.teacher

  const academicStats: {
    label: string
    value: string
    color: [ColorValue, ColorValue]
    icon: string
  }[] = [
    { label: "Attendance", value: "95%", color: ["#38a169", "#2f855a"], icon: "📊" },
    { label: "Average Grade", value: "A-", color: ["#3182ce", "#2c5282"], icon: "🎯" },
    { label: "Assignments", value: "12/15", color: ["#d69e2e", "#b7791f"], icon: "📚" },
    { label: "Behavior", value: "Excellent", color: ["#805ad5", "#6b46c1"], icon: "⭐" }
  ]

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
        <View style={styles.patternCircle3} />
        <View style={styles.patternCircle4} />
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => handleNavigation('Back')}
          >
            <LinearGradient
              colors={["#4a5568", "#2d3748"]}
              style={styles.backGradient}
            >
              <Text style={styles.backIcon}>‹</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Child Profile</Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
          >
            <LinearGradient
              colors={isEditing ? ["#38a169", "#2f855a"] : ["#3182ce", "#2c5282"]}
              style={styles.editGradient}
            >
              <Text style={styles.editText}>{isEditing ? "Save" : "Edit"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Child Main Profile Card */}
        <View style={styles.mainProfileCard}>
          <LinearGradient
            colors={["#4a5568", "#2d3748", "#553c9a"]}
            style={styles.mainProfileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Floating Elements */}
            <View style={styles.floatingElement1}>
              <Text style={styles.floatingIcon}>🎓</Text>
            </View>
            <View style={styles.floatingElement2}>
              <Text style={styles.floatingIcon}>📚</Text>
            </View>
            <View style={styles.floatingElement3}>
              <Text style={styles.floatingIcon}>⭐</Text>
            </View>
            
            <View style={styles.mainProfileContent}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                  style={styles.avatarRing}
                >
                  <Image
                    source={{ uri: childData.avatar }}
                    style={styles.childAvatar}
                  />
                </LinearGradient>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Active</Text>
                </View>
              </View>
              
              <View style={styles.childMainInfo}>
                <Text style={styles.childName}>{profile.child?.name}</Text>
                <Text style={styles.studentId}>ID: {childData.studentId}</Text>
                <View style={styles.classContainer}>
                  <Text style={styles.childClass}>{childData.class}</Text>
                  <Text style={styles.academicYear}>{childData.academicYear}</Text>
                </View>
              </View>
            </View>
            
            {/* Decorative Elements */}
            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />
            <View style={styles.decorativeCircle3} />
          </LinearGradient>
        </View>

        {/* Academic Performance Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Academic Performance</Text>
          <View style={styles.statsGrid}>
            {academicStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <LinearGradient
                  colors={stat.color}
                  style={styles.statGradient}
                >
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        {/* Child Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <View style={styles.detailsCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
              style={styles.detailsGradient}
            >
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Full Name</Text>
                <Text style={styles.detailValue}>{childData.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date of Birth</Text>
                <Text style={styles.detailValue}>{childData.dateOfBirth}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Age</Text>
                <Text style={styles.detailValue}>{childData.age} years</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Blood Group</Text>
                <Text style={styles.detailValue}>{childData.bloodGroup}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Admission Date</Text>
                <Text style={styles.detailValue}>{childData.admissionDate}</Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Parents Information Section */}
        <View style={styles.parentsSection}>
          <Text style={styles.sectionTitle}>Parents Information</Text>
          
          {/* Mother Info */}
          <View style={styles.parentCard}>
            <LinearGradient
              colors={["#e53e3e", "#c53030"]}
              style={styles.parentHeader}
            >
              <Text style={styles.parentIcon}>👩</Text>
              <Text style={styles.parentTitle}>Mother</Text>
            </LinearGradient>
            <View style={styles.parentContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{parentData.motherName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Occupation</Text>
                <Text style={styles.detailValue}>{parentData.motherOccupation}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={editableData.parentPhone}
                    onChangeText={(text) => setEditableData({...editableData, parentPhone: text})}
                  />
                ) : (
                  <TouchableOpacity onPress={() => handleNavigation('Call')}>
                    <Text style={[styles.detailValue, styles.phoneLink]}>{parentData.motherPhone}</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email</Text>
                <TouchableOpacity onPress={() => handleNavigation('Email')}>
                  <Text style={[styles.detailValue, styles.emailLink]}>{parentData.motherEmail}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Father Info */}
          <View style={styles.parentCard}>
            <LinearGradient
              colors={["#3182ce", "#2c5282"]}
              style={styles.parentHeader}
            >
              <Text style={styles.parentIcon}>👨</Text>
              <Text style={styles.parentTitle}>Father</Text>
            </LinearGradient>
            <View style={styles.parentContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{parentData.fatherName}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Occupation</Text>
                <Text style={styles.detailValue}>{parentData.fatherOccupation}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone</Text>
                <TouchableOpacity onPress={() => handleNavigation('Call')}>
                  <Text style={[styles.detailValue, styles.phoneLink]}>{parentData.fatherPhone}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email</Text>
                <TouchableOpacity onPress={() => handleNavigation('Email')}>
                  <Text style={[styles.detailValue, styles.emailLink]}>{parentData.fatherEmail}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Teacher Information Section */}
        <View style={styles.teacherSection}>
          <Text style={styles.sectionTitle}>Class Teacher</Text>
          <View style={styles.teacherCard}>
            <LinearGradient
              colors={["#38a169", "#2f855a"]}
              style={styles.teacherHeader}
            >
              <Image
                source={{ uri: teacherData.teacherAvatar }}
                style={styles.teacherAvatar}
              />
              <View style={styles.teacherInfo}>
                <Text style={styles.teacherName}>{teacherData.classTeacher}</Text>
                <Text style={styles.teacherRole}>Class 5 Teacher</Text>
              </View>
              <TouchableOpacity 
                style={styles.contactTeacherButton}
                onPress={() => handleNavigation('ContactTeacher')}
              >
                <Text style={styles.contactIcon}>💬</Text>
              </TouchableOpacity>
            </LinearGradient>
            
            <View style={styles.teacherContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone</Text>
                <TouchableOpacity onPress={() => handleNavigation('Call')}>
                  <Text style={[styles.detailValue, styles.phoneLink]}>{teacherData.teacherPhone}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email</Text>
                <TouchableOpacity onPress={() => handleNavigation('Email')}>
                  <Text style={[styles.detailValue, styles.emailLink]}>{teacherData.teacherEmail}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subjectsContainer}>
                <Text style={styles.subjectsTitle}>Subjects Teaching:</Text>
                <View style={styles.subjectsGrid}>
                  {teacherData.subjects.map((subject, index) => (
                    <View key={index} style={styles.subjectTag}>
                      <Text style={styles.subjectText}>{subject}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Emergency & Additional Info */}
        <View style={styles.emergencySection}>
          <Text style={styles.sectionTitle}>Emergency & Additional Info</Text>
          <View style={styles.emergencyCard}>
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.7)"]}
              style={styles.emergencyGradient}
            >
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Emergency Contact</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={editableData.emergencyContact}
                    onChangeText={(text) => setEditableData({...editableData, emergencyContact: text})}
                  />
                ) : (
                  <Text style={styles.detailValue}>{editableData.emergencyContact}</Text>
                )}
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Home Address</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={editableData.address}
                    onChangeText={(text) => setEditableData({...editableData, address: text})}
                    multiline
                  />
                ) : (
                  <Text style={styles.detailValue}>{editableData.address}</Text>
                )}
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Medical Information</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={editableData.medicalInfo}
                    onChangeText={(text) => setEditableData({...editableData, medicalInfo: text})}
                    multiline
                  />
                ) : (
                  <Text style={styles.detailValue}>{editableData.medicalInfo}</Text>
                )}
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <LinearGradient
          colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)"]}
          style={styles.navGradient}
        >
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Home')}
          >
            <View style={styles.inactiveNavBg}>
              <Text style={styles.navIcon}>🏠</Text>
            </View>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Calendar')}
          >
            <View style={styles.inactiveNavBg}>
              <Text style={styles.navIcon}>📅</Text>
            </View>
            <Text style={styles.navLabel}>Calendar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => handleNavigation('Settings')}
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
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(74, 85, 104, 0.04)",
    top: -40,
    right: -40,
  },
  patternCircle2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(229, 62, 62, 0.04)",
    top: 300,
    left: -30,
  },
  patternCircle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(56, 161, 105, 0.04)",
    bottom: 400,
    right: 20,
  },
  patternCircle4: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(49, 130, 206, 0.04)",
    bottom: 200,
    left: -20,
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
  editButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  editGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  editText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  mainProfileCard: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#4a5568",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  mainProfileGradient: {
    padding: 28,
    minHeight: 200,
    position: "relative",
  },
  floatingElement1: {
    position: "absolute",
    top: 20,
    right: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 8,
  },
  floatingElement2: {
    position: "absolute",
    top: 70,
    right: 80,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 18,
    padding: 7,
  },
  floatingElement3: {
    position: "absolute",
    bottom: 30,
    left: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 6,
  },
  floatingIcon: {
    fontSize: 16,
  },
  mainProfileContent: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 20,
  },
  avatarRing: {
    padding: 4,
    borderRadius: 50,
  },
  childAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statusBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#10b981",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: "white",
  },
  statusText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
  childMainInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
    marginBottom: 8,
  },
  classContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  childClass: {
    fontSize: 16,
    color: "rgba(255,255,255,0.95)",
    fontWeight: "700",
    marginRight: 12,
  },
  academicYear: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
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
    right: 20,
  },
  decorativeCircle3: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    top: 100,
    left: -20,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
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
  statGradient: {
    padding: 16,
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
    textAlign: "center",
  },
  detailsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  detailsCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  detailsGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
    textAlign: "right",
  },
  phoneLink: {
    color: "#3182ce",
  },
  emailLink: {
    color: "#805ad5",
  },
  editInput: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#3182ce",
    paddingVertical: 4,
  },
  parentsSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  parentCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  parentHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  parentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  parentTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  parentContent: {
    padding: 16,
  },
  teacherSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  teacherCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 6,
    shadowColor: "#38a169",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  teacherHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  teacherAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 2,
  },
  teacherRole: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  contactTeacherButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    padding: 8,
  },
  contactIcon: {
    fontSize: 20,
  },
  teacherContent: {
    padding: 20,
  },
  subjectsContainer: {
    marginTop: 16,
  },
  subjectsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subjectTag: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  subjectText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4a5568",
  },
  emergencySection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  emergencyCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  emergencyGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
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
  navLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },
})