import styled from "styled-components";

const RecipeDescBody = (props) => {
  const { content } = props
  return (
    <StRecipeDescBody>
      <div>
        {content}
      </div>
      <div className="name">
        <span>
          By 
        </span>
        <span>
          사용자 이름
        </span>
      </div>
    </StRecipeDescBody>
  )
};

export default RecipeDescBody;

const StRecipeDescBody=styled.div`
  padding: .5rem 1rem;

  display: flex;
  flex-flow: column;
  gap: 10px;
  
  .name {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
  }
`