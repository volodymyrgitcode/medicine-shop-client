import { Link, Outlet } from "react-router-dom";
import './Navbar.css'

function Navbar() {

    return (
        <>
            <nav>
                <h2>Medicine Delivery app</h2>
                <ul>
                    <li><Link to={"/"}>Store</Link></li>
                    <li><Link to={"/cart"}>Cart</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;