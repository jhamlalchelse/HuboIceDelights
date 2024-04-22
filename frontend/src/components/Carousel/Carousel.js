import React from "react";
import { Carousel } from "react-responsive-carousel";

import "./CarouselStyle.css";
import { images } from "./constants";

const CarouselDelights = () => {
  const carouselStyle = {
    axis: "horizontal",
    infiniteLoop: true,
    autoPlay: true,
  };
  return (
    <Carousel className="carousel-container" {...carouselStyle}>
      {images.map((item, index) => {
        return (
          <div key={index} style={{ height: "500px" }}>
            <img
              src={item.url}
              alt={item.alt}
              className="w-full h-full object-fill"
            />
            <div className="legend legend1">
              <h4>{item.heading}</h4>
              <p>{item.para}</p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselDelights;
