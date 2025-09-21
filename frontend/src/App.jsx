import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  const { user } = useAuth();
  return (
    <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/events" element={<EventList />} />
  <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={user?.role === "student" ? <StudentDashboard /> : <AdminDashboard />}
      />
      {/* more routes */}
    </Routes>
  );
}
export default App;
