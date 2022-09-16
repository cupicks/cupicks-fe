import styled from "styled-components";

const Ingredient = (props) => {
  const {
    ingredientColor="#fff", 
    ingredientAmount=0
  } = props.ingredient;
  const {cupSize} = props
  const amountPercent = (ingredientAmount / cupSize * 100).toFixed(1)

  return (
    <StIngredient 
      ingredientColor={ingredientColor}
      ingredientAmount={amountPercent}
    />
  )
};

export default Ingredient;

const StIngredient = styled.div`
  background-color: ${props => props.ingredientColor};
  height: ${props => props.ingredientAmount + "%"};

  padding: 1rem;
  display: flex;
  justify-content: right;
  align-items: flex-end;
`