import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

   const navigate = useNavigate();

  const handleChange =  (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     try {
      const response = await axios.post('http://localhost:8000/api/auth/login', formData);
      console.log('Giriş başarılı:', response.data);

      // JWT token'ı localStorage'a kaydet
      localStorage.setItem('token', response.data.token);

      // Anasayfaya veya dashboard'a yönlendir
      navigate('/');
    } catch (error) {
      console.error('Giriş hatası:', error.response?.data || error.message);
      alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
    console.log('Giriş form verisi:', formData); // Şimdilik backend yerine burası
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Giriş Yap</button>
    </form>
  );
}

export default LoginForm;