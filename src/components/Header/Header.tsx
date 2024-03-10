import { NavLink } from 'react-router-dom';
import './Header.css'

function Header() {

    return (
        <>
            <nav>
                <h2>Medicine Delivery</h2>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Store
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Cart"
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Cart
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Header;