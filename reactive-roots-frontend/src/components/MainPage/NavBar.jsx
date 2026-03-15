import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn }) => {
  return (
    <>
      <nav className="nav-container">
        <Link to='/'>Home </Link>

          {isLoggedIn ? (
            <>
              <Link to='/game'>Play </Link>
              <Link to='/settings'>Settings </Link>
            </>
          ) : (
            <>
              <Link to='/create-account'>Create Account </Link>
              <Link to='/login'>Log In </Link>
            </>
          )}

      </nav>
    </>
  );
};

export default NavBar;
