import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('Starting logout process...');
      // 클라이언트 측에서 JWT 토큰 삭제
      localStorage.removeItem('jwtToken');
      alert("로그아웃 되었습니다.");
      // 로그아웃 후 홈 페이지로 리디렉션
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    console.log('useEffect called');
    handleLogout();
  }, [navigate]); // navigate가 변경될 때만 호출되도록 의존성 배열 추가

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;