import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

import api from "../../../server/api";

import styled from "styled-components";

const RecipeDescBody = (props) => {
  const navigate = useNavigate();
  const { recipe, confirmProps } = props;
  const {
    recipeId,
    content,
    ingredientList,
    updatedAt,
    resizedUrl,
    imageUrl,
    cupSize,
    nickname,
  } = recipe;
  const { recipeDeleteButtonClickHandler } = confirmProps;
  const [isAuthor, setIsAuthor] = useState(false);
  const token = localStorage.getItem("refreshToken");

  const getProfile = async () => {
    const contentType = "application/json";
    try {
      const res = await api(contentType).get("/profile/my-profile");
      const userName = res.data.user.nickname;
      setIsAuthor(userName === nickname);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    token ? getProfile() : "";
  }, []);

  // 프로필 이미지
  const profileImageUrl = imageUrl;
  // const profileImageUrl = resizedUrl

  // 날짜 글자로 변환: updatedAt => 00월 00일
  const td = new Date(updatedAt).toISOString().slice(5, 10).split("-");

  const month = td[0];
  const date = td[1];
  const today = `${month}월 ${date}일`;

  return (
    <>
      <StRecipeDescBody>
        <ul className="text_desc">
          <li>
            <strong>전체 : {cupSize}ml</strong>
          </li>
          {ingredientList.map((list, i) => (
            <li key={"text_desc" + i}>
              {list.ingredientName} : {list.ingredientAmount}ml
            </li>
          ))}
        </ul>

        <div>{content}</div>

        <div className="user_info">
          <div className="left">
            <StProfileImageBox>
              <img
                className="content_pic"
                src={resizedUrl}
                onError={(e) => (e.target.src = imageUrl)}
              />
            </StProfileImageBox>
            <span className="nickname">{nickname}</span>
            <span className="dot">•</span>
            <span className="updatedAt">{today}</span>
          </div>

          {isAuthor && (
            <div className="right">
              <button onClick={() => navigate(`/recipe/${recipeId}/edit`)}>
                수정
              </button>
              <button onClick={recipeDeleteButtonClickHandler}>삭제</button>
            </div>
          )}
        </div>
      </StRecipeDescBody>
    </>
  );
};

export default RecipeDescBody;

const StRecipeDescBody = styled.div`
  display: flex;
  flex-flow: column;
  gap: 25px;

  font-size: 12px;

  strong {
    font-weight: 500;
  }

  .user_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 11px;

    margin-bottom: 20px;

    .left {
      display: flex;
      align-items: center;
      gap: 8px;

      font-size: 12px;

      span {
        color: #606060;
      }

      .nickname {
        font-weight: 700;
      }
    }

    .dot {
      font-size: 10px;
    }

    .right {
      transform: translateX(8px);

      button {
        all: unset;

        padding: 5px 10px;

        font-weight: 700;
        font-size: 14px;

        color: #3897f0;

        cursor: pointer;
      }
    }
  }
`;

const StProfileImageBox = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;

  margin-right: 0.2rem;

  display: flex;
  overflow: hidden;

  background: #ccc;

  .content_pic {
    width: 100%;
    object-fit: cover;
  }
`;
