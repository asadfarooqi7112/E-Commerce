import React from 'react';

export default function HamburgerButton(): JSX.Element {
  return (
    <div style={hamburgerContainer}>
      <div style={line}></div>
      <div style={line}></div>
      <div style={line}></div>
    </div>
  );
}

const hamburgerContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '30px',
  height: '25px',
  cursor: 'pointer',
  marginTop: '10px',
};

const line: React.CSSProperties = {
  backgroundColor: 'black',
  width: '30px',
  height: '3px',
  borderRadius: '5px',
  transition: 'all 0.3s ease',
};
