import React, { useRef, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./AddBranches.css";
import { useModal } from "../../AppProvider/AppProvider";
const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContent = styled.div`
  background: rgb(236, 236, 236);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border-radius: 20px;
  padding: 20px;
  display: block;
  width: 400px;
  @media (max-width: 690px) {
    width: 250px;
    height: 360px;
    padding: 5px;
  }
`;

export default function AddBranched(props) {
  const { branch, sem } = props;
  const [branchName, setBranchName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isAuthenticated, user } = useModal();
  const modalRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user.verified) {
      alert("Admin not verified !");
    }
    const authToken = localStorage.getItem("authorization");
    if (isAuthenticated && user.verified) {
      if (!branch && !sem) {
        try {
          const response = await fetch(
            "http://localhost:8000/subject/addBranch",
            {
              method: "POST",
              headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Branch: branchName,
              }),
            }
          );
          const data = await response.json();
          if (response.ok) {
            setBranchName("");
            alert(data.message);
          } else {
            const errorData = await response.json();
            throw new Error(`Failed to add branch: ${errorData.message}`);
          }
        } catch (err) {
          console.error("Error adding branch:", err);
        }
      } else {
        try {
          const response = await fetch(
            "http://localhost:8000/subject/addSubjects",
            {
              method: "POST",
              headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Branch: branch,
                Sem:sem,
                subject:branchName
              }),
            }
          );
          const data = await response.json();
          if (response.ok) {
            setBranchName("");
            alert(data.message);
          } else {
            const errorData = await response.json();
            throw new Error(`Failed to add subject: ${errorData.message}`);
          }
        } catch (err) {
          console.error("Error adding subject:", err);
        }
      }
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const placeholderText = sem && branch ? "Add Subjects" : "Add Branches";

  return (
    <>
      <div className="button-container">
        {branch && sem ? (
          <div className="branches_button" onClick={openModal}>
            Add Subjects for {branch}, Sem {sem}
            <FontAwesomeIcon
              width={25}
              icon={faPlus}
              size="1x"
              className="icon"
            />
          </div>
        ) : (
          <>
            <div className="branches_button" onClick={openModal}>
              Add Branches
              <FontAwesomeIcon
                width={25}
                icon={faPlus}
                size="1x"
                className="icon"
              />
            </div>
          </>
        )}
      </div>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Branches Modal"
        ariaHideApp={false}
      >
        <ModalContent ref={modalRef}>
          <form>
            <div class="subtitle">
              {sem && branch ? "Add Subjects" : "Add Bracnhes "}
            </div>
            <div class="input-container ic1">
              <input
                id="Branch Name"
                class="input"
                type="text"
                required
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder={placeholderText}
              />

              <label for="Sunject Name" class="placeholder"></label>
            </div>
            <div className="buttons">
              <button type="text" onClick={handleSubmit} class="submit">
                Add
              </button>
              <button type="text" onClick={closeModal} class="submit">
                Close
              </button>
            </div>
          </form>
        </ModalContent>
      </CustomModal>
    </>
  );
}

AddBranched.defaultProps = {
  sem: false,
  branch: false,
};
