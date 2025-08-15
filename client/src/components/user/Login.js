import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import userLogin from "../../images/userLogin.jpg";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";
import { ngrok } from "../../utils/ngrok";

const Login = () => {
  const {
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    adminLoggedIn,
    setAdminLoggedIn,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${ngrok}/login`, {
        email,
        password,
      });

      if (res.data.success && res) {
        alert(res.data.message);

        setLoggedIn(true);
        setAdminLoggedIn(false);

        const userData = { email: res.data.email || email }; // fallback to email input
        setUser(userData);

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("adminLoggedIn", "false");
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("email", email);

        navigate("/scholarships");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);

      // Show backend error message if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Error logging in. Please try again.");
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <img src={userLogin} alt="User Login" style={{ maxWidth: "100%" }} />
        </Col>
        <Col>
          <Form onSubmit={PostData} method="POST">
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                className="form-control"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                className="form-control"
              />
            </Form.Group>
            <Button type="submit">LOGIN</Button> <span> or </span>
            <Link to="/register">
              <Button variant="outline-primary">Register</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
