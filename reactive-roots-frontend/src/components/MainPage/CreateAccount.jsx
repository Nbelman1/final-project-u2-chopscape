import { Link } from 'react-router-dom';
import { useState } from 'react';

const CreateAccount = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateAccount = async (event) => {
        event.preventDefault();

        const userData = {
            username: username,
            password: password
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                // TODO: add success message to page 
                console.log("Account created successfully:", data);
            } else {
                // TODO: add error message to page 
                console.log("Registration failed with status:", response.status);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    

    return (
        <>
            <h2>Create Account</h2>

            <form onSubmit={handleCreateAccount}>
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

                <button type='submit'>Create Account</button>
            </form>

        </>
    );
};

export default CreateAccount;
