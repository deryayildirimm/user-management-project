import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import {jwtDecode} from 'jwt-decode';
import FormContainer from '../components/FormContainer';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

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
      const token = response.data.access_token;

     login(token);

      console.log('Giriş başarılı:', response.data);

      const decoded = jwtDecode(token);
      console.log("decoded veri" , decoded);
      const role = decoded.role;

      // role'e göre yönlendirme
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Giriş hatası:', error.response?.data || error.message);
      alert("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
    console.log('Giriş form verisi:', formData); 
  };

  return (
     <FormContainer title="Giriş Yap">
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
    </FormContainer>
  );
}

export default LoginForm;