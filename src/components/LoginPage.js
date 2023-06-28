
import React, { useEffect, useState,useContext } from "react"

import {Link, useNavigate} from 'react-router-dom';


export default function () {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
 
  const navigate=useNavigate()

  useEffect(()=>{
    const auth =localStorage.getItem('user')
    if(auth){
      navigate("/")
    }
  })


  const handlesubmit = async () => {
       
       let result= await fetch(`${process.env.REACT_APP_API_URL}/login`,{
         method:'post',
         body: JSON.stringify({email,password}),
         headers:{
           'Content-Type':'application/json'
          }
        })
        result =await result.json()
        if(result.name){
          
          localStorage.setItem("user", JSON.stringify(result))
          
           navigate("/")
       }
       else{
           alert("Please enter correct details")
       }
  };

  

    const renderForm= (
      
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary">
              <Link   to="/Signup"><strong>Sign Up</strong></Link> 
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"  required value={email} onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password" required value={password} onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-custom" onClick={handlesubmit}>
                <strong >Submit</strong>
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
    
  

  

  return(
    <>
         {renderForm}
    </>
    
  );
  
}