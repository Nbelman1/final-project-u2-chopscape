const LogoutMenu = ({ onLogout }) => {
    return (
        <div className="centered">  
            <h3>Thank you for playing Reactive Roots.</h3>
            <p>We'll see you next time!</p>
            <button 
                className="logout-container delete-button" 
                onClick={onLogout}
                >Click here to logout
            </button>
        </div>
    );
};

export default LogoutMenu;
