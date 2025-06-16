import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import "./Profile.css";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Profil yüklenemedi", err));
  }, []);

  if (!user) return <p>Yükleniyor...</p>;

  return (
    <div className="profile-container">
      <h2>Profil</h2>
      <UserCard user={user} />
    </div>
  );
}

export default Profile;
