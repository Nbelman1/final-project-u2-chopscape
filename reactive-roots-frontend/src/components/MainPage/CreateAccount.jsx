import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CreateAccount = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    async function checkUsernameAvailability(username) {
        try {
            const response = await fetch(`http://localhost:8080/api/users/exists/${username}`);

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const isTaken = await response.json();
            return isTaken;
        } catch (error) {
            return true;
        }
    }

    async function validateForm(formData) {
        let tempErrors = {};

        // alphanumeric, hyphens, and underscores only
        const usernameRegex = /^[a-zA-Z0-9-_]+$/;

        if (!formData.username) {
            tempErrors.username = "Username is required.";
        } else if (formData.username.length < 3) {
            tempErrors.username = "Username must be at least 3 characters long.";
        } else if (formData.username.length > 12) {
            tempErrors.username = "Username must be 12 characters or less.";
        } else if (!usernameRegex.test(formData.userData)) {
            tempErrors.username = "Only letters, numbers, -, and _ allowed.";
        }

        if (!formData.password) {
            tempErrors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            tempErrors.password = "Password must be at least 8 characters long.";
        } else if (formData.password.length > 20) {
            tempErrors.password = "Password must be 20 characters or less.";
        }

        if (!tempErrors.username) {
            const isTaken = await checkUsernameAvailability(formData.username);
            if (isTaken) {
                tempErrors.username = "That username is already taken.";
            }
        }

        // if no errors, display no message
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }

    async function handleCreateAccount(event) {
        event.preventDefault();

        const formData = { username, password };
        const isValid = await validateForm(formData);

        const userData = {
            username: username,
            password: password
        }

        if (isValid) {
            // hash password and POST to backend
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            // return to Home, display success message
            if (response.ok) {
                navigate('/', { state : { message: "Account created! Welcome to Reactive Roots." } });
            }
        }
    };

    
    return (
        <div className='login-page-wrapper'>
            <h2>Create Account</h2>

            <form onSubmit={handleCreateAccount} className='form-container'>
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
                    <button type='submit' className='osrs-button'>Create Account</button>
                </div>

            </form>

        </div>
    );
};

export default CreateAccount;
