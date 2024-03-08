import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <>
            <h1>Page not found</h1>
            <h2>404</h2>
            <Link to="/">Go home</Link>
        </>
    );
}

export default NotFoundPage