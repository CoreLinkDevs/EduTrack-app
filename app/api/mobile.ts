const BASE_URL = "https://edutrack-backend-p3f4.onrender.com";

export const getChildProfile = async (token: string, studentId: string) => {
  const res = await fetch(`${BASE_URL}/api/mobile/child-profile?studentId=${studentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch child profile");
  return res.json();
};

export const getAcademicCalendar = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/mobile/academic-calendar`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch academic calendar");
  return res.json();
};

export const getAttendanceRecords = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/mobile/attendance-record`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch attendance records");
  return res.json();
};

export const getHomeScreenData = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/mobile/home-screen`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch home screen data");
  return res.json();
};

export const getTimeTable = async (token: string) => {
  const res = await fetch(`${BASE_URL}/api/mobile/time-table`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch timetable");
  return res.json();
};