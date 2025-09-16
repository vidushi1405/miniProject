// EventDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`/events/${id}`)
      .then(res => {
        setEvent(res.data);
        if (user && res.data.registrations.some(r => r.student === user.id)) {
          setRegistered(true);
        }
      });
  }, [id, user]);

  const handleRegister = () => {
    axios.post("/registrations", { eventId: id })
      .then(() => {
        alert("Successfully registered!");
        setRegistered(true);
      })
      .catch(err => alert(err.response?.data?.message || "Registration failed"));
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Location: {event.location}</p>
      <p>Date: {event.date}</p>
      {user && !registered && (
        <button onClick={handleRegister}>Register</button>
      )}
      {registered && <p>You are registered for this event.</p>}
    </div>
  );
};

export default EventDetail;
