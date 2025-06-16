import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./UserDetail.css";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Gelen kullanıcı:", res.data);
        setUser(res.data);
      })
      .catch((err) => console.error("Kullanıcı detayı alınamadı", err));
  }, [id, token]);

  if (!user) return <p>Yükleniyor...</p>;

  console.log(user);

  return (
    <div className="user-detail-container">
      <h2>Kullanıcı Detay</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
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
};

export default UserDetail;
