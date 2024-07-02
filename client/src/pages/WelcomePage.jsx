import React from 'react';
import RevealOnScroll from '../components/common/RevealOnScroll';
import MiddleComponent from '../components/layout/MiddleComponent';
import MapChart from '../components/common/MapChart';
import Footer from '../components/layout/Footer';
import CartdInfo from '../components/common/CartdInfo';
import NavBar from '../components/layout/NavBar';

export default function WelcomePage() {
    return (
        <>
        <NavBar />
         <div>
        
        <MiddleComponent />

        <RevealOnScroll>
            <div className='mt-12 text-center'>
                <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-black underline decoration-sky-500">
                    Syteme de la carte map
                </h2>
            </div>
        </RevealOnScroll>

        <RevealOnScroll>
            <div className="mb-12 space-y-2 text-center mt-24">
                <p className="text-gray-600 dark:text-black lg:mx-auto lg:w-6/12">
                    Découvrez nos adresses via la carte
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
        <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-white">
          Réservez vos séances de sport dès aujourd'hui
        </h2>
        <p className="text-gray-600 dark:text-black lg:mx-auto lg:w-6/12">
          Découvrez une nouvelle façon de rester actif et en forme avec notre plateforme de réservation de séances de sport. Que vous recherchiez des cours en salle, des sessions d'entraînement personnalisé ou des activités en plein air, nous avons ce qu'il vous faut.
          Réservez facilement vos séances préférées, gérez votre emploi du temps et suivez vos progrès, le tout depuis votre appareil.
        </p>
      </div>
            <RevealOnScroll>
                <CartdInfo />
            </RevealOnScroll>
        </RevealOnScroll>

        <div className='mt-24'>
            <Footer />
        </div>
    </div>
    </>
      
        
    );
};


