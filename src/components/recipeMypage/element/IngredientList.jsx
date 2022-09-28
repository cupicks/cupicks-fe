import styled from "styled-components";

import Ingredient from "./Ingredient";

const IngredientList = (props) => {
  const {recipe} = props
  const {ingredientList, cupSize, isIced} = recipe;

  return (
    <StIngredientList>
      {ingredientList.map((ingredient, i) => {
        if(isIced && i === 0) return null
        return (
          <Ingredient 
            key={'mypage_my_list_ingredient'+i}
            ingredient={ingredient} 
            cupSize={cupSize} 
            isIced={isIced}
          />
        )
      })}
    </StIngredientList>
  )
};

export default IngredientList;

const StIngredientList = styled.div`
  display: flex;
  flex-flow: column-reverse;
  height: 100%;
`