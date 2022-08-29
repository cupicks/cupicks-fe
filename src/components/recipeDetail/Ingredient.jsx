import styled from "styled-components";

const Ingredient = (props) => {
  const {
    ingredientName, 
    ingredientColor, 
    ingredientAmount
  } = props.list;

  return (
    <StIngredient 
      ingredientColor={ingredientColor}
      ingredientAmount={ingredientAmount}
    >
      {ingredientName}
    </StIngredient>
  )
};

export default Ingredient;

const StIngredient = styled.div`
  background-color: ${props => props.ingredientColor};
  height: ${props => props.ingredientAmount + "%"};
`