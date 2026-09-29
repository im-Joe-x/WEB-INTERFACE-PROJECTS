import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../context/StudentContext";
import StudentForm from "../components/StudentForm";

export default function EditStudent() {
  const { id } = useParams();
  const { getStudent, updateStudent } = useStudents();
  const navigate = useNavigate();
  const student = getStudent(id);

  if (!student) {
    return <p className="empty-state">Student not found.</p>;
  }

  const handleSubmit = (data) => {
    updateStudent(id, data);
    navigate(`/report/${id}`);
  };

  return (
    <section className="section">
      <h2 className="section-title">Edit Student</h2>
      <StudentForm initial={student} onSubmit={handleSubmit} submitLabel="Update & View Report" />
    </section>
  );
}
