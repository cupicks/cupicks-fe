import React from "react";
import styled from "styled-components";

const AllRecipeListIngredient = (props) => {
  const { ingredientColor, ingredientAmount, ingredientName } = props.ingredients;

  const ingredientHeight = ((ingredientAmount / props.cupSize) * 100).toFixed()
  
  return (
    <StIngredientWrap
      ingredientColor={ingredientColor}
      ingredientHeight={ingredientHeight}
    ></StIngredientWrap>
  );
};

export default AllRecipeListIngredient;

const StIngredientWrap = styled.div`
  flex: 1 1 ${(props) => props.ingredientHeight + "%"};
  background-color: ${(props) => props.ingredientColor};
`;
