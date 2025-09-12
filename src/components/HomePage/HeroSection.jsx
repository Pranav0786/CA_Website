import React from "react";

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full  bg-gray-900 flex justify-center text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-800 to-gray-900 opacity-90 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center mt-20">
        <h1 className="text-2xl md:text-2xl font-bold leading-tight">
          The world of finance
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-400 mt-4">
          In your pocket
        </h2>
      </div>

      {/* Mockup Devices */}
      <div className="absolute bottom-10 w-full flex justify-center gap-6 px-4 md:px-8 z-10">
        {/* Phone 1 */}
        <div className="w-64 h-128 bg-gray-800 rounded-3xl p-4 shadow-lg relative">
          <div className="bg-gray-700 h-10 w-full rounded-lg"></div>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Discover</span>
              <div className="h-4 w-4 bg-red-500 rounded-full"></div>
            </div>
            <div className="bg-gray-600 h-6 w-full rounded-md"></div>
            <div className="bg-gray-600 h-20 w-full rounded-md"></div>
          </div>
        </div>

        {/* Phone 2 */}
        <div className="w-64 h-128 bg-gray-800 rounded-3xl p-4 shadow-lg relative hidden md:block">
          <div className="bg-gray-700 h-10 w-full rounded-lg"></div>
          <div className="mt-4 bg-gray-600 h-32 w-full rounded-md"></div>
          <div className="mt-4 bg-gray-600 h-10 w-full rounded-md"></div>
        </div>

        {/* Phone 3 */}
        <div className="w-64 h-128 bg-gray-800 rounded-3xl p-4 shadow-lg relative">
          <div className="bg-gray-700 h-10 w-full rounded-lg"></div>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Discover</span>
              <div className="h-4 w-4 bg-red-500 rounded-full"></div>
            </div>
            <div className="bg-gray-600 h-6 w-full rounded-md"></div>
            <div className="bg-gray-600 h-20 w-full rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
