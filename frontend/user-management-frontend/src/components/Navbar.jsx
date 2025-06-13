import { Link } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

function Navbar() {

    return(
        <nav>
            <Link to="/"> Home</Link>
            <Link to="/login">Login</Link>
             <Link to="/register">Register</Link>
        </nav>
    )
    
}

export default Navbar;