import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <h2 className="section-title">404 — Page Not Found</h2>
      <Link to="/" className="btn primary">Back to Dashboard</Link>
    </section>
  );
}
