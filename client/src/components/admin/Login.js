import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AdminRegistrationImage from "../../images/userRegistration.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/auth";
import { ngrok } from "../../utils/ngrok";

const AdminLogin = () => {
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
      const res = await axios.post(`${ngrok}/adminlogin`, {
        email,
        password,
      });
      console.log("res->", res);

      if (res.data.success && res) {
        alert(res.data.message);
        setLoggedIn(false);
        setAdminLoggedIn(true);
        const userData = { email }; // or whatever user info you want
        setUser(userData);
        // Save to localStorage
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/adminDashboard");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
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
          <img src={AdminRegistrationImage} alt="Admin Login" />
        </Col>
        <Col>
          <Form onSubmit={PostData} method="POST">
            <h2 style={{ textAlign: "center" }}> Admin Login</h2>
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
            <Button type="submit">LOGIN</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
