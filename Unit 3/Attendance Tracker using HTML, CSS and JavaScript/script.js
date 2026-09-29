let students = [
  { name: "Joe", present: true },
  { name: "Jaan", present: true },
  { name: "Nethra", present: true },
  { name: "Kavya", present: false },
  { name: "Sanjana", present: false }
];

function render() {
  const total = students.length;
  const presentCount = students.filter(s => s.present).length;
  const absentCount = total - presentCount;
  const pct = total === 0 ? "0.00" : ((presentCount / total) * 100).toFixed(2);

  document.getElementById("stats").innerHTML =
    `<span>Total: ${total}</span>
     <span>Present: ${presentCount}</span>
     <span>Absent: ${absentCount}</span>
     <span>Attendance: ${pct}%</span>`;

  const listEl = document.getElementById("list");
  listEl.innerHTML = "";

  students.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML =
      `<span class="name">${s.name}</span>
       <span class="status">Status: ${s.present ? "Present" : "Absent"}</span>
       <button data-index="${i}">${s.present ? "Mark Absent" : "Mark Present"}</button>`;
    listEl.appendChild(row);
  });

  listEl.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-index"));
      students[idx].present = !students[idx].present;
      render();
    });
  });
}

document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (name !== "") {
    students.push({ name: name, present: false });
    input.value = "";
    render();
  }
});

render();
