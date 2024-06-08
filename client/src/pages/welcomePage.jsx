
import NavBar from '../components/layout/NavaBar'
import RevealOnScroll from '../components/common/RevealOnScroll'
import MiddleComponent from '../components/layout/MiddleComponent';
import MapChart from '../components/common/MapChart';

import Footer from '../components/layout/Footer';
import CartdInfo from '../components/common/CartdInfo';



function WelcomePage() {
    return (
      <>
           <NavBar />
           <MiddleComponent />

           <RevealOnScroll>
            <div className='mt-12 text-center'>
            <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-black underline decoration-sky-500">Sysyteme de la carte map </h2>
            </div>

           </RevealOnScroll>
        <RevealOnScroll>
        <div className="mb-12 space-y-2 text-center mt-24">
        <p className="text-gray-600 dark:text-black lg:mx-auto lg:w-6/12">
        Découvrez nos addresse via la carte 
        </p>
      </div>
        </RevealOnScroll>


         <RevealOnScroll>
                <div className='mt-4'>
                    <MapChart />
                </div>
                    
        </RevealOnScroll>
    <RevealOnScroll>
   <div className="mb-12 space-y-2 text-center mt-4">
        <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-white">Sharing is Caring</h2>
        <p className="text-gray-600 dark:text-black lg:mx-auto lg:w-6/12">
          Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum
          officia aliquid explicabo? Excepturi, voluptate?
        </p>
      </div>
      <RevealOnScroll>
            <CartdInfo />
        </RevealOnScroll>
     </RevealOnScroll>
        
        <div className='mt-24'>
        <Footer />
        </div>

        </>
       
    );
};

export default WelcomePage;