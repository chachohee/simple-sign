import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import SignUp from './SignUp';
import SignUp2 from './SignUp2';
import Login from "./Login";
import Logout from "./Logout";
import { isLoggedIn } from './util/AuthUtil'; // 로그인 상태 확인 유틸리티

function AppContent() {
  const navigate = useNavigate();

  const handleSignUpRedirect = () => {
    if (isLoggedIn()) {
      alert("이미 로그인 중입니다. \n로그아웃 후 이용해주세요.");
      navigate('/');
    } else {
      navigate('/signUp');
    }
  };

  const handleLoginRedirect = () => {
    if (isLoggedIn()) {
      alert("이미 로그인 중입니다. \n로그아웃 후 이용해주세요.");
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><button onClick={handleSignUpRedirect}>Go to SignUp</button></li>
          <li><button onClick={handleLoginRedirect}>Go to Login</button></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        {/* <Route path="/signUp" element={<SignUp />} /> */}
        <Route path="/signUp" element={<SignUp2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;