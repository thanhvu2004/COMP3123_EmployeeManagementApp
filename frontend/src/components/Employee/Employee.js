import React, { useEffect, useState } from "react";
import NavigationBar from "../Navbar";
import { Container, Button, Table, Form } from "react-bootstrap";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");

  const fetchEmployees = (query = "") => {
    fetch(`http://localhost:5000/api/v1/emp/employees${query}`, {
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
        setEmployees(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = [];
    if (department) query.push(`department=${encodeURIComponent(department)}`);
    if (position) query.push(`position=${encodeURIComponent(position)}`);
    console.log("Query string:", query.join("&"));
    fetchEmployees(`?${query.join("&")}`);
  };

  const handleDelete = (employeeId) => {
    fetch(`http://localhost:5000/api/v1/emp/employees?eid=${employeeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Check if the response has a body
        return response.text().then((text) => (text ? JSON.parse(text) : {}));
      })
      .then((data) => {
        // Remove the deleted employee from the state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== employeeId)
        );
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <div>
      <NavigationBar />
      {!localStorage.getItem("token") && (
        <p>You are not logged in. Please login to view the employee list.</p>
      )}
      {localStorage.getItem("token") && (
        <div>
          <Container className="d-flex flex-column" style={{ height: "90vh" }}>
            <h1>Employee Management</h1>
            <Button
              variant="primary"
              href="/create-employee"
              style={{ width: "200px", margin: "20px" }}
            >
              Add Employee
            </Button>
            <Form onSubmit={handleSearch} className="mb-3">
              <Form.Group controlId="formDepartment">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPosition" className="mt-3">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Search
              </Button>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee First Name</th>
                  <th>Employee Last Name</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee._id}>
                    <td>{index + 1}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.email}</td>
                    <td>
                      <Button
                        variant="warning"
                        href={`/edit-employee/${employee._id}`}
                        style={{ margin: "5px" }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(employee._id)}
                        style={{ margin: "5px" }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="info"
                        href={`/employee-details/${employee._id}`}
                        style={{ margin: "5px" }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Employee;
