import React, { useState, useEffect, useParams } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Api from "./Components/Api";
import MoreInfo from "./Components/MoreInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Api />} />
        <Route path="/moreinfo/:name" element={<MoreInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
