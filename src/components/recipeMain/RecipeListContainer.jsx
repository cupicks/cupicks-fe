import React, { useState, useCallback } from "react";
import styled from "styled-components";
import RecipeListIngredient from "./RecipeListIngredient";
import styledElementComponents from "../../styles/customElementStyle";
import { useNavigate } from "react-router-dom";
const { CustomProfilePic, CustomIconBox } = styledElementComponents;
import talk from "../../assets/svg/talk.svg";
import dislikes from "../../assets/svg/like_m.svg";
import likes from "../../assets/svg/like_fill_m.svg";

export const RecipeListContainer = (props) => {
  const {
    recipeId,
    ingredientList,
    title,
    cupSize,
    nickname,
    resizedUrl,
    isLiked,
    i,
  } = props.recipes;

  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [liked, setLiked] = useState(isLiked);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onClickCard = useCallback(
    (path) => (e) => {
      if (dragging) {
        e.stopPropagation();
        return;
      }
      if (path) {
        navigate(`/recipe/${path}/detail`);
      }
    },
    [dragging],
  );

  /** 레시피 좋아요 버튼 핸들러 */
  const likeCard = async () => {
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
    if (liked === false) {
      try {
        await api(contentType)
          .patch(`/recipes/${recipeId}/like`)
          .then((res) => {
            getItems();
            console.log(res);
          });
        setLiked((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await api(contentType)
          .patch(`/recipes/${recipeId}/dislike`)
          .then((res) => {
            getItems();
            console.log(res);
          });
        setLiked((prev) => !prev);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <StList key={"slick_box" + i} onClick={onClickCard(recipeId)}>
      <StListWrap>
        <StListHead>
          <CustomProfilePic profileImage={resizedUrl} />
          <StNickname>{nickname}</StNickname>
        </StListHead>
        <div className="flex_box">
          <StListContent>
            {ingredientList.map((ingredients) => (
              <RecipeListIngredient
                ingredients={ingredients}
                cupSize={cupSize}
              />
            ))}
          </StListContent>
        </div>
        <StListTitle>
          <div className="title">{title}</div>
          <StItemSet>
            <img
              className="talk_btn"
              src={talk}
              alt="댓글페이지가기"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/recipe/${recipeId}/comment`, { state: title });
              }}
            />
            {liked === false ? (
              <img
                className="like_btn icon"
                src={dislikes}
                onClick={likeCard}
                alt="dislike_btn"
              />
            ) : (
              <img
                className="like_btn icon"
                src={likes}
                onClick={likeCard}
                alt="like_btn"
              />
            )}
          </StItemSet>
        </StListTitle>
      </StListWrap>
    </StList>
  );
};

const StList = styled.div`
  /* min-width: 300px; */
  width: 80vw;
`;

const StListWrap = styled.div`
  height: ${(props) => (props.isTitle ? "calc(40vh + 50px)" : "40vh")};
  border-radius: 12px;

  margin: 0 auto;
  margin-top: 30px;

  display: flex;
  flex-flow: column;

  box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;

  .flex_box {
    height: ${(props) => (props.isTitle ? "calc(100% - 50px)" : "100%")};
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }
`;

const StListHead = styled.div`
  height: 80px;

  display: flex;
  flex-flow: row;
  align-items: center;

  background-color: #ffffff;

  border-radius: 12px;
  border-top: 2px solid #e6e6e6;
`;

// const StListProfile = styled.div`
//   width: 35px;
//   height: 35px;
//   border-radius: 50%;

//   border: 2px solid gray;
// `;

const StNickname = styled.div`
  margin-left: 10px;
`;

const StListContent = styled.div`
  height: 300px;
  display: flex;
  flex-flow: column-reverse;
`;

const StListTitle = styled.div`
  height: 40px;
  border-radius: 12px;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  padding-left: 10px;

  background-color: #ffffff;

  border-bottom: 2px solid #e6e6e6;

  .title {
    font-size: 1rem;
    font-weight: bold;
  }
`;

const StItemSet = styled.div`
  display: flex;
  flex-flow: row;

  gap: 8px;

  .talk_btn {
    width: 1.2rem;
    height: 1.2rem;
  }
  .like_btn {
    width: 1.2rem;
    height: 1.2rem;
  }
`;
