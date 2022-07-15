import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";

//exact is needed for '/' to only match HomePage
function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
