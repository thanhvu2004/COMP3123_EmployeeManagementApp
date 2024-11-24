import React from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "./Navbar";
import { Link } from "react-router-dom";

const Welcome = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    flexDirection: "column",
  };

  return (
    <div>
      <NavigationBar />
      <Container style={containerStyle}>
        <h1>Welcome to Employee Management App</h1>
        <p>Created by Conor Le - 101411302</p>
        {!localStorage.getItem("token") && (
          <p>You are not logged in. Please login to view the employee list.</p>
        )}
        {localStorage.getItem("token") && (
          <p>
            You are logged in. Click on the <Link to="/employee">Employees link</Link>  in the navigation bar to view the employee list.
          </p>
        )}
      </Container>
    </div>
  );
};

export default Welcome;