import React from 'react';
import CarouselDelights from '../components/Carousel/Carousel';

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
        <div className="grid grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item, index) => {
            return (
              <div
                key={index}
                className="bg-pink-200 rounded-md shadow-xl border border-pink-300"
              >
                <div className="h-52 bg-slate-400 rounded-t-md"></div>
                <div className="px-1 pb-1">
                  <p className="text-xl uppercase font-medium font-serif mt-1">
                    chocolate
                  </p>
                  <p className="my-1">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. At
                    quia quae iure dolorem suscipit, vero voluptatem provident
                    reprehenderit sunt deleniti.
                  </p>
                  <button className="bg-red-500 py-0,5 px-3 rounded-sm my-1 text-white font-serif">
                    visit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
