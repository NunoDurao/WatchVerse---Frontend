import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const {id} = useParams()

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
  }, []);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;
