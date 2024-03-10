import { useNavigate } from "react-router-dom";
import './NotFound.css';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="notfound-container">
            <h1>404 - Page Not Found</h1>
            <p>The page you're trying to reach doesn't exist.</p>

            <button className="button-primary" onClick={() => navigate('/')}>
                GO HOME
            </button>
        </div>
    );
}

export default NotFound