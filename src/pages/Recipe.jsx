import React from "react";
import styled from "styled-components";
import RecipeBody from "../components/recipeMain/RecipeBody";

const Recipe = () => {
  return (
    <StWrap>
      <RecipeBody />
    </StWrap>
  );
};

export default Recipe;

const StWrap = styled.div`
  height: calc(100vh - 50px - 90px);
  
  overflow: hidden;
`;
