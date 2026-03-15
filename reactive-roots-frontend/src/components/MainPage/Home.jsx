import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Home = ({ isLoggedIn, userId }) => {

  const location = useLocation();

  // const showMessage = location.state?.showSuccess;

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

      {location.state?.message && (
        <p className='success-message'>{location.state.message}</p>
      )}
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
