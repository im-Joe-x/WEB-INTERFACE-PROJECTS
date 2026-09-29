import { useState } from "react";
import { SUBJECTS } from "../utils/grade";

export default function StudentForm({ initial, onSubmit, submitLabel }) {
  const [name, setName] = useState(initial?.name || "");
  const [rollNumber, setRollNumber] = useState(initial?.rollNumber || "");
  const [marks, setMarks] = useState(
    initial?.marks || Object.fromEntries(SUBJECTS.map((s) => [s, ""]))
  );

  const handleMarkChange = (subject, value) => {
    const num = value === "" ? "" : Math.max(0, Math.min(100, Number(value)));
    setMarks((prev) => ({ ...prev, [subject]: num }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !rollNumber.trim()) return;
    onSubmit({ name: name.trim(), rollNumber: rollNumber.trim(), marks });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label>Student Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Roll Number</label>
          <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
        </div>
      </div>

      <h3 className="marks-heading">Marks (out of 100)</h3>
      <div className="marks-grid">
        {SUBJECTS.map((subject) => (
          <div className="field" key={subject}>
            <label>{subject}</label>
            <input
              type="number"
              min="0"
              max="100"
              value={marks[subject]}
              onChange={(e) => handleMarkChange(subject, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button type="submit" className="btn primary">{submitLabel}</button>
    </form>
  );
}
