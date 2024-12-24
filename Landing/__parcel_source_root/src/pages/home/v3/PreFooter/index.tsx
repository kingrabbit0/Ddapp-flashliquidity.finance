import React, { useEffect, useState } from 'react';

const PreFooter = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative z-10 text-center mx-auto mt-24 md:mt-12 sm:mt-12 sm:w-full md:w-full sm:pl-0">
          <div
            className="flex justify-center text-32 mt-4 text-white gotham_font_light sm:text-center md:text-center text-opacity-50 sm:mb-2 md:mb-2"
          >
            More coming soon
          </div>
      </div>
    </div>
  );
};

export default PreFooter;
