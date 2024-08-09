import React, { useState } from 'react';
import './ContactUs.css';

import { supabase } from '../supabaseClient';

export default function ContactUs() {
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
    }, 5000); // Clear messages after 5 seconds (adjust as needed)
  };

  return (
    <div className='contact-us_container'>
      <h1>Contact Us</h1>
      <p>Whatsapp: 0346 8576853</p>
      <p>Customer Support: alcheez2024@gmail.com</p>
      <form onSubmit={handleSubmit} className='form_container'>
        <h2 style={{textAlign:"center"}}>Contact Us via WhatsApp, Email, or Leave a Message Below <br/> We're Here to Assist You!</h2>
        <div className='name-email_container'>
          <label className='form-label'>
            Name:
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='form-input'
              required
            />
          </label>
          <label className='form-label'>
            Email:
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-input'
              required
            />
          </label>
        </div>
        <br />
        <label className='form-label'>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='form-textarea'
            required
          />
        </label>
        <br />
        <button type='submit' className='form-button'>
          SEND
        </button>
      </form>
      {successMessage && (
        <p className='success-message'>{successMessage}</p>
      )}
      {errorMessage && (
        <p className='error-message'>{errorMessage}</p>
      )}
    </div>
  );
}
