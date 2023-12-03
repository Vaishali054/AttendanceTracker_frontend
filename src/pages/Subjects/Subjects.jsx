import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Subject from '../../components/Subject/Subject'

export default function Subjects(props) {
    const{branch,semester}=props
  return (
    <div className='admin_page'>
    <Navbar/>
    <Subject branch={branch} sem={semester}/>
    </div>
  )
}
