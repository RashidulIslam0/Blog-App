import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate(); // Corrected variable name

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   // You can now access the form data in the 'formData' object and send it to your server for registration.
  //   console.log(formData);

  //   try {
  //     const data = await axios.post(
  //       "http://localhost:3000/api/v1/user/register",
  //       {
  //         username: formData.username,
  //         email: formData.email,
  //         password: formData.password,
  //       }
  //     );
  //     if (data.success) {
  //       alert("User Registered Successfully");
  //       navigate("/login");

  //       // Corrected function name for navigation
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can now access the form data in the 'formData' object and send it to your server for registration.
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      const data = response.data;

      if (data.success) {
        alert("User Registered Successfully");
        navigate("/login"); // Corrected function name for navigation
      } else {
        alert("Registration Failed. Please check your information.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while trying to register.");
    }
  };

  return (
    <div className="container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <p>
        Already Registered? Please <Link to="/login">login</Link>{" "}
        {/* Use the Link component to navigate to the login page */}
      </p>
    </div>
  );
}

export default Register;
