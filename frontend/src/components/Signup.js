import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import NavigationBar from "./Navbar";
import { Container, Form, Button } from "react-bootstrap";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || password.length < 6) {
      e.stopPropagation();
      setErrorMessage("Password must be at least 6 characters long.");
    } else {
      setErrorMessage("");

      fetch("http://localhost:5000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || "Network response was not ok");
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === false) {
            setErrorMessage(data.message);
          } else {
            history.push("/login");
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setErrorMessage(err.message);
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <NavigationBar />
      <Container
        className="mt-5"
        style={{
          width: "50%",
          border: "1px grey solid",
          padding: "20px",
          borderRadius: "5%",
        }}
      >
        <h2>Signup</h2>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            style={{ width: "100%", transition: "opacity 0.3s" }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            Signup
          </Button>
        </Form>
        <div className="mt-3">
          <p>
            already have an account? <Link to="/Login">Log in here</Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Signup;