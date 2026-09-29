const filters = ["All", "Active", "Completed"];

export default function FilterTabs({ current, onChange, counts }) {
  return (
    <div className="filter-tabs">
      {filters.map((f) => (
        <button
          key={f}
          className={`filter-tab ${current === f ? "active" : ""}`}
          onClick={() => onChange(f)}
        >
          {f}
          <span className="count">{counts[f]}</span>
        </button>
      ))}
    </div>
  );
}
