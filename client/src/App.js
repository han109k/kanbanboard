import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Board from "./components/Board/Board";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":accessKey" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
