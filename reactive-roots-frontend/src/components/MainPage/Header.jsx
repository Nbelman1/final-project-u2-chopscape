import NavBar from "./NavBar";

const Header = ({ isLoggedIn }) => {
    return (
        <div>
            <header className="header-container">
                <h1 className="osrs-font-rendering">Reactive Roots</h1>
                <NavBar isLoggedIn={isLoggedIn}/>
            </header>
        </div>
    );
};

export default Header;
