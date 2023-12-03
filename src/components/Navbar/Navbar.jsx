import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faSignIn,
  faSignOut,
  faCalendar,
  faLitecoinSign,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/default.jpeg";
import { useModal } from "../../AppProvider/AppProvider";
import { useNavigate } from "react-router";
import "./navbar.css"

export default function Navbar() {
  const { isAuthenticated, user, setLogout } = useModal();
  const navigate = useNavigate();

  const logout = () => {
    setLogout();
    localStorage.clear();
    navigate("/login")
  };

  const handleDashboard = () => {
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  const handleProfile=()=>{
    navigate("/profile")
  }
  const handleTimeTable=()=>{
    navigate("/timetable")
  }

  const handleHome=()=>{
    navigate("/")
  }
  const handleSignin=()=>{
    navigate("/Signup")
  }
  const handleLogin=()=>{
    navigate("/login")
  }
  return (
    <div className="Navbar">
      {isAuthenticated && (
        <>
          <div className="routes">
          <div className="logo">
            <div className="logo-image"></div>
            <div className="username">{user.name}</div>
          </div>
            <div className="route">
              <FontAwesomeIcon
                width={25}
                onClick={handleDashboard}
                icon={faHouse}
                size="1x"
                className="icon"
              />
              <div className="route-name">Dashboard</div>
            </div>
            {user && user.role==="user" &&
            <div className="route">
              <FontAwesomeIcon
                width={25}
                onClick={handleTimeTable}
                icon={faCalendar}
                size="1x"
                className="icon"
                />
              <div className="route-name">TimeTable</div>
            </div>
            }
            <div className="route">
              <FontAwesomeIcon
                width={25}
                onClick={handleProfile}
                icon={faUser}
                size="1x"
                className="icon"
              />
              <div className="route-name">Profile</div>
            </div>
            <div className="route">
              <FontAwesomeIcon
                width={25}
                onClick={logout}
                icon={faSignOut}
                size="1x"
                className="icon"
              />
              <div className="route-name">Logout</div>
            </div>
          </div>
        </>
      )}
      {!isAuthenticated && (
        <>
          <div className="routes">
            <div className="route">
              <FontAwesomeIcon
                width={25}
                onClick={handleHome}
                icon={faHouse}
                size="1x"
                className="icon"
              />
              <div className="route-name">Home</div>
            </div>
            <div className="route">
              <FontAwesomeIcon
                width={25}
                onClick={handleSignin}
                icon={faSignIn}
                size="1x"
                className="icon"
              />
              <div className="route-name">Signin</div>
            </div>
            <div className="route">
              <FontAwesomeIcon
                width={25}
                onClick={handleLogin}
                icon={faLitecoinSign}
                size="1x"
                className="icon"
              />
              <div className="route-name">Login</div>
            </div>
            
          </div>
        </>
      )}
    
    </div>
  );
}
