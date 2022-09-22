import React, { useState } from "react";

import styled from "styled-components";

import AllRecipeListIngredient from "./AllRecipeListIngredient";

import talk from "../../assets/svg/talk.svg";
import likes from "../../assets/svg/like_m.svg";

import { useNavigate } from "react-router-dom";

import api from "../../server/api";

const AllRecipeListContainer = (props) => {
  const { allrecipes } = props;
  const {
    recipeId,
    ingredientList,
    title,
    cupSize,
    isIced,
    nickname,
    resizedUrl,
    imageUrl,
  } = allrecipes;
  const navigate = useNavigate();
  // console.log(props.allrecipes.data);
  // console.log(props.allrecipes);
  const [like, setLike] = useState(false);

  const cupHeight = ((cupSize / 591) * 100).toFixed();
  const windowWidth = window.innerWidth;
  let titleText = title;
  if (windowWidth < 400) {
    if (title.length > 6) {
      titleText = title.slice(0, 6) + "...";
    }
  }

  // 추후 resizeUrl로 변경
  const profileImage = resizedUrl;

  const likeCard = async () => {
    let contentType = "application/json";
    if (like === false) {
      try {
        await api(contentType)
          .patch(`/recipes/${recipeId}/like`)
          .then((res) => {
            console.log(res);
          });
        setLike(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await api(contentType)
          .patch(`/recipes/${recipeId}/dislike`)
          .then((res) => {
            console.log(res);
          });
        setLike(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(like);

  return (
    <>
      <StListHead>
        <StListProfile profileImage={profileImage} />
        <StNickname>{nickname}</StNickname>
      </StListHead>

      <StListContent
        onClick={() => {
          navigate(`${recipeId}/detail`);
        }}
      >
        <StCupHeight cupHeight={cupHeight}>
          {ingredientList.map((ingredients, idx) => {
            // 재료가 얼음일 때를 제외합니다.
            if (isIced && idx === 0) return null;
            return (
              <AllRecipeListIngredient
                ingredients={ingredients}
                cupSize={cupSize}
                isIced={isIced}
                key={"allRecipeListIngredient" + idx}
              />
            );
          })}
        </StCupHeight>
      </StListContent>

      <StListDesc>
        <div className="title">{titleText}</div>
        <StIconSet>
          <img
            className="talk_btn"
            src={talk}
            onClick={() => {
              navigate(`${recipeId}/comment`);
            }}
          />
          <img className="like_btn" src={likes} onClick={likeCard} />
        </StIconSet>
      </StListDesc>
    </>
  );
};

export default AllRecipeListContainer;

const StListHead = styled.div`
  height: 23px;
  padding: 0 5px;

  display: flex;
  align-items: center;
  gap: 5px;

  box-shadow: 0 2px 0 #eeeeee;
`;

const StListProfile = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;

  border: 1px solid #b6b6b6;
  background: #eee url(${(props) => props.profileImage}) no-repeat center /
    cover;
`;

const StNickname = styled.div`
  color: #101010;

  font-weight: 600;
  font-size: 6.5px;
`;

const StListContent = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-flow: column-reverse;

  border-top: 2px solid #f8f7f8;
`;

const StCupHeight = styled.div`
  height: ${(props) => props.cupHeight + "%"};

  display: flex;
  flex-flow: column-reverse;
`;

const StListDesc = styled.div`
  min-height: 20px;
  padding: 4px 5.5px 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;

  .title {
    font-weight: 600;
    font-size: 7px;
    line-height: 150%;
  }
`;

const StIconSet = styled.div`
  display: flex;
  gap: 4px;

  .talk_btn {
    width: 9px;
    transition: all 0.3s;
    cursor: pointer;
  }
  .like_btn {
    width: 11px;
    transition: all 0.3s;
    cursor: pointer;
  }

  &:hover .talk_btn,
  &:hover .like_btn {
    transform: scale(1.3);
  }
`;
