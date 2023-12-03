import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    Confirmpassword: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const determineUserRole = (email) => {
    if (email === "admin@nith.ac.in") {
      return "admin";
    } else {
      return "user";
    }
  };

  const handlesubmit = async () => {
    if (formData.password !== formData.Confirmpassword) {
      alert("Password didn't match");
      return;
    }
    const role = determineUserRole(formData.email);
    console.log(role)
    const phoneNumber = null;
    const address = null;
    console.log(formData)
    try {
      const response = await fetch(
        `http://localhost:8000/auth/signup?role=${role}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phoneNumber: phoneNumber,
            address: address,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 201) {
        localStorage.setItem("authorization", `Bearer ${data.authToken}`);
        alert(data.message);
        navigate("/login");
      } else {
        console.log(data);
        throw new Error(data.message);
      }
    } catch (err) {
      console.log("Error during signup");
      alert(err);
    }
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary">
              <Link to="/login">
                <strong>Log In</strong>
              </Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
             name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              name="Confirmpassword"
              type="password"
              className="form-control mt-1"
              placeholder="Confirm Password"
              value={formData.Confirmpassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"
              className="btn btn-custom"
              onClick={handlesubmit}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
