function gradeFromPercent(pct) {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B';
  if (pct >= 60) return 'C';
  if (pct >= 50) return 'D';
  if (pct >= 35) return 'E';
  return 'F';
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

document.getElementById('generateBtn').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value.trim();
  const roll = document.getElementById('rollInput').value.trim();
  const marksRaw = document.getElementById('marksInput').value;

  document.getElementById('outName').textContent = name || '—';
  document.getElementById('outRoll').textContent = roll || '—';
  document.getElementById('initialsBadge').textContent = name ? getInitials(name) : '?';

  const statusEl = document.getElementById('outStatus');
  const emptyNote = document.getElementById('emptyNote');

  if (marksRaw !== '') {
    const marks = Math.max(0, Math.min(100, Number(marksRaw)));
    const pct = marks;
    const grade = gradeFromPercent(pct);
    const passed = pct >= 35;

    document.getElementById('outMarks').textContent = marks;
    document.getElementById('outPercent').textContent = pct + '%';
    document.getElementById('outGrade').textContent = grade;
    document.getElementById('outStatusMini').textContent = passed ? 'PASS' : 'FAIL';

    statusEl.textContent = passed ? 'PASS' : 'FAIL';
    statusEl.className = 'status-badge ' + (passed ? 'pass' : 'fail');
    statusEl.style.display = 'inline-block';
    emptyNote.style.display = 'none';
  } else {
    document.getElementById('outMarks').textContent = '—';
    document.getElementById('outPercent').textContent = '—';
    document.getElementById('outGrade').textContent = '—';
    document.getElementById('outStatusMini').textContent = '—';
    statusEl.style.display = 'none';
    emptyNote.style.display = 'block';
  }
});
