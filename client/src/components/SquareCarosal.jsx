import React from "react";

const SquareCarousel = () => {
  return (
    <div className="flex justify-around items-center py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-screen-2xl justify-around">
        {[1, 2, 3].map((item) => (  // Three cards
          <div key={item} className="flex flex-col items-center">
            <div className="w-64 h-64 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white font-bold rounded-lg p-6">
              SERVICE {item}
            </div>
            {/* Updated Button */}
            <button className="mt-6 px-8 py-3 bg-indigo-800 text-white rounded-full transition-transform transform hover:scale-105 hover:bg-indigo-900">
              BOOK NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquareCarousel;
