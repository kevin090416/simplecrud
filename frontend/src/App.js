import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import EmployeeList from "./components/employee-list.component";
import CreateEmployee from "./components/create-employee.component";
import EditEmployee from "./components/edit-employee.component";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="container">
          <br />
          <Route path="/" exact component={EmployeeList} />
          <Route path="/create" component={CreateEmployee} />
          <Route path="/edit/:id" component={EditEmployee} />
        </div>
      </Router>
    );
  }
}

export default App;
