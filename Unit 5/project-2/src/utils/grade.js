export const SUBJECTS = [
  "English",
  "Mathematics",
  "Science",
  "Social Science",
  "Computer Science",
];

export function gradeFromPercent(pct) {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  if (pct >= 35) return "E";
  return "F";
}

export function computeReport(marks) {
  const values = SUBJECTS.map((s) => Number(marks[s]) || 0);
  const total = values.reduce((sum, v) => sum + v, 0);
  const percentage = total / SUBJECTS.length;
  const grade = gradeFromPercent(percentage);
  const passed = values.every((v) => v >= 35);
  return { total, percentage, grade, passed };
}
