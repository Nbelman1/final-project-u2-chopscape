import { Link } from 'react-router-dom';
import NavBar from "./NavBar";

const Header = ({ isLoggedIn }) => {
    return (
        <div>
            <header className="header-container">
                <Link to='/'>
                    <h1 className="osrs-font-rendering">Reactive Roots</h1>
                </Link>
                <NavBar isLoggedIn={isLoggedIn}/>
            </header>
        </div>
    );
};

export default Header;
