/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import authService from "../Services/auth.service";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the API
    authService
      .profile(id)
      .then((response) => {
        setUser(response.data);
        setName(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdateProfile = () => {
    let requestBody = { name, profilePhoto };
    // Make PUT request to update the profile
    authService
      .profilePicture(id, requestBody)
      .then(() => {
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
    <div className="profile-page-image"></div>
    <div className="profile-page">
      <h1 style={{ color: "white" }}>Profile</h1>
      {user ? (
        <div>
          <p style={{ color: "white" }}>Name: {user.name}</p>
          <p style={{ color: "white" }}>Email: {user.email}</p>
          <div>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleUpdateProfile}>Update Profile</button>
          </div>
        </div>
      ) : null}
    </div>
    </div>
  );
}

export default ProfilePage;
