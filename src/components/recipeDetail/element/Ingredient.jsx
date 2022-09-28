import styled from "styled-components";

import { recipeDarkIngredientColorList } from "../../../util/recipeIngrediantColorList";

const Ingredient = (props) => {
  const {
    ingredientName = "재료명",
    ingredientColor = "#eee",
    ingredientAmount = 0,
  } = props.list;
  const { cupSize, isIced } = props;

  let textColor = "#393939";
  recipeDarkIngredientColorList.map((color) => {
    console.log(color);
    if (ingredientColor === color) {
      textColor = "#eee";
    }
  });

  // 얼음이면 총량에서 200ml뺍니다.
  const iceAmount = 200;
  const noIceCupSize = isIced ? cupSize - iceAmount : cupSize;
  const amountPercent = ((+ingredientAmount / noIceCupSize) * 100).toFixed();

  return (
    <StIngredient
      ingredientColor={ingredientColor}
      ingredientAmount={amountPercent}
      textColor={textColor}
    >
      <span>{ingredientName}</span>
    </StIngredient>
  );
};

export default Ingredient;

const StIngredient = styled.div`
  height: ${(props) => props.ingredientAmount + "%"};
  padding: 0 24px 15px;

  display: flex;
  justify-content: right;
  align-items: flex-end;

  background-color: ${(props) => props.ingredientColor};

  font-weight: 700;
  font-size: 18px;
  line-height: 150%;

  span {
    position: relative;
    z-index: 99;
  }

  color: ${(props) => props.textColor};
`;
