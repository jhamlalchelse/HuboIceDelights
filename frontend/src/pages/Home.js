import React from "react";
import CarouselDelights from "../components/Carousel/Carousel";
import Card from "../components/Card/Card";

const Home = () => {
  return (
    <div>
      <div className="bg-fuchsia-100">
        <CarouselDelights />
      </div>
      <div className="bg-pink-200 p-5">
        <div className="grid grid-cols-2 items-center my-5">
          <p className="text-3xl font-semibold font-serif w-72">
            Explore Our Best Categories
          </p>
          <p className="ms-16 text-sm float-right">
            Spartan Community, Evince Has Established Its Steeping Pillars of
            Commitments, Ethics,Disrupting the Market with a decade of
            Experience and A Dauntless Motto of Integrity, Innovation, and a
            Strategical Approach.
          </p>
        </div>
        <Card />
      </div>
    </div>
  );
};

export default Home;
