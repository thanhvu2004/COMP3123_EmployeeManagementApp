import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavigationBar from "../Navbar";
import { Container, Form, Button } from "react-bootstrap";

const EditEmployee = () => {
  const { employee_id } = useParams(); // Get employee_id from URL parameters
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [department, setDepartment] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Fetch employee data to populate the form
    fetch(`http://localhost:5000/api/v1/emp/employees/${employee_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setPosition(data.position);
        setSalary(data.salary);
        setDateOfJoining(data.date_of_joining.split("T")[0]); // Format date for input
        setDepartment(data.department);
        setInitialValues({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          position: data.position,
          salary: data.salary,
          date_of_joining: data.date_of_joining.split("T")[0],
          department: data.department,
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [employee_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else if (
      firstName === initialValues.first_name &&
      lastName === initialValues.last_name &&
      email === initialValues.email &&
      position === initialValues.position &&
      salary === initialValues.salary &&
      dateOfJoining === initialValues.date_of_joining &&
      department === initialValues.department
    ) {
      setErrorMessage("No changes have been made.");
    } else {
      setErrorMessage("");

      const updatedEmployee = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        position: position,
        salary: parseFloat(salary),
        date_of_joining: dateOfJoining,
        department: department,
      };

      fetch(`http://localhost:5000/api/v1/emp/employees/${employee_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
        },
        body: JSON.stringify(updatedEmployee),
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
          alert("Employee updated successfully");
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
          borderRadius: "5%",
        }}
      >
        <h2>Edit Employee</h2>
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
            Update Employee
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

export default EditEmployee;