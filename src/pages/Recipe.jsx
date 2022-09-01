import React from "react";
import styled from "styled-components";
// import Header from "../partial/Header";
import RecipeBody from "../components/recipeMain/RecipeBody";
// import Footer from "../partial/Footer";

const Recipe = () => {
  return (
    <Wrap>
      {/* <Header /> */}
      <RecipeBody />
      {/* <Footer /> */}
    </Wrap>
  );
};

export default Recipe;

const Wrap = styled.div`
  width: 600px;
  height: 100vh;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
  margin: 0 auto;
  /* flex-direction: column;
  display: flex; */
`;
