import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Employee from './components/Employee';
import Welcome from "./components/Welcome"; 
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeDetails from "./components/EmployeeDetails";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/employee" component={Employee} />
          <Route path="/create-employee" component={CreateEmployee} />
          <Route path="/edit-employee/:employee_id" component={EditEmployee} />
          <Route path="/employee-details/:employee_id" component={EmployeeDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;