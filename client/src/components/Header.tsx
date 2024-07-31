import { useAuth } from "../context/AuthContext";
import '../styles/header.css';
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleUserLogout = () => {
        try{
            logout();
            navigate('/login');
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="header">
            <div className="topBar">
                <h1>Good morning, <span>{user?.firstname}</span></h1>
                <div className="content">
                <p>Trello is an advanced task management application designed to help you stay organized and productive.</p>
            </div>
            </div>

            <div className="btnBx">
                <button className="btn btn-tertiary" onClick={handleUserLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Header;
