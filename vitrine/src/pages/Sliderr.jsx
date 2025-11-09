import React from 'react';
import './Sliderr.css'; // Replace with the correct path to your CSS file

const Sliderr = () => {
  return (
    <div className='my-container my-container-center my-container-padding'>
      <div className='my-image-container my-relative'>
        {/* Image */}
        
        <img
          className='my-image'
          src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="/"
        />

        {/* Overlay */}
        <div className='my-absolute w-full h-full my-top-0 my-left-0 my-overlay-color my-overlay-bg my-flex my-flex-col my-justify-center'>
          <h1 className='px-4 my-text-4xl my-font-bold'>
            The <span className='text-orange-500'>Best</span>
          </h1>
          <h1 className='px-4 my-text-4xl my-font-bold'>
            <span className='text-orange-500'>Foods</span> Delivered
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sliderr;
