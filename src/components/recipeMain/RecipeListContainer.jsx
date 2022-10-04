import React from "react";
import styled from "styled-components";
import RecipeListIngredient from "./RecipeListIngredient";
import talk from "../../assets/svg/talk.svg";
import like from "../../assets/svg/like_m.svg";

export const RecipeListContainer = (props) => {
  const { recipeId, ingredientList, title, cupSize, nickname, resizedUrl } =
    props.recipes;
  return (
    <StList key={recipeId}>
      <StListWrap>
        <StListHead>
          <StListProfile></StListProfile>
          <StNickname>{nickname}</StNickname>
        </StListHead>
        <StListContent>
          {ingredientList.map((ingredients) => (
            <RecipeListIngredient ingredients={ingredients} cupSize={cupSize} />
          ))}
        </StListContent>
        <StListTitle>
          <div className="title">{title}</div>
          <StItemSet>
            <img className="talk_btn" src={talk} />
            <img className="like_btn" src={like} />
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
  height: 420px;
  border-radius: 12px;

  margin: 0 auto;
  margin-top: 30px;

  display: flex;
  flex-flow: column;

  box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
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

const StListProfile = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  border: 2px solid gray;
`;

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
