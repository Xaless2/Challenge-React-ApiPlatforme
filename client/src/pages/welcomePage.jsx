
import NavBar from '../components/NavaBar'
import RevealOnScroll from '../components/RevealOnScroll'
import MiddleComponent from '../components/MiddleComponent';
import MapChart from '../components/MapChart';

function WelcomePage() {
    return (
      <>
           <NavBar />
           <MiddleComponent />
        <RevealOnScroll>
            <h2 className='text-center text-3xl mt-24  underline decoration-sky-500'>
             Découvrez nos adresses via la carte
             </h2>
        </RevealOnScroll>


         <RevealOnScroll>
                <div className='mt-24'>
                    <MapChart />
                </div>
                    
        </RevealOnScroll>
    
        </>
       
    );
};

export default WelcomePage;