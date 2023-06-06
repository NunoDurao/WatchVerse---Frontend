import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Fetch user data from the API
    axios
      .get(`${API_URL}/profile/${id}`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdateProfile = () => {
    // Make PUT request to update the profile
    axios
      .put(
        `${API_URL}/profile/${id}`,
        { name, profilePhoto },
        { withCredentials: true }
      )
      .then((response) => {
        setUser(response.data);
        setName("");
        setProfilePhoto("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <div>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter profile photo URL"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
            />
            <button onClick={handleUpdateProfile}>Update Profile</button>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;
