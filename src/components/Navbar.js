import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NavbarIcons from './NavbarIcons';
import {
  faHouse,
  faFile,
  faUser,
  faPerson,
  faSignIn,
  faBars,
  faSignOut,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
 import logo from '../images/default.jpeg'

export default function Navbar() {
 

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/Signup');
  };

  



  return (
    <>
      <div class='Navbar'>
        {auth && 
        (JSON.parse(localStorage.getItem('user')).profilePicture !==null ?
          <img
            className='logo'
            src={`http://localhost:8000/uploads/profile-pictures/${JSON.parse(auth).profilePicture}`}
            alt='logo'
          />
          :
          <img
            className='logo'
            src={logo}
            alt='logo'
          />
        )
        }

        {auth && <h6 className='username'>{JSON.parse(auth).name}</h6>}
      
          
            <>
              <NavbarIcons icon={faHouse} link='/' element='Home' />

              {/* <NavbarIcons icon={faFile} link="/about" element="About" ></NavbarIcons> */}
              {auth ? (
                <>
                  <NavbarIcons icon={faPerson} link='/profile' element='Profile' />
                  <NavbarIcons icon={faPerson} link='/dashboard' element='Dashboard' />
                  <NavbarIcons icon={faCalendar} link='/timetable' element='Timetable' />

                  <NavbarIcons icon={faSignOut} link='/Signup' onClick={logout} element={`LogOut`} />
                </>
              ) : (
                <>
                  <NavbarIcons icon={faSignIn} link='/Signup' element='SignUp' />
                  <div className='navbar-right'>
                    <NavbarIcons icon={faUser} link='/login' element='Login' />
                  </div>
                </>
              )}
            </>
          
          {/* {!shouldRender && mov_toggle()} */}
        
      </div>
    </>
  );
}
