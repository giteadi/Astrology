import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-indigo-900 to-purple-900 min-h-screen p-6">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-white mt-12 mb-8">ABOUT US</h2>

      {/* Content Boxes */}
      <div className="flex gap-8 justify-center">
        {/* Card 1 */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white rounded-lg p-4 w-80 h-72 flex flex-col items-center shadow-lg space-y-4">
          {/* Image Placeholder */}
          <div className="w-full h-28 bg-gray-200 rounded-md"></div>
          
          {/* Text Content */}
          <p className="text-white text-xs text-center">
            ALR ALR!!! I've uploaded it on the drive and it's ready to be delivered!! You can proceed with the payments and feel free to add tips if ya want and literally anything around 20-25+ would work haha always happy to work with y'all sarrow members...my team literally made graphics banner rn for immortal.
          </p>
          
          {/* Book Now Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">BOOK NOW</button>
        </div>

        {/* Card 2 */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white rounded-lg p-4 w-80 h-72 flex flex-col items-center shadow-lg space-y-4">
          {/* Image Placeholder */}
          <div className="w-full h-28 bg-gray-200 rounded-md"></div>
          
          {/* Text Content */}
          <p className="text-white text-xs text-center">
            ALR ALR!!! I've uploaded it on the drive and it's ready to be delivered!! You can proceed with the payments and feel free to add tips if ya want and literally anything around 20-25+ would work haha always happy to work with y'all sarrow members...my team literally made graphics banner rn for immortal.
          </p>
          
          {/* Book Now Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">BOOK NOW</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
