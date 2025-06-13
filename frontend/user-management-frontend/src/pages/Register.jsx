import RegisterForm from "../components/RegisterForm";
import axios from "axios";

function Register() {
  const handleRegister = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", formData);
      alert("Kayıt başarılı!");
    } catch (err) {
      alert("Bir hata oluştu.");
      console.error(err);
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
}

export default Register;
