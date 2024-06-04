import React from 'react';
import Slider from "react-slick";

function CartdInfo() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="flex flex-col h-screen">
      <Slider {...settings}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white"
          >
            <div className="w-full md:w-1/3 bg-white grid ">
              <img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" class="rounded-xl" />
            </div>
            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
              
              <h2 className="text-xl font-bold">Nom du coach</h2>
              <p className="text-sm">Description du coach</p>
              <p className="text-sm">Adresse du coach</p>
              <p className="text-sm">Téléphone du coach</p>
              <p className="text-sm">Email du coach</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}


export default CartdInfo;