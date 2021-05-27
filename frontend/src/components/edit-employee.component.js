import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class CreateEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      dob: new Date(),
      gender: "Male",
      mobileNumber: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/employees/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          dob: new Date(response.data.dob),
          gender: response.data.gender,
          mobileNumber: response.data.mobileNumber,
        });
        // console.log(response.data.dob);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeDateOfBirth(date) {
    this.setState({
      dob: date,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeMobileNumber(e) {
    this.setState({
      mobileNumber: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dob: this.state.dob,
      gender: this.state.gender,
      mobileNumber: this.state.mobileNumber,
    };

    // console.log(this.props.match.params.id);
    axios
      .post(
        "http://localhost:5000/employees/update/" + this.props.match.params.id,
        employee
      )
      .then((res) => {
        console.log(res.data);
        window.location = "/";
      });
  }

  state = {};
  render() {
    return (
      <div>
        <h3>Create New Employee</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangeFirstName}
            />
          </div>
          <div className="form-group">
            <label>Last Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChangeLastName}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.dob}
                onChange={this.onChangeDateOfBirth}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Gender: </label>
            <select
              // ref="userInput"
              required
              className="form-control"
              value={this.state.gender}
              onChange={this.onChangeGender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Mobile Number: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.mobileNumber}
              onChange={this.onChangeMobileNumber}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Update Employee"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateEmployee;
