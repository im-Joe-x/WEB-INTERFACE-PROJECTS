import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/StudentContext";
import StudentForm from "../components/StudentForm";

export default function AddStudent() {
  const { addStudent } = useStudents();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const id = addStudent(data);
    navigate(`/report/${id}`);
  };

  return (
    <section className="section">
      <h2 className="section-title">Add Student</h2>
      <StudentForm onSubmit={handleSubmit} submitLabel="Save & View Report" />
    </section>
  );
}
