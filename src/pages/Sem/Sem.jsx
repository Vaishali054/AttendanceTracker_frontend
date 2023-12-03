import React from 'react'
import Navbar from "../../components/Navbar/Navbar"
import Sem from "../../components/Sem/Sem"

export default function Sem1(props) {
  const{branch}=props
  return (
    <div className='admin_page'>
     <Navbar/>
     <Sem branch={branch}/>
    </div>
  )
}
