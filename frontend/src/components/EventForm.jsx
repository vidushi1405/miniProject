import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

function EventForm({ edit }) {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && id) {
      axios.get(`/events/${id}`).then((res) => {
        const ev = res.data;
        setForm({
          title: ev.title,
          description: ev.description,
          date: ev.date ? new Date(ev.date).toISOString().substr(0, 10) : "",
          location: ev.location,
          capacity: ev.capacity,
          image: null,
        });
      });
    }
  }, [edit, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((k) => {
      if (form[k]) data.append(k, form[k]);
    });

    const request = edit
      ? axios.put(`/events/${id}`, data)
      : axios.post("/events", data);

    request
      .then(() => {
        alert(edit ? "Event updated!" : "Event created!");
        navigate("/");
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Failed to submit event")
      );
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h2>{edit ? "Edit Event" : "Create Event"}</h2>
      <input
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Event Description"
        required
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
      />
      <input
        name="location"
        type="text"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
      />
      <input
        name="capacity"
        type="number"
        value={form.capacity}
        onChange={handleChange}
        placeholder="Capacity"
        required
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
      />
      <input
        name="image"
        type="file"
        onChange={handleChange}
        accept="image/*"
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button type="submit" style={{ padding: "0.6rem 1.2rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>
        {edit ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
}

export default EventForm;
