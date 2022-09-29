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
      smallAmount={amountPercent < 5}
      xsAmount={amountPercent < 3}
      textColor={textColor}
    >
      <span>{ingredientName}</span>
    </StIngredient>
  );
};

export default Ingredient;

const StIngredient = styled.div`
  flex: 0 0 ${(props) => props.ingredientAmount + "%"};
  padding: ${(props) =>
    props.smallAmount ? "0 2.4rem 0.2rem" : "0 2.4rem 1rem"};

  display: flex;
  justify-content: right;
  align-items: flex-end;

  background-color: ${(props) => props.ingredientColor};

  font-weight: 700;
  font-size: ${(props) => (props.smallAmount ? "1rem" : "1.8rem")};

  span {
    position: relative;
    z-index: 99;
  }

  color: ${(props) => props.textColor};
`;
