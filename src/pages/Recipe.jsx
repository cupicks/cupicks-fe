import React from "react";
import styled from "styled-components";
import Header from "../common/Header";
import RecipeBody from "../components/RecipeBody";
import Footer from "../common/Footer";

const Recipe = () => {
  return (
    <Wrap>
      <Header />
      <RecipeBody />
      <Footer />
    </Wrap>
  );
};

export default Recipe;

const Wrap = styled.div`
  width: 600px;
  height: 100vh;
  border: 2px solid black;
  /* flex-direction: column;
  display: flex; */
`;
