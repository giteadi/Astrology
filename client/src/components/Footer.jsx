import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background: rgba(255, 255, 255, 0.2); /* Transparent background */
  color: #fff; /* White text */
  padding: 2rem 0;
  text-align: center;
  margin-top: 4rem; /* Add some space above */

  /* Apply backdrop filter for a slight blur effect */
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.3); /* Light border for separation */
  
  /* Responsive Design */
  @media (max-width: 640px) {
    padding: 1rem 0;
  }
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: #ddd; /* Light gray color for the text */
  margin: 0.5rem 0;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #4b0082; /* Change color on hover */
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2024 Your Company. All rights reserved.</FooterText>
      <FooterText>
        <FooterLink href="/privacy-policy">Privacy Policy</FooterLink> | 
        <FooterLink href="/terms-of-service"> Terms of Service</FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
