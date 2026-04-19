import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import About from './About';
import BeginnerTips from './BeginnerTips';
import HowToPlay from './HowToPlay';

const Home = ({ isLoggedIn  }) => {

  const location = useLocation();

  const [activeTab, setActiveTab] = useState('about');

  function renderContent() {
    switch (activeTab) {
      case 'about': return <About element={About} />;
      case 'how-to-play': return <HowToPlay element={HowToPlay} />;
      case 'beginner-tips': return <BeginnerTips element={BeginnerTips} />;
    }
  }

  return (
    <>
      
      {isLoggedIn ? (
        <div className='cta-button-container'>
          <Link to='/game' className='osrs-button'>Play Now </Link>
        </div>
      ) : (
        <div className='cta-button-container'>
          <Link to='/create-account' className='osrs-button'>Create Account </Link>
          <Link to='/login' className='osrs-button'>Log In</Link>
        </div>
      )}

      {location.state?.message && (
        <div className='success-msg-container'>
          <p className='success-message'>{location.state.message}</p>
        </div>
      )}
      
      <div className='tabs-wrapper'>
        <div className='tabs-nav'>
          <button 
            onClick={() => setActiveTab('about')}
            className={activeTab === 'about' ? 'tab-btn active' : 'tab-btn'}
          >
            About
          </button>

          <button 
            onClick={() => setActiveTab('how-to-play')}
            className={activeTab === 'about' ? 'tab-btn active' : 'tab-btn'}
          >
            How to Play
          </button>

          <button 
            onClick={() => setActiveTab('beginner-tips')}
            className={activeTab === 'about' ? 'tab-btn active' : 'tab-btn'}
          >
            Beginner Tips
          </button>
        </div>

        <div className='tabs-content-box'>
          {renderContent()}
        </div>
      </div>

      <section className='disclaimer-container'>
        <h2>Disclaimer</h2>
        <ul>
          <li>
            This project was created for purely educational purposes and is not in any way affiliated with Jagex, the creators of RuneScape.
          </li>
        </ul>
      </section>
      
    </>
  );
};

export default Home;
