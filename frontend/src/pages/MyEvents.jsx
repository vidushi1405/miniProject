// MyEvents.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

function MyEvents() {
  const { token, user } = useAuth();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios
      .get("/registrations/mine", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRegistrations(res.data))
      .catch(() => setRegistrations([]));
  }, [token]);

  const downloadCertificate = async (eventId) => {
    try {
      const res = await axios.get(`/certificate/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob"
      });
      // Create a link to download the PDF
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Certificate download failed");
    }
  };

  return (
    <div>
      <h2>My Registered Events</h2>
      {registrations.length === 0 && <p>No events found.</p>}
      {registrations.map((reg) => (
        <div key={reg._id} style={{ marginBottom: "1.5rem" }}>
          <h4>{reg.eventId.title}</h4>
          <p>Date: {new Date(reg.eventId.date).toLocaleDateString()}</p>
          <p>Fee: ₹{reg.eventId.registrationFee}</p>
          <p>
            Payment Status: <strong>{reg.paymentStatus}</strong>
          </p>
          {reg.attended && (
            <button onClick={() => downloadCertificate(reg.eventId._id)}>
              Download Certificate
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyEvents;
