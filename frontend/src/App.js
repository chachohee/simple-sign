import React from "react";
import { BrowserRouter as Router, Routes, Route, Link  } from "react-router-dom";
import SignUp from './SignUp';
import SignUp2 from './SignUp2';
import './App.css';
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Home Page</h1>
            <nav>
              <ul>
                <li><Link to="/signUp2">Go to SignUp</Link></li>
                <li><Link to="/login">Go to Login</Link></li>
              </ul>
            </nav>
          </div>
        } />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUp2" element={<SignUp2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
