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
  flex: 1 1 auto;
  
  display: flex;
`