import React from "react";
import styled from "styled-components";
import RecipeListIngredient from "./RecipeListIngredient";

export const RecipeListContainer = (props) => {
  const { recipeId, ingredientList, title, cupSize } = props.recipes;
  return (
    <StList key={recipeId}>
      <StListWrap>
        <StListHead>
          <StListProfile></StListProfile>
          <StNickname>닉네임</StNickname>
        </StListHead>
        <StListContent>
          {ingredientList.map((ingredients) => (
            <RecipeListIngredient ingredients={ingredients} cupSize={cupSize} />
          ))}
        </StListContent>
        <StListTitle>
          {title}
          <StItemSet>
            <div>🖤</div>
            <div>💬</div>
          </StItemSet>
        </StListTitle>
      </StListWrap>
    </StList>
  );
};

const StList = styled.div`
  width: 300px;
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

  padding-left: 10px;

  background-color: #ffffff;

  border-bottom: 2px solid #e6e6e6;
`;

const StItemSet = styled.div`
  display: flex;
  flex-flow: row;
`;
