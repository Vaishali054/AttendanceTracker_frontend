import React, { useState, useEffect } from "react";
import { BrowserRouter,Routes, Route , Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import PrivateComponent from "./components/PrivateComponents";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import About from "./components/About";
import TimetableInput from "./components/timetableInput";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile"

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    
       
      <BrowserRouter>
         <Navbar/>




      <Routes>
        <Route  element={<PrivateComponent/>}>
              <Route path= '/Signout' ></Route>
        </Route>
              <Route path='/login' element={<LoginPage/>}></Route>

       <Route path='/' element={<Home/>}></Route>
       <Route path= '/Signup' element={<SignUp/>}></Route>
       {/* <Route path= '/about' element={<About/>}></Route> */}
       <Route path= '/profile' element={<Profile/>}></Route>
       <Route path= '/timetable' element={<TimetableInput/>}></Route>
       <Route path= '/dashboard' element={<Dashboard/>}></Route>
  
      </Routes>
           
      
      </BrowserRouter>
       
      
    
  );
}

export default App