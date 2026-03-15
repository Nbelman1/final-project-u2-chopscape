import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from './Footer';

// render pages with both Header and Footer
const MainLayout = ({ isLoggedIn }) => {
    return (
        <div className='main-page-container'>
          <Header isLoggedIn={isLoggedIn}/>

          {/* changes which component is rendered based on Route */}
          <main className='main-content'>
            <Outlet />
          </main> 
          
          <Footer />
        </div>
    );
};

export default MainLayout;
