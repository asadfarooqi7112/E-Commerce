"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import styles from './ContactUs.module.css';
import { supabase } from '../../lib/supabaseClient';

export default function ContactUs() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    } catch (error: any) {
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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className={styles.contact_us_container}>
      <h1>Contact Us</h1>
      <p>Whatsapp: 0346 8576853</p>
      <p>Customer Support: alcheez2024@gmail.com</p>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <h2 style={{textAlign:"center"}}>Contact Us via WhatsApp, Email, or Leave a Message Below <br/> We&apos;re Here to Assist You!</h2>
        <div className={styles.name_email_container}>
          <label className={styles.form_label}>
            Name:
            <input
              type='text'
              value={name}
              onChange={handleNameChange}
              className={styles.form_input}
              required
            />
          </label>
          <label className={styles.form_label}>
            Email:
            <input
              type='email'
              value={email}
              onChange={handleEmailChange}
              className={styles.form_input}
              required
            />
          </label>
        </div>
        <br />
        <label className='form-label'>
          Message:
          <textarea
            value={message}
            onChange={handleMessageChange}
            className={styles.form_textarea}
            required
          />
        </label>
        <br />
        <button type='submit' className={styles.form_button}>
          SEND
        </button>
      </form>
      {successMessage && (
        <p className={styles.success_message}>{successMessage}</p>
      )}
      {errorMessage && (
        <p className={styles.error_message}>{errorMessage}</p>
      )}
    </div>
  );
}
