import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import talk from "../../../assets/svg/talk.svg";
import like from "../../../assets/svg/like_fill_m.svg";

import api from "../../../server/api";

import styled from "styled-components";

const RecipeTitle = (props) => {
  const navigate = useNavigate();

  const { title, recipeId, header, liked, handleOnClickSlickBox } = props;
  // console.log(liked);
  // const [cancelLike, setCancelLike] = useState(liked);

  const likeCard = async (e) => {
    e.stopPropagation();
    // console.log(
    //   e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove(),
    // );
    let contentType = "application/json";
    try {
      await api(contentType)
        .patch(`/recipes/${recipeId}/dislike`)
        .then((res) => {
          console.log(res);
          if (res.data.isSuccess) {
            handleOnClickSlickBox();
          }
        });
      // setCancelLike((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(cancelLike);
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
        {header && (
          <img
            className="like_btn"
            src={like}
            alt="좋아요"
            onClick={likeCard}
          />
        )}
      </StIconSet>
    </StRecipeTitle>
  );
};

export default RecipeTitle;

const StRecipeTitle = styled.div`
  padding: 1.2rem 0 4rem;

  font-weight: 700;
  font-size: 1.8rem;

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

  gap: 1rem;

  .talk_btn {
    width: 2.5rem;
  }
  .like_btn {
    width: 2.9rem;
  }
`;
