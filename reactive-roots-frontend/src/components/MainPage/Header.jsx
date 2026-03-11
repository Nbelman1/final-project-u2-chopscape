import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Header = ({ isLoggedIn }) => {
    return (
        <>
            <header>
                <h1>Reactive Roots</h1>
                <NavBar isLoggedIn={isLoggedIn}/>
            </header>
        </>
    );
};

export default Header;
