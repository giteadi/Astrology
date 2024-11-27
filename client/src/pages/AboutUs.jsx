import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-transparent">
      <h2 className="text-5xl font-bold text-white mt-16 mb-12">ABOUT US</h2>

      {/* Flexbox Layout with Justify-Around */}
      <div className="flex flex-wrap justify-around gap-12 w-full max-w-screen-xl">
        {/* Card 1 */}
        <div
          className="w-full max-w-[25rem] bg-transparent border-2 border-purple-700 rounded-lg shadow-md p-6 flex flex-col items-center gap-4 
          focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all"
          tabIndex={0} // Enables focus for accessibility
        >
          <div className="w-full h-40 bg-gray-300 rounded-md"></div>
          <p className="text-white text-center text-sm">
            ALR ALR!!! I've uploaded it on the drive and it's ready to be delivered!! You
            can proceed with the payments and feel free to add tips if ya want and
            literally anything around 20-25+ would work haha always happy to work with
            y'all sarrow members...my team literally made graphics banner rn for
            immortal.
          </p>
          <button
            className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-600 transition-all focus:outline-none focus:ring-4 focus:ring-purple-500"
          >
            BOOK NOW
          </button>
        </div>

        {/* Card 2 */}
        <div
          className="w-full max-w-[25rem] bg-transparent border-2 border-purple-700 rounded-lg shadow-md p-6 flex flex-col items-center gap-4 
          focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all"
          tabIndex={0} // Enables focus for accessibility
        >
          <div className="w-full h-40 bg-gray-300 rounded-md"></div>
          <p className="text-white text-center text-sm">
            ALR ALR!!! I've uploaded it on the drive and it's ready to be delivered!! You
            can proceed with the payments and feel free to add tips if ya want and
            literally anything around 20-25+ would work haha always happy to work with
            y'all sarrow members...my team literally made graphics banner rn for
            immortal.
          </p>
          <button
            className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-600 transition-all focus:outline-none focus:ring-4 focus:ring-purple-500"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
