import React, { useEffect, useState } from 'react';
import AddBranched from '../add_branches_popup/AddBranched';
import "./AdminDash.css";
import Card from '../card/Card';
import { useModal } from '../../AppProvider/AppProvider';
import Pagenavigation from '../pagenavigation/Pagenavigation';

export default function AdminDash() {
  const { user} = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const[branches,setBranches]=useState([])
  const itemsPerPage = 10;

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
  

  // Calculate the index range for the currently displayed branches
  const indexOfLastBranch = currentPage * itemsPerPage;
  const indexOfFirstBranch = indexOfLastBranch - itemsPerPage;
  const currentBranches = branches.slice(indexOfFirstBranch, indexOfLastBranch);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className='AdminDash'>
      <div className='container-1'>
        <div className='heading'> Welcome Back, {user.name}!</div>
        <AddBranched />
      </div>
      <div className='container-2'>
        <div className='mini-heading'> Branches registered </div>
        <div className='branches_container'>
          {currentBranches.map((branch, index) => (
            <Card key={index} branch={branch} />
          ))}
        </div>
        <Pagenavigation
          itemsPerPage={itemsPerPage}
          totalItems={branches.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  )
}
