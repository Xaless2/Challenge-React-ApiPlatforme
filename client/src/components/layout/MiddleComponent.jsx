import React from 'react'
import './components.css'
import RevealOnScroll from '../common/RevealOnScroll'

function MiddleComponent() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
    }
  return (
  <>
    <div className='background '> 

            <div className='container'>

                <div className="flex flex-col p-2 py-6 m-h-screen">
     
                        <h1 className="text-3xl font-bold text-center text-white mt-48 ml-24" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Trouvez un coach sportif près de chez vous</h1>
                            <p className='text-center text-white ml-24 underline decoration-sky-500'   style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Prenez rendez-vous pour une séance d'entraînement personnalisée</p>

                        <RevealOnScroll>
                            <div className="items-center justify-between  flex shadow-lg p-2 mb-5 sticky" style={style}>

                                <div>

                                    <div className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">

                                        <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                                        </svg>

                                    </div>

                                </div>

                                <input className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs" type="text" placeholder="Search"/>

                                    <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">

                                        <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                        </svg>

                                    </div>

                                </div>
                        </RevealOnScroll>        
                </div>
                
            </div>
    </div>
  </>
  )
}

export default MiddleComponent