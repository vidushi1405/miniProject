// AdminDashboard.jsx
import React from "react";
import AdminEvents from "../pages/AdminEvents";
import CertificateTemplateUpload from "../pages/CertificateTemplateUpload";

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AdminEvents />
      <CertificateTemplateUpload />
      {/* Payment and participant tracking pages here */}
    </div>
  );
}
export default AdminDashboard;
