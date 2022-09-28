import React from "react";
import styled from "styled-components";

const AllRecipeListIngredient = (props) => {
  const { isIced, ingredients, cupSize } = props
  const { ingredientColor, ingredientAmount, ingredientName } = ingredients;
  
  // 얼음이면 총량에서 200ml뺍니다.
  const iceAmount = 200
  const noIceCupSize = isIced ? cupSize - iceAmount : cupSize;
  const ingredientHeight = (ingredientAmount / noIceCupSize * 100).toFixed()
  
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
