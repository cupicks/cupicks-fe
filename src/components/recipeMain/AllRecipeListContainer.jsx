import React, { useEffect, useState } from "react";

import styled from "styled-components";

import AllRecipeListIngredient from "./AllRecipeListIngredient";

import talk from "../../assets/svg/talk.svg";
import dislikes from "../../assets/svg/like_m.svg";
import likes from "../../assets/svg/like_fill_m.svg";

import { useNavigate } from "react-router-dom";

import api from "../../server/api";
import { useEffect } from "react";

const AllRecipeListContainer = (props) => {
  const { allrecipes, modalProps, getItems } = props;
  const {
    recipeId,
    ingredientList,
    title,
    cupSize,
    isIced,
    nickname,
    resizedUrl,
    imageUrl,
    isLiked,
  } = allrecipes;
  const { userLogin, needLogginModal, setNeedLogginModal, timer } = modalProps;
  const navigate = useNavigate();
  // console.log(props.allrecipes.data);
  // console.log(props.allrecipes);
  const [like, setLike] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });

  const cupHeight = ((cupSize / 591) * 100).toFixed();

  // 브라우저 너비에 따라서 글자 수를 자릅니다.
  const windowWidth = windowSize.width;
  let titleText = title;
  if (title.length > 11) {
    titleText = title.slice(0, 11) + "...";
  }

  if (windowWidth < 450) {
    if (title.length > 4) {
      titleText = title.slice(0, 4) + "...";
    }
  } else if (windowWidth < 500) {
    if (title.length > 7) {
      titleText = title.slice(0, 7) + "...";
    }
  }
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  // 추후 resizeUrl로 변경
  const profileImage = resizedUrl;

  const likeCard = async (isLiked) => {
    // 로그인이 안되어 있다면 모달창을 띄우고 함수를 종료합니다.
    if (!userLogin) {
      if (!needLogginModal) {
        setNeedLogginModal(true);
        setTimeout(() => {
          setNeedLogginModal(false);
        }, timer);
      }
      return;
    }
    let contentType = "application/json";
    //isLiked가 false일때는 좋아요 안눌러진상태
    if (isLiked === false) {
      // isLiked === true;
      try {
        await api(contentType)
          // .patch(`/recipes/${recipeId}/dislike`, isLiked)
          .patch(`/recipes/${recipeId}/like`)
          .then((res) => {
            console.log(res);
          });
        props.getItems();
        // setLike(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      // isLiked === false
      try {
        await api(contentType)
          // .patch(`/recipes/${recipeId}/like`, isLiked)
          .patch(`/recipes/${recipeId}/dislike`)
          .then((res) => {
            console.log(res);
          });
        props.getItems();
        // setLike(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  // console.log(like);

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
              navigate(`${recipeId}/comment`, { state: title });
            }}
          />
          {isLiked === false ? (
            <img
              className="like_btn"
              src={dislikes}
              onClick={() => {
                likeCard(isLiked);
              }}
            />
          ) : (
            <img
              className="like_btn"
              src={likes}
              onClick={() => {
                likeCard(isLiked);
              }}
            />
          )}
        </StIconSet>
      </StListDesc>
    </>
  );
};

export default AllRecipeListContainer;

const StListHead = styled.div`
  height: 23px;
  padding: 2px 7px 0;

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
  padding: 4px 7.5px 5px;

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
  gap: 5px;

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

  .talk_btn:hover,
  .like_btn:hover {
    transform: scale(1.3);
  }
`;
