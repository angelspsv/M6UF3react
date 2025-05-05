import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
    return (
      <>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signin">Signin</Link>
                </li>
            </ul>
        </nav>
  
        <Outlet />
      </>
    )
};

export default Layout;