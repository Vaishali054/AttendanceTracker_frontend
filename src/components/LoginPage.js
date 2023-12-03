import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../AppProvider/AppProvider";

export default function Login() {
  const{setLogin,setUser,user}=useModal();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const determineUserRole = (email) => {
    if (email === "admin@nith.ac.in") {
      return "admin";
    } else {
      return "user";
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlesubmit = async () => {
    const role = determineUserRole(formData.email);
    console.log(formData)
    try {
      const response = await fetch(
        `http://localhost:8000/auth/login?role=${role}`,
        {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("authorization", `Bearer ${data.authToken}`);
        setLogin();
        alert(data.message);
        const authToken=localStorage.getItem('authorization')
        getUserDetails(authToken);
        if(user.role==="admin"){
          navigate("/admin")
        }
        else{

          navigate("/dashboard");
        }
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.log("Error during signup");
      alert(err);
    }
  };

  const getUserDetails = async (authToken) => {
    try {
      const response = await fetch("http://localhost:8000/auth/me", {
        method: "GET",
        headers: {
          authorization: `${authToken}`,
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        setUser(userData);
        console.log(userData)
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to fetch user details: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  const renderForm = (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary">
              <Link to="/Signup">
                <strong>Sign Up</strong>
              </Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"
              className="btn btn-custom"
              onClick={handlesubmit}
            >
              <strong>Submit</strong>
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );

  return <>{renderForm}</>;
}
