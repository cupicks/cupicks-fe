import React from "react";
import styled from "styled-components";
import AllRecipeListContainer from "./AllRecipeListContainer";

const AllRecipeList = ({ allRecipe, setAllRecipe }) => {
  allRecipe = allRecipe.recipeList;
  return (
    <StAllListWrap>
      {allRecipe.map((allrecipes) => (
        <AllRecipeListContainer allrecipes={allrecipes} />
      ))}
    </StAllListWrap>
  );
};

export default AllRecipeList;

const StAllListWrap = styled.div`
  width: 600px;
  height: 220px;
  border-radius: 12px;

  /* margin: 0 auto; */
  margin-top: 30px;

  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
`;
