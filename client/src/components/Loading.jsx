import React from 'react';
import spinner from "../assets/spinner.gif";

const Loading = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2170747a",
    color: "#FFE5B4",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <div style={containerStyle}>
      <img src={spinner} alt="" />
    </div>
  );
}

export default Loading;
