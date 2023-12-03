import React,{useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import PrivateComponent from "./components/PrivateComponents";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import TimetableInput from "./components/timetableInput";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { AppProvider } from "./AppProvider/AppProvider";
import AdminDashBoard from "./pages/AdminDashboard/AdminDashBoard";
import Navbar from "./components/Navbar";
import Sem from "./pages/Sem/Sem";
import Subjects from "./pages/Subjects/Subjects";

function App() {
  const[branches,setBranches]=useState([])
  const semester=[1,2,3,4,5,6,7,8]
  const AllBranches = async (event) => {
    const authToken = localStorage.getItem("authorization");
    try {
      const response = await fetch(
        "http://localhost:8000/subject/getbranches",
        {
          method: "GET",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setBranches(data.branches)
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to get all branch: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  
};

useEffect(() => {
  AllBranches();
}, []);


  return (
    <AppProvider>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          {/* PrivateComponent and Signout route */}
          <Route element={<PrivateComponent />}>
            <Route path="/Signout"></Route>
          </Route>

          {/* Other routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/timetable" element={<TimetableInput />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashBoard />} />
          

          {/* Dynamically generated routes for each branch */}
          {branches.map((branch, index) => (
            <Route key={index} path={`/branches/${branch}`} element={<Sem branch={branch} />} />
            
          ))}

          {/* Dynamically generate routes for each semester under each branch */}
          {branches.map((branch, branchIndex) => (
            semester.map((sem, semIndex) => (
              <Route
                key={semIndex}
                path={`/branches/${branch}/${sem}`}
                element={<Subjects branch={branch} semester={sem} />}
              />
            ))
          ))}
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
