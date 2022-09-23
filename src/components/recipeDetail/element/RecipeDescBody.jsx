import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

import styled from "styled-components";

const RecipeDescBody = (props) => {
  const navigate = useNavigate();
  const { recipe } = props;
  const {
    recipeId,
    content,
    ingredientList,
    updatedAt,
    resizedUrl,
    imageUrl,
    nickname,
  } = recipe;

  const token = localStorage.getItem("refreshToken");
  const { decodedToken } = useJwt(token);
  let userName = decodedToken?.nickname;
  const recipeAuthor = userName === nickname;

  // 프로필 이미지
  const profileImageUrl = imageUrl;
  // const profileImageUrl = resizedUrl

  // updatedAt => 00월 00일
  const td = new Date(updatedAt).toISOString().slice(5, 10).split("-");

  const month = td[0];
  const date = td[1];
  const today = `${month}월 ${date}일`;

  return (
    <StRecipeDescBody>
      <ul className="text_desc">
        {ingredientList.map((list, i) => (
          <li key={"text_desc" + i}>
            {list.ingredientName} : {list.ingredientAmount}ml
          </li>
        ))}
      </ul>

      <div>{content}</div>

      <div className="user_info">
        <div className="left">
          <StProfileImage profileImageUrl={profileImageUrl} />
          <span className="nickname">{nickname}</span>
          <span className="dot">•</span>
          <span className="updatedAt">{today}</span>
        </div>

        {recipeAuthor && (
          <div
            className="right"
            onClick={() => navigate(`/recipe/${recipeId}/edit`)}
          >
            수정
          </div>
        )}
      </div>
    </StRecipeDescBody>
  );
};

export default RecipeDescBody;

const StRecipeDescBody = styled.div`
  display: flex;
  flex-flow: column;
  gap: 25px;

  font-size: 12px;

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
      font-weight: 700;
      font-size: 14px;

      color: #3897f0;
    }
  }
`;

const StProfileImage = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  margin-right: 2px;

  background: #ccc url(${(props) => props.profileImageUrl}) no-repeat center /
    cover;
`;
