import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotFound() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404</h1>
      <h2 style={subheadingStyle}>Page Not Found</h2>
      <p style={paragraphStyle}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}


const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '10rem',
    color: '#dc3545',
  };

  const subheadingStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
  };

  const paragraphStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  };

