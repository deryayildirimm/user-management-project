import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile() {
  // const { id } = useParams();
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
      <h2>Profil Bilgileri</h2>
      <p>
        <strong>Kullanıcı Adı:</strong> {user.userName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Rol:</strong> {user.role}
      </p>
    </div>
  );
}

export default Profile;
