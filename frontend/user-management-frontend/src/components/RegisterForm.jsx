import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";

function RegisterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      navigate("/login");
    } catch (error) {
      console.error("Kayıt hatası:", error.response?.data || error.message);
      alert("Kayıt başarısız. Lütfen tekrar deneyin.");
    }
  };

  return (
    <FormContainer title="Kayıt Ol">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Kullanıcı Adı"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Kayıt Ol</button>
      </form>
    </FormContainer>
  );
}

export default RegisterForm;
