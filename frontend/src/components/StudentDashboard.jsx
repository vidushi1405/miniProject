// StudentDashboard.jsx
import React from "react";
import MyEvents from "../pages/MyEvents";
import NotificationList from "./NotificationList";

function StudentDashboard() {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <MyEvents />
      <NotificationList />
    </div>
  );
}
export default StudentDashboard;
