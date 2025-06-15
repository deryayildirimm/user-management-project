import { Link , useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { isAuthenticated, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };


    return(

    <nav>
      <Link to="/">Home</Link>

      {!isAuthenticated && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {isAuthenticated && (
        <>
          {role === "admin" && <Link to="/admin">Admin Panel</Link>}
          {role === "user" && <Link to="/profile">My Profile</Link>}
          <Link to="/secret">Secret Page</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>

    );
    
}

export default Navbar;