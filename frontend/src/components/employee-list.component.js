import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Employee = (props) => (
  <tr>
    <td>{props.employee.firstName}</td>
    <td>{props.employee.lastName}</td>
    <td>{props.employee.dob.substring(0, 10)}</td>
    <td>{props.employee.gender}</td>
    <td>{`0` + props.employee.mobileNumber}</td>
    <td>
      <Link to={"/edit/" + props.employee._id}>
        <button className="btn btn-primary">Edit</button>
      </Link>{" "}
      |{" "}
      <button
        className="btn btn-danger"
        onClick={() => {
          props.deleteEmployee(props.employee._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = { employees: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/employees/")
      .then((response) => {
        this.setState({ employees: response.data });
        console.log(this.state.employees);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteEmployee(id) {
    axios.delete("http://localhost:5000/employees/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      employees: this.state.employees.filter((el) => el._id !== id),
    });
  }

  employeeList() {
    return this.state.employees.map((employee) => {
      return (
        <Employee
          employee={employee}
          deleteEmployee={this.deleteEmployee}
          key={employee._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Employee List</h3>
        <Link to={"/create/"}>
          <button className="btn btn-primary">Create Employe</button>
        </Link>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Mobile Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.employeeList()}</tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeList;
