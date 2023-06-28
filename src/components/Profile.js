import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [renderForm, setRenderForm] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [shouldRender, setShouldRender] = useState(true);
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 1199) {
          setShouldRender(false);
        } else {
          setShouldRender(true);
        }
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  const userDetails = localStorage.getItem('user');

  const setRender = () => {
    setRenderForm(true);
  };

  const saveProfileChanges = async () => {
    let userid = JSON.parse(userDetails)._id;
    const result = await fetch(`${process.env.REACT_APP_API_URL}/users/${userid}`, {
      method: 'PUT',
      body: JSON.stringify({ email, name, address, phoneNumber }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const updatedResult = await result.json();
  //   const { id, name, email, phoneNumber, address } = updatedResult;
  // const updatedUser = { id, name, email, phoneNumber, address };

    localStorage.setItem('user', JSON.stringify(updatedResult));
    if (updatedResult) {
      setRenderForm(false);
      setAddress('');
    setEmail('');
    setPhoneNumber('');
    setName('');;
    }
  };
  
  const handleCancel = () => {
    setRenderForm(false);
    setAddress('');
    setEmail('');
    setPhoneNumber('');
    setName('');
  };
  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const uploadProfilePicture = async () => {
    const userId = JSON.parse(userDetails)._id;
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
   
    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/upload-profile-picture/${userId}`, {
        method: 'POST',
        body: formData,
      });

      const updatedResult = await result.json();
      localStorage.setItem('user', JSON.stringify(updatedResult));
      setProfilePicture(updatedResult.profilePicture);
      // ...
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="section">
          <div className="line"></div>
          Profile
        </div>
        <div className="profile">
        { shouldRender && <div className="profilepic">
            <img className='dp' src={`${process.env.REACT_APP_API_URL}/uploads/profile-pictures/${JSON.parse(userDetails).profilePicture}`} alt="Profile Pic" />
            <div className="Upload">
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
              <button onClick={uploadProfilePicture}>Upload</button>
            </div>
          </div>}
          {!renderForm ? (
            <div className="profile-details">
              <div className="detail">
                Name:
                <div className="detail-ans">{JSON.parse(userDetails).name}</div>
              </div>
              <div className="detail">
                Email:
                <div className="detail-ans">{JSON.parse(userDetails).email}</div>
              </div>
              {JSON.parse(userDetails).address ? (
                <div className="detail">
                  Address:
                  <div className="detail-ans">{JSON.parse(userDetails).address}</div>
                </div>
              ) : (
                <div className="detail">
                  Address:
                  <div className="detail-ans">Not set</div>
                </div>
              )}
              {JSON.parse(userDetails).phoneNumber ? (
                <div className="detail">
                  Phone Number:
                  <div className="detail-ans">{JSON.parse(userDetails).phoneNumber}</div>
                </div>
              ) : (
                <div className="detail">
                  Phone Number:
                  <div className="detail-ans">Not set</div>
                </div>
              )}
              <button onClick={setRender}>Edit Profile</button>
            </div>
          ) : (
            <div className="form-profile">
              <div className="input-container ic1">
                <label>Username:</label>
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={JSON.parse(userDetails).name}
                />
              </div>
              <div className="input-container ic2">
                <label>Email address:</label>
                <input
                  className="input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={JSON.parse(userDetails).email}
                />
              </div>
              <div className="input-container ic2">
                <label>Address:</label>
                <input
                  className="input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={JSON.parse(userDetails).address}
                />
              </div>
              <div className="input-container ic2">
                <label>Phone Number:</label>
                <input
                  className="input"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={JSON.parse(userDetails).phoneNumber}
                />
              </div>
              <div style={{ display: 'flex' }}>
                <button onClick={saveProfileChanges} className="submit but1">
                  SAVE
                </button>
                <button onClick={handleCancel} className="submit but2">
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
