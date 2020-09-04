import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

document.addEventListener("DOMContentLoaded", () => {
  // Grab the root div element from "../../index.html"
  const root = document.getElementById("root");
  // Render the App component in the root div
  ReactDOM.render(<App />, root);
});