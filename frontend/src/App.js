import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './SignUp';
import SignUp2 from './SignUp2';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUp2" element={<SignUp2 />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
