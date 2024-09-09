import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function Login() {
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

    // axios를 사용해 백엔드로 로그인 데이터 전송
    axios.post('http://localhost:8080/api/auth/login', loginData)
      .then(response => {
        console.log(response.data);
        alert("Login successful!");
        // 로그인 성공 후 필요한 작업 (예: 토큰 저장, 페이지 이동 등)
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