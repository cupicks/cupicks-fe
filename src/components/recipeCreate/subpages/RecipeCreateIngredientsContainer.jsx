import styled from "styled-components";
import RecipeCreateIngredient from "../element/RecipeCreateIngredient";

const RecipeCreateIngredientsContainer = (props) => {
  const { cupSize, ingredientLists } = props;

  return (
    <StRecipeCreateIngredientsContainer>
      { ingredientLists.length > 0 && ingredientLists.map( (ingredientList, idx) => 
        <RecipeCreateIngredient 
          key={idx}
          ingredientList={ingredientList} 
          cupSize={cupSize} 
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