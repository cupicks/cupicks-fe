import styled from "styled-components";

const RecipeTitle = (props) => {
  return (
    <StRecipeTitle>
      {props.title}
    </StRecipeTitle>
  )
};

export default RecipeTitle;

const StRecipeTitle = styled.div`  
  padding: 12px 15px 13px;
  border-radius: 15px;

  font-weight: 700;
  font-size: 14px;
  line-height: 150%;

  color: #393939;

  display: flex;
  align-items: center;
  justify-content: space-between;
`