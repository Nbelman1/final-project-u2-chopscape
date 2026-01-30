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

            <button>Log In</button>
        </>
    );
};

export default Login;
