import { Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import ReportCard from "./pages/ReportCard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <StudentProvider>
      <div className="app">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/edit/:id" element={<EditStudent />} />
            <Route path="/report/:id" element={<ReportCard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </StudentProvider>
  );
}
