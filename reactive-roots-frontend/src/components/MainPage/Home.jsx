import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
  return (
    <>
      
      {isLoggedIn ? (
        <>
          <Link to='/game'>Play Now</Link>
        </>
      ) : (
        <>
          <Link to='/create-account'>Create Account | </Link>
          <Link to='/login'>Log In</Link>
        </>
      )}

      <p>Success Message (hide this)</p>

      <section>
        <h2>How to Play</h2>
        <ul>
          <li>About</li>
          <li>Instructions</li>
          <li>More Instructions</li>
        </ul>
      </section>
    </>
  );
};

export default Home;
