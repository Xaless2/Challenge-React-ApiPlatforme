
import NavBar from '../components/NavaBar'
import RevealOnScroll from '../components/RevealOnScroll'
import MiddleComponent from '../components/MiddleComponent';
import CartdInfo from '../components/CartdInfo';

function WelcomePage() {
    return (
      <>
           <NavBar />
           <MiddleComponent />
           <div className="">
            <RevealOnScroll>
              <h2 className='text-center text-3xl mt-12'>Nos informations</h2>
            </RevealOnScroll>
            <RevealOnScroll>
              <CartdInfo />
            </RevealOnScroll>
            <RevealOnScroll>
            <CartdInfo />
            </RevealOnScroll>
            <RevealOnScroll>
            <CartdInfo />
            </RevealOnScroll>
            <RevealOnScroll>
                <p className="text-3xl h-[15em] mt-[10em]">
                    Learn Android Development
                </p>
            </RevealOnScroll>
            <RevealOnScroll>
                <p className="text-3xl h-[15em] mt-[10em]">
                    Learn Data Structures and Algorithms
                </p>
            </RevealOnScroll>
            <RevealOnScroll>
                <p className="text-3xl h-[15em] mt-[10em]">
                    and more...
                </p>
            </RevealOnScroll>
        </div></>
       
    );
};

export default WelcomePage;