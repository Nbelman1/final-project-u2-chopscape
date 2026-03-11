import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn }) => {
    return (
        <>
            <nav>
                <Link to='/'>Home | </Link>

                {isLoggedIn ? (
                  <>
                    <Link to='/game'>Play | </Link>
                    <Link to='/settings'>Settings</Link>
                    <p>Log out</p>
                  </>
                ) : (
                  <>
                    <Link to='/login'>Login | </Link>
                    <Link to='/create-account'>Create Account</Link>
                  </>
                )}

            </nav>
        </>
    );
};

export default NavBar;
