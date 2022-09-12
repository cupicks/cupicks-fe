import styled from "styled-components";
import RecipeCreateIngredient from "../element/RecipeCreateIngredient";

const RecipeCreateIngredientsContainer = (props) => {
  const { cupState, setCupState, subStep, onClick, formProps } = props
  const { watch } = formProps
  const ingredientList = watch('ingredientList');

  console.log(cupState.currIngredientList[1].ingredientColor);

  return (
    <StRecipeCreateIngredientsContainer>
      
      { ingredientList?.map((ingredient, idx) => 
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
      ).reverse() }

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