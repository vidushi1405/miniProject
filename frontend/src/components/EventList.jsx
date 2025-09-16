
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/events")
      .then((res) => setEvents(res.data))
      .catch(() => alert("Failed to load events"));
  }, []);

  const filteredEvents = events.filter(
    (ev) =>
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      (ev.location && ev.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />
      {filteredEvents.length === 0 && <p>No events found.</p>}

      {filteredEvents.map((event) => (
        <div
          key={event._id}
          className="event-card"
          style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            marginBottom: "1rem",
            padding: "1rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={event.image ? `/uploads/${event.image}` : "/default-event.jpg"}
            alt={event.title}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "4px",
              marginBottom: "0.5rem",
            }}
          />
          <div>
            <h2 style={{ margin: "0 0 0.5rem 0" }}>{event.title}</h2>
            <p style={{ margin: "0 0 0.5rem 0", color: "#555" }}>
              {event.date ? new Date(event.date).toLocaleDateString() : "TBA"} | {event.location}
            </p>
            <p>{event.description}</p>
            <Link to={`/event/${event._id}`}>View Details</Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default EventList;