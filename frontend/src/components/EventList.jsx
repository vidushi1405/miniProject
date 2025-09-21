
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function EventList() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/events").then(res => setEvents(res.data));
  }, []);

  const handleRegister = (eventId) => {
    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }
    navigate(`/payment/${eventId}`);
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.map(ev => (
        <div key={ev._id}>
          <h3>{ev.title}</h3>
          <p>{ev.date}</p>
          <p>{ev.description}</p>
          <p>Fee: ₹{ev.registrationFee}</p>
          <button onClick={() => handleRegister(ev._id)}>Register</button>
        </div>
      ))}
    </div>
  );
}

export default EventList;
