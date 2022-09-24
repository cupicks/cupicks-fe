import { useNavigate } from "react-router-dom";

import talk from "../../../assets/svg/talk.svg";

import styled from "styled-components";

const RecipeTitle = (props) => {
  const navigate = useNavigate();

  const { title, recipeId } = props;

  return (
    <StRecipeTitle>
      <span>{title}</span>
      <StIconSet>
        <img
          className="talk_btn"
          src={talk}
          alt="댓글 보러가기"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/recipe/${recipeId}/comment`, { state: title });
          }}
        />
      </StIconSet>
    </StRecipeTitle>
  );
};

export default RecipeTitle;

const StRecipeTitle = styled.div`
  padding: 12px 0 40px;

  font-weight: 700;
  font-size: 18px;

  color: #393939;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
  img:hover {
    opacity: 0.8;
  }
`;
const StIconSet = styled.div`
  display: flex;

  gap: 10px;

  .talk_btn {
    width: 25px;
  }
  .like_btn {
    width: 29px;
  }
`;
