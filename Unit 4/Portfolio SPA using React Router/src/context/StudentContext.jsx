import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [students, setStudents] = useLocalStorage("students", []);

  const addStudent = (student) => {
    const newStudent = { id: Date.now().toString(), ...student };
    setStudents((prev) => [...prev, newStudent]);
    return newStudent.id;
  };

  const updateStudent = (id, updates) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const getStudent = (id) => students.find((s) => s.id === id);

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent, getStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudents must be used within a StudentProvider");
  return ctx;
}
