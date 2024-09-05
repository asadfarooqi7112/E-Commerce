import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Footer.css';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import logo from "../images/logo for web.png"

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = await supabase
        .from('contactus')
        .insert([{ name, email, message }]);

      if (error) {
        throw error;
      }

      setSuccessMessage('Message sent successfully!');
      clearMessages();
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error saving form data:', error.message);
      setErrorMessage('Failed to send message. Please try again.');
      clearMessages();
    }
  };

  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 5000);
  };

  return (
    <div className="footer-container">
      <Link to="/" className='footer_title'><img src={logo} style={{width: "100px",height:"100px"}} alt='site-logo'/><p style={{marginTop:"-30px"}}>ALCHEEZ</p></Link>
      <div className="contact-container">
        <h3>Contact</h3>
        <p>Monday - Saturday: 10am-10pm</p>
        <p>Phone: 0346 8576853</p>
        <p>Email: alcheez2024@gmail.com</p>
      </div>
      <div className="get-in-touch-container">
        <h3>Get in touch</h3>
        <form style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}} onSubmit={handleSubmit}>
          <input
            className="input_field"
            type='text'
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input_field"
            type='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            className="input_field"
            value={message}
            placeholder='Message'
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type='submit' className='form-button' >SEND</button>
        </form>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
      </div>
      <div className="follow-container">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://web.facebook.com/profile.php?id=61563062738768" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} color='#1877F2' />
          </a>
          <a href="https://www.instagram.com/alcheez/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} color='#810AB4'/>
          </a>
          <a href="https://www.youtube.com/@alcheez-d9b" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={30} color='#FF0000'/>
          </a>
        </div>
      </div>
    </div>
  )
}
