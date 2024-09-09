import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function SignUp2() {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const [passwordMismatch, setPasswordMismatch] = useState(false); // 비밀번호 불일치 여부 상태 추가

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
    
    // 비밀번호와 비밀번호 확인 필드 실시간 비교
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMismatch(formData.password !== value && name === 'confirmPassword');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 막기

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation(); // 이벤트는 기본적으로 발생 시 부모 요소나 다른 상위 요소들로 전파되는데, 이 전파를 막고자 할 때 stopPropagation()을 사용한다.
      setValidated(true); // 폼 검증 상태 활성화
      return; // 폼 검증이 실패하면 중단
    }
    
    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // axios를 사용해 백엔드로 데이터 전송
    axios.post('http://localhost:8080/api/auth/signUp', formData)
      .then(response => {
        console.log(response.data);
        alert("Sign up successful!");
      })
      .catch(error => {
        console.error("There was an error!", error);
        alert("Sign up failed!");
      });

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="2" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            name="name" value={formData.name} onChange={handleChange}
            placeholder="Username"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>E-mail</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              name="email" value={formData.email} onChange={handleChange}
              placeholder="E-mail Address"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a E-mail Address.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>       
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="2" controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" value={formData.password} onChange={handleChange}
            placeholder="Password" required 
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom04">
          <Form.Label>Password Check</Form.Label>
          <Form.Control 
            type="password"
            name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
            placeholder="Password Check" required 
          />
          <Form.Control.Feedback type="invalid">
          Please check the password.
          </Form.Control.Feedback>
          {/* 비밀번호 불일치 시 메시지 */}
          {passwordMismatch && (
            <Form.Text className="text-danger">
              Passwords do not match!
            </Form.Text>
          )}
          {/* 비밀번호가 일치할 경우 */}
          {!passwordMismatch && formData.confirmPassword && (
            <Form.Text className="text-success">
              Passwords match!
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom05">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control 
            type="text" 
            name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
            placeholder="010-0000-0000" required 
          />
          <Form.Control.Feedback type="invalid">
            Please provide a phone number.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default SignUp2;