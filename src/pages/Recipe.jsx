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
  min-height: calc(100vh - 80px - 150px);
  margin: 0 auto;
  overflow: auto;
`;
