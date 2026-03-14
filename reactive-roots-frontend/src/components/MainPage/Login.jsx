import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { determineLevel } from '../GameInterface/utils/woodcuttingUtils';

const Login = ({ userId, setUserId, onLoginSuccess }) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    // TODO: if user already exists, provide error message

    // TODO: navigate user to home page instead of /game 

    // TODO: add validation for username and password 

    // clear fields 
    useEffect(() => {
        setUsername("");
        setPassword("");
    }, []); // run on component mount 

    async function handleLogin(event) {
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
                
                setUserId(sessionData.userId); // capture userId value from response body
                console.log("Logged in User ID:", sessionData.userId);
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
