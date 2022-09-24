import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../server/api";

import talk from "../../../assets/svg/talk.svg";
import dislikes from "../../../assets/svg/like_m.svg";
import likes from "../../../assets/svg/like_fill_m.svg";

import styled from "styled-components";

const RecipeTitle = (props) => {
  const navigate = useNavigate();

  const { title, recipeId, isLiked, modalProps } = props;
  const { needLoginModal, setNeedLoginModal, timer } = modalProps;
  // console.log(needLoginModal);
  const [like, setLike] = useState(isLiked);
  const userLogin = Boolean(localStorage.getItem("refreshToken"));

  // const { userLogin, needLogginModal, setNeedLogginModal, timer } = modalProps;
  // console.log(userLogin);
  const likeCard = async () => {
    // 로그인이 안되어 있다면 모달창을 띄우고 함수를 종료합니다.
    if (!userLogin) {
      if (!needLoginModal) {
        setNeedLoginModal(true);
        setTimeout(() => {
          setNeedLoginModal(false);
        }, timer);
      }
      return;
    }
    let contentType = "application/json";
    //like가 false일때는 좋아요 안눌러진상태
    if (like === false) {
      try {
        await api(contentType)
          .patch(`/recipes/${recipeId}/like`)
          .then((res) => {
            setLike(!like);
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await api(contentType)
          .patch(`/recipes/${recipeId}/dislike`)
          .then((res) => {
            setLike(!like);
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

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
        {like === false ? (
          <img className="like_btn" src={dislikes} onClick={likeCard} />
        ) : (
          <img className="like_btn" src={likes} onClick={likeCard} />
        )}
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
