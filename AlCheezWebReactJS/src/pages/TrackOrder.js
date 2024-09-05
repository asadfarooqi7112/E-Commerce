import React, { useState } from 'react';
import './TrackOrder.css'; // Make sure to create this CSS file

export default function TrackOrder() {
  const [isOrderNumber, setIsOrderNumber] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission here
  };

  return (
    <div style={{paddingBottom: "50px",height: "100vh"}}>
      <Helmet>
        <html lang="en" />
        <title>Track Order | AlCheez</title>
        <meta name="description" content="Track your order status at AlCheez using either your order number or tracking number. Get real-time updates on your delivery status." />
        <link rel="canonical" href="https://alcheez.com/track-order" />
        <meta name="keywords" content="track order, order status, AlCheez, tracking number, order number" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://alcheez.com/favicon.ico" />

        {/* OG Tags */}
        <meta property="og:url" content="https://alcheez.com/track-order" />
        <meta property="og:title" content="Track Order | AlCheez" />
        <meta property="og:description" content="Track your order status at AlCheez using either your order number or tracking number. Get real-time updates on your delivery status." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://alcheez.com/android-chrome-384x384.png" />

        {/* Twitter tags */}
        <meta property="twitter:site" content="@AlCheez" />
        <meta property="twitter:title" content="Track Order | AlCheez" />
        <meta property="twitter:description" content="Track your order status at AlCheez using either your order number or tracking number. Get real-time updates on your delivery status." />
        <meta property="twitter:creator" content="@AlCheez" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://alcheez.com/android-chrome-384x384.png" />

        {/* Referrer Policy */}
        <meta name="referrer" content="origin-when-crossorigin" />
      </Helmet>
      <div className="container">
        <h2 className="h2">Track Your Order</h2>
        <div>
          <button
            className={`button ${isOrderNumber ? 'activeButton' : ''}`}
            onClick={() => setIsOrderNumber(true)}
          >
            Order Number
          </button>
          <button
            className={`button ${!isOrderNumber ? 'activeButton' : ''}`}
            onClick={() => setIsOrderNumber(false)}
          >
            Tracking Number
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {isOrderNumber ? (
            <div>
              <input className="input" type='text' placeholder='Order Number' required />
              <input className="input" type='text' placeholder='Phone Number' required />
            </div>
          ) : (
            <input className="input" type='text' placeholder='Tracking Number' required />
          )}
          <button className="button" style={{backgroundColor:"#1E3A8A", color:"white", width: "100%", fontSize:"18px", marginLeft: "0px"}} type='submit'>Track</button>
        </form>
      </div>
    </div>
  );
}
