import { Link , useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Navbar.css';

function Navbar() {

    const { isAuthenticated, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };


    return(

    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
      </div>
      <div className="nav-right">
        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/profile">Profile</Link>
            {role === "admin" && <Link to="/admin">Admin Panel</Link>}
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>

    );
    
}

export default Navbar;