import { useParams, Link } from "react-router-dom";
import { useStudents } from "../context/StudentContext";
import { SUBJECTS, computeReport } from "../utils/grade";

export default function ReportCard() {
  const { id } = useParams();
  const { getStudent } = useStudents();
  const student = getStudent(id);

  if (!student) {
    return <p className="empty-state">Student not found.</p>;
  }

  const { total, percentage, grade, passed } = computeReport(student.marks);

  return (
    <section className="section">
      <h2 className="section-title">Report Card</h2>

      <div className="report-card">
        <div className="report-header">
          <div>
            <h3>{student.name}</h3>
            <p className="muted">Roll No: {student.rollNumber}</p>
          </div>
          <span className={`status-pill large ${passed ? "pass" : "fail"}`}>
            {passed ? "PASS" : "FAIL"}
          </span>
        </div>

        <table className="marks-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks Obtained</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((subject) => (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{student.marks[subject] || 0} / 100</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="report-summary">
          <div className="summary-card">
            <span className="fact-label">Total</span>
            <span className="fact-value">{total} / {SUBJECTS.length * 100}</span>
          </div>
          <div className="summary-card">
            <span className="fact-label">Percentage</span>
            <span className="fact-value">{percentage.toFixed(2)}%</span>
          </div>
          <div className="summary-card">
            <span className="fact-label">Grade</span>
            <span className="fact-value">{grade}</span>
          </div>
        </div>

        <div className="report-actions">
          <Link to={`/edit/${id}`} className="btn ghost">Edit Marks</Link>
          <Link to="/" className="btn primary">Back to Dashboard</Link>
        </div>
      </div>
    </section>
  );
}
