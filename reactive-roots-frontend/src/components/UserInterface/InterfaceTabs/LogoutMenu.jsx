const LogoutMenu = ({ onLogout }) => {
    return (
        <>
            <h2>Thank you for playing Reactive Roots.</h2>
            <p>We'll see you next time!</p>
            <button 
                className="logout-container" 
                onClick={onLogout}
                >Click here to logout
            </button>
        </>
    );
};

export default LogoutMenu;
