import styled from "styled-components";
import RecipeEditTextValue from "./subpages/RecipeEditTextValue";

const RecipeEditFormContainer = (props) => {
  const { fetchRecipe, formProps } = props;

  return (
    <RecipeEditTextValue formProps={formProps} fetchRecipe={fetchRecipe} />
  );
};

export default RecipeEditFormContainer;

const StRecipeEditFormContainerWrap = styled.div``;
