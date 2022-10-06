import React from "react";
import styled from "styled-components";

const RecipeListIngredient = (props) => {
  const { ingredientColor, ingredientAmount, ingredientName } =
    props.ingredients;
  return (
    <StIngredientWrap
      ingredientColor={ingredientColor}
      ingredientAmount={((ingredientAmount / props.cupSize) * 100).toFixed()}
    ></StIngredientWrap>
  );
};

export default RecipeListIngredient;

const StIngredientWrap = styled.div`
  height: ${(props) => props.ingredientAmount + "%"};

  background-color: ${(props) => props.ingredientColor};
  color: white;
`;
