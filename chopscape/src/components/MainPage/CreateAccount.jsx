const CreateAccount = () => {
  return (
    <>
      <h2>Create Account</h2>

      <p>Failure message (hide this)</p>

      <fieldset>
        <legend>Enter info</legend>

        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" placeholder="TreeChopper99" required />

        <label htmlFor="username"> Password: </label>
        <input type="password" id="password" name="password" placeholder="***" required />
      </fieldset>

      <button>Reset</button>
      <button>Create Account</button>
      
    </>
  );
};

export default CreateAccount;
