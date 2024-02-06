import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner(props) {
  return (
    <div
      className={`loading-spinner ${
        props.asOverlay && "loading-spinner__overlay"
      }`}
    >
      <div class="opposites">
        <div class="opposites bl"></div>
        <div class="opposites tr"></div>
        <div class="opposites br"></div>
        <div class="opposites tl"></div>
      </div>

      {/* <div className="spinner-container">
        <div className="spinner"></div>
      </div> */}
    </div>
  );
}

export default LoadingSpinner;
