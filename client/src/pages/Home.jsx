import React from "react";
import TriangularCarousel from "../components/TriangularCarousal";
import SquareCarousel from "../components/SquareCarosal";
import styled from "styled-components";
import Searchbar from "../components/Searchbar";

const HomeContainer = styled.div`
  background: linear-gradient(90deg, #1c1c3d, #4b0082);
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
`;

const Title = styled.h2`
  margin: 2rem 0;
`;

export default function Home() {
  return (
    <HomeContainer>
        <Searchbar/>
      <Title>WHAT WE OFFER</Title>
      <TriangularCarousel />
      <Title>ASTROLOGY REPORTS</Title>
      <SquareCarousel />
    </HomeContainer>
  );
}
