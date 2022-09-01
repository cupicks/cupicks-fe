import styled from "styled-components";

const RecipeTitle = (props) => {
  return (
    <StRecipeTitle>
      {props.title}
      <span>
        🤍
      </span>
    </StRecipeTitle>
  )
};

export default RecipeTitle;

const StRecipeTitle = styled.div`
  height: 50px;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`