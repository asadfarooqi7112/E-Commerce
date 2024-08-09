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
