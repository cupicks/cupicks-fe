import styled from "styled-components";
import RecipeCreateForm from "../components/recipeCreate/RecipeCreateForm";

const RecipeCreate = () => {
  return (
    <StRecipeCreate>
      <h2>레시피 작성</h2>
      <RecipeCreateForm />
    </StRecipeCreate>
  );
};

export default RecipeCreate;

const StRecipeCreate = styled.div`
  flex: 1 1 auto;
  background: red;
`