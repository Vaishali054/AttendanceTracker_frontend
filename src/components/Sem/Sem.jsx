import React from 'react'
import Card from '../card/Card';
import { useModal } from '../../AppProvider/AppProvider';

export default function Sem(props) {
  const{user}=useModal()
  const {branch}=props;
  const semester=[1,2,3,4,5,6,7,8]
  return (
    <div className='AdminDash'>
      <div className='container-1'>
        <div className='heading'> Welcome Back, {user.name}!</div>
      </div>
      <div className='container-2'>
        <div className='mini-heading'>Details for {branch}</div>
        <div className='branches_container'>
          {semester.map((semester, index) => (
            <Card key={index} sem={semester} branch={branch} />
          ))}
        </div>
      </div>
    </div>
  )
}
