import styled from "styled-components";
import RecipeCreateIngredient from "../element/RecipeCreateIngredient";

const RecipeCreateIngredientsContainer = (props) => {
  const { cupState, setCupState, subStep, onClick, formProps } = props
  const { watch } = formProps
  const { isIcedTag } = cupState
  const ingredientList = watch('ingredientList');

  return (
    <StRecipeCreateIngredientsContainer>
      
      { ingredientList?.map((ingredient, idx) => {

        // 재료가 얼음이면 출력 안함
        const isThisIce = isIcedTag && idx === 0
        if(isThisIce) return null

        return (
          <RecipeCreateIngredient 
            key={idx}
            idx={idx}
            ingredient={ingredient}
            cupState={cupState}
            setCupState={setCupState}
            formProps={formProps}
            subStep={subStep} 
            onClick={onClick}
          />
        )
      }).reverse() }

    </StRecipeCreateIngredientsContainer>
  );
};

export default RecipeCreateIngredientsContainer;

const StRecipeCreateIngredientsContainer = styled.div`
  flex: 1 1 auto;
  height: 100%;

  display: flex;
  flex-flow: column;
  justify-content: flex-end;
`