import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => (
  <div style={{ textAlign: "center", marginTop: "4rem" }}>
    <h1>Welcome to College Event Management</h1>
    <p>Manage and register for college events easily!</p>
    <Link to="/login"><button>Login</button></Link>
    <Link to="/register" style={{ marginLeft: "1rem" }}><button>Register</button></Link>
    <Link to="/events" style={{ marginLeft: "1rem" }}><button>View Events</button></Link>
  </div>
);

export default LandingPage;
