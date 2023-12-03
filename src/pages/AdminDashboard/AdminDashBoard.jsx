import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AdminDash from '../../components/AdminDashboard/AdminDash'
import "./adminPage.css"

export default function AdminDashBoard() {
  return (
    <div className='admin_page'>
      <Navbar/>
      <AdminDash/>

    </div>
  )
}
