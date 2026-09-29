import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="brand">📘 Report Card MS</span>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>
            Add Student
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
