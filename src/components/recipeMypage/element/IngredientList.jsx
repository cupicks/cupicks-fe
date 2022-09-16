import styled from "styled-components";

import Ingredient from "./Ingredient";

const IngredientList = (props) => {
  const {ingredientList, cupSize} = props.recipe;

  return (
    <StIngredientList>
      {ingredientList.map((ingredient, i) => (
        <Ingredient 
          key={'mypage_my_list_ingredient'+i}
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