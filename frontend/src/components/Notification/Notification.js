import React, { useState, useEffect } from "react";
import "./Notification.css";

function Notification({ message, isSuccess }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return isVisible ? (
    <div className={`notification ${isSuccess ? "success" : "error"}`}>
      {message}
      <div className="line"></div>
    </div>
  ) : null;
}

export default Notification;
