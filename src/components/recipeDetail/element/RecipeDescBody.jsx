import styled from "styled-components";

const RecipeDescBody = (props) => {
  const { content } = props
  return (
    <StRecipeDescBody>
      <div>
        {content}
      </div>
      <div className="name">
        <strong>
          By 
        </strong>
        <div className="profile_img"></div>
        <span>
          사용자 이름
        </span>
      </div>
    </StRecipeDescBody>
  )
};

export default RecipeDescBody;

const StRecipeDescBody=styled.div`
  padding: .8rem 1rem;

  display: flex;
  flex-flow: column;
  gap: 10px;
  
  .name {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  .profile_img {
    width: 30px;
    height: 30px;
    border-radius: 50%;

    background-color: #aaa;
  }
`