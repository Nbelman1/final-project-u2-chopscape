import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <h2>Log In</h2>
            <fieldset>
              <legend>Enter info</legend>

              <label htmlFor="username">Username: </label>
              <input type="text" id="username" name="username" placeholder="TreeChopper99" required />

              <label htmlFor="username"> Password: </label>
              <input type="password" id="password" name="password" placeholder="***" required />
            </fieldset>

            {/* TODO: add onClick to button to validate account */}
            <button>Log In</button>
            <br></br>
            <Link to='/game'>(if accountValid === true)</Link>
        </>
    );
};

export default Login;
