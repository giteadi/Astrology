import React from "react";
import styled from "styled-components";

// Custom Card Styled Component with Gradient Border, Blur Effect, and Shadow
const PremiumCard = styled.div`
  width: 100%; /* Allow the card to take full width */
  height: auto; /* Allow height to adjust */
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  border-radius: 1rem;
  border: 3px solid transparent; /* Transparent border initially */
  background-image: linear-gradient(to right, #6a0dad, #3a0078), linear-gradient(to right, #6a0dad, #3a0078); /* Gradient border */
  background-origin: border-box; /* Ensures the gradient affects the border */
  background-clip: content-box, border-box; /* Prevents the background from affecting content */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem; /* Spacing between content */
  backdrop-filter: blur(10px); /* Subtle blur effect for background */

  /* Adjust card height on smaller screens */
  @media (max-width: 640px) {
    padding: 1rem; /* Reduce padding on smaller screens */
    height: auto; /* Allow content to fit within card */
    gap: 1rem; /* Reduce gap between content for mobile */
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 16rem; /* Default height */
  background: #e0e0e0; /* Light gray background for image placeholder */
  border-radius: 1rem; /* Rounded corners for image container */
  
  /* Responsive height adjustments */
  @media (max-width: 640px) {
    height: 8rem; /* Smaller height for mobile */
  }
`;

const CardText = styled.p`
  color: #ffffff; /* White text for readability */
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #6a0dad;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.3s;
  
  &:hover {
    background-color: #5a0071;
    transform: scale(1.05);
  }
`;

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <h2 className="text-5xl font-bold text-white mt-16 mb-12">ABOUT US</h2>

      {/* Grid Layout for Responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-screen-xl">
        {/* Card 1 */}
        <PremiumCard>
          <CardImage />
          <CardText>
            ALR ALR!!! I've uploaded it on the drive and it's ready to be delivered!!
            You can proceed with the payments and feel free to add tips if ya want and
            literally anything around 20-25+ would work haha always happy to work with
            y'all sarrow members...my team literally made graphics banner rn for immortal.
          </CardText>
          <Button>BOOK NOW</Button>
        </PremiumCard>

        {/* Card 2 */}
        <PremiumCard>
          <CardImage />
          <CardText>
            ALR ALR!!! I've uploaded it on the drive and it's ready to be delivered!!
            You can proceed with the payments and feel free to add tips if ya want and
            literally anything around 20-25+ would work haha always happy to work with
            y'all sarrow members...my team literally made graphics banner rn for immortal.
          </CardText>
          <Button>BOOK NOW</Button>
        </PremiumCard>

        {/* Card 3 */}
        <PremiumCard>
          <CardImage />
          <CardText>
            ALR ALR!!! I've uploaded it on the drive and it's ready to be delivered!!
            You can proceed with the payments and feel free to add tips if ya want and
            literally anything around 20-25+ would work haha always happy to work with
            y'all sarrow members...my team literally made graphics banner rn for immortal.
          </CardText>
          <Button>BOOK NOW</Button>
        </PremiumCard>
      </div>
    </div>
  );
};

export default AboutUs;
