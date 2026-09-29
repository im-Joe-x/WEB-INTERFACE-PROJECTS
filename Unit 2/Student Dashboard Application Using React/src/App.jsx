import React from "react";
import Header from "./components/Header";
import StudentCard from "./components/StudentCard";
import SubjectList from "./components/SubjectList";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const subjects = ["React", "Java", "Python", "SQL", "DBMS"];
  const semester = "V";
  const year = "III";

  return (
    <div className="App">
      <Header collegeName="ABC College of Engineering" />

      <main className="dashboard-main">
        <StudentCard
          name="Suji"
          registerNo="101"
          department="CSE"
          year="III"
          cgpa={8.5}
          attendance={82}
          photo="https://i.pravatar.cc/150?img=47"
        />

        <SubjectList
          subjects={subjects}
          semester={semester}
          year={year}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
