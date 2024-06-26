import React from "react";

const Loader = ({ show }) => {
  return (
    <>
      {show && (
        <div className="absolute inset-0
        flex items-center justify-center dark:bg-black h-full">
          <div
            className="animate-spin rounded-full h-32 w-32 border-t-10 border-b-4 
          border-sky-600 dark:border-emerald-300"
          ></div>
        </div>
      )}
    </>
  );
};

export default Loader;
