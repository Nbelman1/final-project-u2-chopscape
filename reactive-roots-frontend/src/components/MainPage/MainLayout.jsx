import { Outlet } from 'react-router-dom';
import Header from "./Header";
import Footer from './Footer';

// render pages with both Header and Footer
const MainLayout = ({ isLoggedIn }) => {
    return (
        <>
          <Header isLoggedIn={isLoggedIn}/>
          {/* changes which component is rendered based on Route */}
          <Outlet /> 
          <Footer />
        </>
    );
};

export default MainLayout;
