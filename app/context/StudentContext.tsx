import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getHomeScreenData } from '../api/child';
import { useAuth } from './AuthContext';

interface Student {
  id: string;
  name: string;
  todayAttendance?: string;
  class?: string;
  profileImageUrl?: string;
  [key: string]: any;
}

interface StudentContextType {
  students: Student[];
  selectedStudent: Student | null;
  selectStudent: (student: Student) => void;
  refreshStudents: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { user } = useAuth();

  const selectStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  const refreshStudents = async () => {
    if (!user?.id) return;

    try {
      const res = await getHomeScreenData(user.id);
      const children = res.data.children || [];
      setStudents(children);
      if (!selectedStudent && children.length > 0) {
        setSelectedStudent(children[0]);
      }
    } catch (err) {
      console.error('Error fetching children:', err);
    }
  };

  // Fetch on load
  useEffect(() => {
    refreshStudents();
  }, [user?.id]);

  return (
    <StudentContext.Provider value={{ students, selectedStudent, selectStudent, refreshStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudent must be used within StudentProvider');
  return context;
};
