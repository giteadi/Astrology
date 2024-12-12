import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe for the bubble animation coming from bottom to top
const bubbleAnimation = keyframes`
  0% {
    transform: scale(0);
    bottom: 10px;
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    bottom: 30px;
    opacity: 0.6;
  }
  100% {
    transform: scale(3);
    bottom: 60px;
    opacity: 0;
  }
`;

// Styled Button with bubble animation and navy blue gradient
const Button = styled.button`
  position: relative;
  padding: 12px 24px;
  background: linear-gradient(45deg, #1e3a8a, #3b82f6); /* Navy blue gradient */
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #3b82f6, #1e3a8a);
  }

  /* Bubble animation inside the button */
  &::after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    width: 15px;
    height: 15px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: ${bubbleAnimation} 1.5s ease-out infinite;
  }
`;

// Styled Bubble element with random position and animation
const Bubble = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.4;
  animation: ${bubbleAnimation} 5s ease-in-out infinite;
  width: ${(props) => `${props.size}px`}; /* Use passed size */
  height: ${(props) => `${props.size}px`}; /* Use passed size */
  left: ${(props) => `${props.left}%`};
  bottom: ${(props) => `${props.bottom}%`};
  animation-delay: ${(props) => `${props.delay}s`};
`;

// Function to generate random bubbles inside the button
const generateRandomBubbles = (count = 6) => {
  return Array.from({ length: count }).map(() => ({
    size: Math.random() * 15 + 5, // Random size
    left: Math.random() * 100, // Random left position
    bottom: Math.random() * 100, // Random bottom position
    delay: Math.random() * 2, // Random animation delay
  }));
};

const AboutUs = () => {
  const randomBubbles = generateRandomBubbles(); // Generate random bubbles

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-transparent">
      <h2 className="text-5xl font-bold text-white mt-16 mb-12">ABOUT US</h2>

      {/* Flexbox Layout with Justify-Around */}
      <div className="flex flex-wrap justify-around gap-12 w-full max-w-screen-xl">
        {/* Card 1 */}
        <div
          className="w-full max-w-[25rem] bg-transparent border-2 border-purple-600 rounded-lg shadow-xl p-6 flex flex-col items-center gap-4 backdrop-blur-lg backdrop-opacity-30 backdrop-brightness-125 focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all transform hover:scale-105 relative"
          tabIndex={0} // Enables focus for accessibility
        >
          <div className="w-full h-40 bg-gradient-to-r from-purple-600 via-violet-500 to-blue-500 rounded-md"></div>
          <p className="text-white text-center text-sm mt-4">
            ALR ALR!!! I've uploaded it on the drive and it's ready to be delivered!! You
            can proceed with the payments and feel free to add tips if ya want and
            literally anything around 20-25+ would work haha always happy to work with
            y'all sarrow members...my team literally made graphics banner rn for
            immortal.
          </p>
          {/* Updated Button with bubble effect */}
          <Button className="mt-6">
            {/* Render random bubbles inside the button */}
            {randomBubbles.map((bubbleProps, index) => (
              <Bubble key={index} {...bubbleProps} />
            ))}
            BOOK NOW
          </Button>

          {/* Diagonal White Border */}
          <div className="absolute inset-0 bg-white opacity-10 transform rotate-45 rounded-lg"></div>
        </div>

        {/* Card 2 */}
        <div
          className="w-full max-w-[25rem] bg-transparent border-2 border-purple-600 rounded-lg shadow-xl p-6 flex flex-col items-center gap-4 backdrop-blur-lg backdrop-opacity-30 backdrop-brightness-125 focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all transform hover:scale-105 relative"
          tabIndex={0} // Enables focus for accessibility
        >
          <div className="w-full h-40 bg-gradient-to-r from-purple-600 via-violet-500 to-blue-500 rounded-md"></div>
          <p className="text-white text-center text-sm mt-4">
            ALR ALR!!! I've uploaded it on the drive and it's ready to be delivered!! You
            can proceed with the payments and feel free to add tips if ya want and
            literally anything around 20-25+ would work haha always happy to work with
            y'all sarrow members...my team literally made graphics banner rn for
            immortal.
          </p>
          {/* Updated Button with bubble effect */}
          <Button className="mt-6">
            {/* Render random bubbles inside the button */}
            {randomBubbles.map((bubbleProps, index) => (
              <Bubble key={index} {...bubbleProps} />
            ))}
            BOOK NOW
          </Button>

          {/* Diagonal White Border */}
          <div className="absolute inset-0 bg-white opacity-10 transform rotate-45 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
