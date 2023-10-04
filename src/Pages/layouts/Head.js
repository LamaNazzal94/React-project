import React from "react";
// <!-- Css Styles -->
import './bootstrap.min.css" ';
import './font-awesome.min.css" ';
import './elegant-icons.css" ';
import './flaticon.css" ';
import './owl.carousel.min.css" ';
import './nice-select.css" ';
import './jquery-ui.min.css" ';
import './magnific-popup.css" ';
import './slicknav.min.css" ';
import './style.css" ';

// Google Fonts

function Head() {
  return (
    <div className="head">
      {/* Favicon */}
      <link rel="icon" to="img/favicon.ico" />
      <link href="https://fonts.googleapis.com/css?family=Lora:400,700&display=swap" />
      <link href="https://fonts.googleapis.com/css?family=Cabin:400,500,600,700&display=swap" />

      {/* Google Web Fonts */}
      <link rel="preconnect" to="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        to="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        to="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Your component content here */}
    </div>
  );
}

export default Head;
