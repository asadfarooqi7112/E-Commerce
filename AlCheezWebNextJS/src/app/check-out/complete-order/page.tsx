"use client"
import React from 'react';

const OrderComplete = () => {
  return (
    <div style={ orderComplete_container} className="text-center">
      <h1 className="mt-5" style={{color: "#28a745",}}>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed and is being processed.</p>
      <p>We appreciate your business and will notify you once your order is on its way!</p>
      <button className="btn btn-primary mt-4" onClick={() => window.location.href = '/'}>
        Go to Home
      </button>
    </div>
  );
};

export default OrderComplete;

const orderComplete_container = {
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    width: "50%",
    color: "black"
  }
  