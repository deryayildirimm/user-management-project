import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Admin.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/users") // endpoint backend'de senin yapına göre güncellenir
      .then(res => setUsers(res.data))
      .catch(err => console.error("Kullanıcılar alınamadı", err));
  }, []);

  const handleClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <div className="admin-panel">
      <h2>Kullanıcı Listesi</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı Adı</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => handleClick(user.id)}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Admin;
