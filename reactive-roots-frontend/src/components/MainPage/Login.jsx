import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ isLoggedIn, setIsLoggedIn, onLoginSuccess }) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    // clear fields 
    useEffect(() => {
        setUsername("");
        setPassword("");
    }, []); // run on component mount 

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            
            if (response.ok) {
                const sessionData = await response.json();

                onLoginSuccess(sessionData);

                navigate("/game");

            } else {
                // TODO: add error message to page
            }
        } catch (error) {
            console.log('Connection error:', error);
            // TODO: add error message to page 
        }

    }
    
    return (
        <>
            <h2>Log In</h2>

            <form onSubmit={handleLogin}>
                <fieldset>
                <legend>Enter info</legend>

                <label htmlFor="username">Username: </label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />

                <label htmlFor="password"> Password: </label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </fieldset>

                <button type='submit'>Log In</button>
            </form>

        </>
    );
};

export default Login;
