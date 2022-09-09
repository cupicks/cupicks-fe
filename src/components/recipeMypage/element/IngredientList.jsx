import styled from "styled-components";

import Ingredient from "./Ingredient";

const IngredientList = (props) => {
  const {ingredientList, cupSize} = props.recipe;

  return (
    <StIngredientList>
      {ingredientList.map((ingredient) => (
        <Ingredient 
          ingredient={ingredient} 
          cupSize={cupSize} 
        />
      ))}
    </StIngredientList>
  )
};

export default IngredientList;

const StIngredientList = styled.div`
  display: flex;
  flex-flow: column-reverse;
  height: 100%;
`