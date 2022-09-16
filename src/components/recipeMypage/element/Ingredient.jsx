import styled from "styled-components";

const Ingredient = (props) => {
  const {
    ingredientColor="#fff", 
    ingredientAmount=0
  } = props.ingredient;
  const {cupSize, isIced} = props

  // 얼음이면 총량에서 200ml뺍니다.
  const iceAmount = 200 
  const noIceCupSize = isIced ? cupSize - iceAmount : cupSize;
  const ingredientHeight = (ingredientAmount / noIceCupSize * 100).toFixed()

  return (
    <StIngredient 
      ingredientColor={ingredientColor}
      ingredientHeight={ingredientHeight}
    />
  )
};

export default Ingredient;

const StIngredient = styled.div`
  background-color: ${props => props.ingredientColor};
  height: ${props => props.ingredientHeight + "%"};

  padding: 1rem;
  display: flex;
  justify-content: right;
  align-items: flex-end;
`