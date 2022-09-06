import RecipeCreateForm from "../components/recipeCreate/RecipeCreateForm";

import styled from "styled-components";

const RecipeCreate = () => {
  return (
    <StRecipeCreate>
      <RecipeCreateForm />
    </StRecipeCreate>
  );
};

export default RecipeCreate;

const StRecipeCreate = styled.div`
  flex: 1 1 auto;
  
  display: flex;
`