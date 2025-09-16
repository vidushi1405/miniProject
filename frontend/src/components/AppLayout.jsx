// AppLayout.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AppLayout({ children }) {
  return (
    <>
      <header>
        <div className="container">
          <h1>College Event Management System</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </nav>
        </div>
      </header>
      <main className="container" style={{ minHeight: "80vh" }}>
        {children}
      </main>
      <footer>
        <div className="container">
          © 2025 College Event Management
        </div>
      </footer>
    </>
  );
}
