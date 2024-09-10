import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 막기

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation(); // 폼 검증이 실패하면 중단
      setValidated(true);
      return;
    }

    axios.post('http://localhost:8080/api/auth/login', loginData)
    .then(response => {
        const token = response.data.data.token; // 서버 응답에서 JWT 추출
        localStorage.setItem('jwtToken', token); // 로컬 스토리지에 저장
        alert('Login successful!');
        navigate('/');
    })
    .catch(error => {
        console.error("There was an error!", error);
        alert("Login failed!");
    });

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>E-mail</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="E-mail Address"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your e-mail address.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustomPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Login</Button>
    </Form>
  );
}

export default Login;