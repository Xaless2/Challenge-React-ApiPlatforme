
import NavBar from '../components/NavaBar'
import RevealOnScroll from '../components/RevealOnScroll'
import MiddleComponent from '../components/MiddleComponent';
import CartdInfo from '../components/CartdInfo';
import MapChart from '../components/MapChart';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function WelcomePage() {
    return (
      <>
           <NavBar />
           <MiddleComponent />
        <RevealOnScroll>
            <h2 className='text-center text-3xl mt-24'>
             Découvrez nos adresses via la carte
             </h2>
        </RevealOnScroll>


         <RevealOnScroll>
                <div className='mt-24'>
                    <MapChart />
                </div>
                    
        </RevealOnScroll>
     
     <RegisterPage />
        </>
       
    );
};

export default WelcomePage;