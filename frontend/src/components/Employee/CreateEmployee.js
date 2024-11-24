import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NavigationBar from "../Navbar";
import { Container, Form, Button } from "react-bootstrap";

const CreateEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [department, setDepartment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setErrorMessage("");

      const newEmployee = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        position: position,
        salary: parseFloat(salary),
        date_of_joining: dateOfJoining,
        department: department,
      };

      fetch("http://localhost:5000/api/v1/emp/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
        },
        body: JSON.stringify(newEmployee),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || "Network response was not ok");
            });
          }
          return response.json();
        })
        .then(() => {
          history.push("/employee");
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
          borderRadius: "2%",
        }}
      >
        <h2>Create Employee</h2>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a first name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formLastName" className="mt-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a last name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPosition" className="mt-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a position.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formSalary" className="mt-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a salary.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDateOfJoining" className="mt-3">
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="Enter date of joining"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a date of joining.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDepartment" className="mt-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a department.
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
            Create Employee
          </Button>
          <Button
            variant="secondary"
            onClick={() => history.goBack()}
            className="mt-3"
            style={{ width: "100%", transition: "opacity 0.3s" }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateEmployee;