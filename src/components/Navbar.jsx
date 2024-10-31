import React from "react";

export default function Navbar({onClick}) {
  return (
      <nav className="navbar bg-primary border-bottom border-bottom-shadow">
        <div className="container">
          <h1 className="navbar-brand text-white m-0">
            <i className="bi bi-robot"></i> LumoshiveAI
          </h1>
        <button onClick={onClick} className="btn btn-danger">
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
        </div>
      </nav>
    );
}
