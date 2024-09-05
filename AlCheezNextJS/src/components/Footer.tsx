"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabaseClient';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
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
      console.error('Error saving form data:', error);
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
    <div className={styles.footer_container}>
      <Link href="/" className={styles.footer_title}>
        <Image src="/AlCheez-Logo.png" width={100} height={100} alt='site-logo' />
        <p style={{ marginTop: "-30px" }}>ALCHEEZ</p>
      </Link>
      <div className={styles.contact_container}>
        <h3>Contact</h3>
        <p>Monday - Saturday: 10am-10pm</p>
        <p>Phone: 0346 8576853</p>
        <p>Email: alcheez2024@gmail.com</p>
      </div>
      <div className={styles.get_in_touch_container}>
        <h3>Get in touch</h3>
        <form
          style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
          onSubmit={handleSubmit}
        >
          <input
            className={styles.input_field}
            type='text'
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className={styles.input_field}
            type='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            className={styles.input_field}
            value={message}
            placeholder='Message'
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type='submit' className={styles.form_button}>SEND</button>
        </form>
        {successMessage && (
          <p className={styles.success_message}>{successMessage}</p>
        )}
        {errorMessage && (
          <p className={styles.error_message}>{errorMessage}</p>
        )}
      </div>
      <div className={styles.follow_container}>
        <h3>Follow Us</h3>
        <div className={styles.social_icons}>
          <a href="https://web.facebook.com/profile.php?id=61563062738768" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} color='#1877F2' />
          </a>
          <a href="https://www.instagram.com/alcheez/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} color='#810AB4' />
          </a>
          <a href="https://www.youtube.com/@alcheez-d9b" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={30} color='#FF0000' />
          </a>
        </div>
      </div>
    </div>
  );
}
