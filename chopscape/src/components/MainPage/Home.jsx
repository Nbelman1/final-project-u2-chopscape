import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>  
          <Link to='/create-account'>Create Account </Link>
          <br></br>
          <Link to='/login'>Play</Link>

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
