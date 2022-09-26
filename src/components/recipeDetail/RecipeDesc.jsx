import React, { useEffect, useState } from "react";
import api from "../../server/api";
import RecipeTitle from "./element/RecipeTitle";
import RecipeDescBody from "./element/RecipeDescBody";

import styled from "styled-components";

const RecipeDesc = (props) => {
  const { recipe, modalProps, confirmProps } = props;
  const { title, recipeId, isLiked } = recipe;

  return (
    <StRecipeDesc>
      <RecipeTitle
        title={title}
        recipeId={recipeId}
        isLiked={isLiked}
        modalProps={modalProps}
      />
      <RecipeDescBody recipe={recipe} confirmProps={confirmProps}/>
    </StRecipeDesc>
  );
};

export default RecipeDesc;

const StRecipeDesc = styled.div`
  padding: 0 25px;
  transform: translateY(-1px);
  box-shadow: 0 1px 0 #eeeeee;

  background-color: #eeeeee;
`;
