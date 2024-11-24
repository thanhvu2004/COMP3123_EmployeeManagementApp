import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavigationBar from "./Navbar";
import { Container, Card, Button } from "react-bootstrap";

const EmployeeDetails = () => {
  const { employee_id } = useParams(); // Get employee_id from URL parameters
  const [employee, setEmployee] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    console.log("Fetching employee details for ID:", employee_id); // Debugging log

    // Fetch employee details
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
        console.log("Fetched employee data:", data); // Debugging log
        setEmployee(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setErrorMessage("Failed to fetch employee details.");
      });
  }, [employee_id]);

  return (
    <div>
      <NavigationBar />
      <Container className="mt-5">
        <h2>Employee Details</h2>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        {employee ? (
          <Card>
            <Card.Body>
              <Card.Title>
                {employee.first_name} {employee.last_name}
              </Card.Title>
              <Card.Text>
                <strong>Email:</strong> {employee.email}
                <br />
                <strong>Position:</strong> {employee.position}
                <br />
                <strong>Salary:</strong> ${employee.salary}
                <br />
                <strong>Date of Joining:</strong>{" "}
                {new Date(employee.date_of_joining).toLocaleDateString()}
                <br />
                <strong>Department:</strong> {employee.department}
              </Card.Text>
              <Button variant="secondary" onClick={() => history.goBack()}>
                Back
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default EmployeeDetails;
