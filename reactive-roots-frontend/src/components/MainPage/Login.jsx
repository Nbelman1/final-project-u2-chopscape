import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './apiConfig';

const Login = ({ onLoginSuccess }) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    // clear fields on component mount
    useEffect(() => {
        setUsername("");
        setPassword("");
    }, []); 

    async function validateLoginForm(formData) {
        let tempErrors = {};

        if (!formData.username.trim()) {
            tempErrors.username = "Username is required.";
        }
        if (!formData.password.trim()) {
            tempErrors.password = "Password is required.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }

    async function handleLogin(event) {
        event.preventDefault();

        const formData = { username, password };
        const isValid = await validateLoginForm(formData);
        if (!isValid) return; // stop if fields are empty 

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                const sessionData = await response.json();

                const completeData = {
                    ...sessionData,
                    username: username
                };
                onLoginSuccess(completeData);
                navigate('/', { state : { message: `Welcome back, ${username}!` } });
            } else {
                setErrors({ form: "Invalid username or password." });
            }
        } catch (error) {
            setErrors({ form: "Could not connect to server." });
        }
    }

    return (
        <div className='login-page-wrapper forest-bg'>
            <div className='login-box'>
                <h2 className='centered'>Welcome to Reactive Roots</h2>

                {/* error message only renders if there is an error */}
                {errors.form && <p className='error-message'>{errors.form}</p>}

                <form onSubmit={handleLogin} className='form-container'>
                    <fieldset>
                        <legend>Enter info</legend>

                        <label htmlFor="username">Username: </label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='input-color'
                        />
                        {errors.username && <p className='error-message'>{errors.username}</p>}

                        <label htmlFor="password"> Password: </label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className='input-color' 
                        />
                        {errors.password && <p className='error-message'>{errors.password}</p>}

                    </fieldset>

                    <div className='cta-button-container'>
                        <button type='submit' className='osrs-button'>Log In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
