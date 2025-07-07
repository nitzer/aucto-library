import React, { useEffect, useState } from "react";
import "./Notification.css"; // We'll create this soon

const Notification = ({ id, message, type = "info", onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);

      setTimeout(() => onDismiss(id), 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const handleDismissClick = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(id), 300); // Shorter delay for manual dismiss
  };

  return (
    <div className={`notification ${type} ${isVisible ? "show" : "hide"}`}>
      <p>{message}</p>
      <button onClick={handleDismissClick} className="dismiss-button">
        &times;
      </button>
    </div>
  );
};

export default Notification;
