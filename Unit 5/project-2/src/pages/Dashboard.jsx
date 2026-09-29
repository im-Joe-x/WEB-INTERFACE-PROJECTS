import { Link } from "react-router-dom";
import { useStudents } from "../context/StudentContext";
import { computeReport } from "../utils/grade";

export default function Dashboard() {
  const { students, deleteStudent } = useStudents();

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Student Dashboard</h2>
        <Link to="/add" className="btn primary">+ Add Student</Link>
      </div>

      {students.length === 0 ? (
        <p className="empty-state">No students added yet. Click "Add Student" to get started.</p>
      ) : (
        <div className="table-wrap">
          <table className="student-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Result</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const { percentage, grade, passed } = computeReport(s.marks);
                return (
                  <tr key={s.id}>
                    <td>{s.rollNumber}</td>
                    <td>{s.name}</td>
                    <td>{percentage.toFixed(2)}%</td>
                    <td><span className="grade-pill">{grade}</span></td>
                    <td>
                      <span className={`status-pill ${passed ? "pass" : "fail"}`}>
                        {passed ? "PASS" : "FAIL"}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <Link to={`/report/${s.id}`} className="link-btn">View</Link>
                      <Link to={`/edit/${s.id}`} className="link-btn">Edit</Link>
                      <button className="link-btn danger" onClick={() => deleteStudent(s.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
