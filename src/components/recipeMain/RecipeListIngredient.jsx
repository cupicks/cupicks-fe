import React from "react";
import styled from "styled-components";

const RecipeListIngredient = (props) => {
  const { ingredientColor, ingredientAmount, ingredientName } =
    props.ingredients;
  return (
    <IngredientWrap
      ingredientColor={ingredientColor}
      ingredientAmount={((ingredientAmount / props.cupSize) * 100).toFixed(1)}
    >
      {ingredientName}
    </IngredientWrap>
  );
};

export default RecipeListIngredient;

const IngredientWrap = styled.div`
  background-color: ${(props) => props.ingredientColor};
  height: ${(props) => props.ingredientAmount + "%"};
  color: white;
`;
