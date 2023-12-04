import React from "react";
import AddBranched from "../add_branches_popup/AddBranched";
import { useModal } from "../../AppProvider/AppProvider";

export default function Subject(props) {
  const { branch, sem } = props;
  const { user } = useModal();
  return (
    <div className="AdminDash">
      <div className="container-1">
        <div className="heading"> Welcome Back, {user.name}!</div>
        <AddBranched sem={sem} branch={branch} />
      </div>
      <div className="container-2">
        <div className="mini-heading">
          {" "}
          Subject Registered for {branch}, Sem {sem}
        </div>
      </div>
    </div>
  );
}
