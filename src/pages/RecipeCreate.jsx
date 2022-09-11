import RecipeCreateForm from "../components/recipeCreate/RecipeCreateForm";

import styled from "styled-components";

const RecipeCreate = () => {
  return (
    <StWrap>
      <RecipeCreateForm />
    </StWrap>
  );
};

export default RecipeCreate;

const StWrap = styled.div`
  height: 100%;
`