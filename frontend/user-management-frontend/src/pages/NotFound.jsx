import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Aradığınız sayfa bulunamadı.</p>
      <Link to="/" className="home-link">Ana Sayfaya Dön</Link>
    </div>
  );
};

export default NotFound;