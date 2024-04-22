import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/images/img1.jpeg';
import img2 from '../../assets/images/img2.jpeg';
import img3 from '../../assets/images/img3.jpeg';
import './CarouselStyle.css';

const CarouselDelights = () => {
  const carouselStyle = {
    axis: 'vertical',
    infiniteLoop: true,
    autoPlay: true,
  };
  return (
    <Carousel className="carousel-container" {...carouselStyle}>
      <div style={{ height: '500px' }}>
        <img src={img1} alt="legend 1" className="w-full h-full object-fill" />
        <div className="legend legend1">
          <h4>Heading</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, nihil!</p>
        </div>
      </div>
      <div style={{ height: '500px' }}>
        <img src={img2} alt="legend 2" className="w-full h-full object-fill" />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div style={{ height: '500px' }}>
        <img src={img3} alt="legend 3" className="w-full h-full object-fill" />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
};

export default CarouselDelights;
