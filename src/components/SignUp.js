import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";
import { Link, useNavigate} from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const Navigate=useNavigate()

  const navigate=useNavigate()
    useEffect(()=>{
      const auth=localStorage.getItem('user')
      if(auth){
         navigate("/")
      }
    })


  const handlesubmit = async () => {
    console.warn(name, email, password);
    const phoneNumber=null;
    const address=null
    let result = await fetch(`${process.env.REACT_APP_API_URL}/Signup`, {
      method: "post",
      body: JSON.stringify({ name, email, password,phoneNumber,address}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user",JSON.stringify(result))
    if(result){
           Navigate('/login')
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
              type="name"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
