import React from "react";
import styled from "styled-components";
import AllRecipeListIngredient from "./AllRecipeListIngredient";

const AllRecipeListContainer = (props) => {
  const { recipeId, ingredientList, title, cupSize } = props.allrecipes;
  return (
    <div key={recipeId}>
      <StListWrap>
        <StListHead>
          <StListProfile></StListProfile>
          <StNickname>닉네임</StNickname>
          <div>...</div>
        </StListHead>
        <StListContent>
          {ingredientList.map((ingredients) => (
            <AllRecipeListIngredient
              ingredients={ingredients}
              cupSize={cupSize}
            />
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
    </div>
  );
};

export default AllRecipeListContainer;

// const StList = styled.div`
//   background-color: #fff;
// `;

const StListWrap = styled.div`
  width: 170px;
  height: 280px;
  border-radius: 12px;

  margin: 0 auto;
  margin-top: 5px;
  margin-left: 20px;

  display: flex;
  flex-flow: column;

  box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
`;

const StListHead = styled.div`
  height: 50px;

  display: flex;
  flex-flow: row;
  align-items: center;

  background-color: #ffffff;

  border-radius: 12px;
  /* border-top: 2px solid #e6e6e6; */
`;

const StListProfile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;

  border: 2px solid gray;

  margin-left: 10px;
`;

const StNickname = styled.div`
  margin-left: 10px;

  font-size: 13px;
`;

const StListContent = styled.div`
  height: 240px;

  display: flex;
  flex-flow: column-reverse;
`;

const StListTitle = styled.div`
  height: 30px;
  border-radius: 12px;

  padding-left: 5px;
  padding-bottom: 20px;

  display: flex;
  flex-flow: row;
  justify-content: space-between;

  background-color: #ffffff;

  border-bottom: 2px solid #e6e6e6;

  font-size: 14px;
`;

const StItemSet = styled.div`
  display: flex;
  flex-flow: row;
  gap: 8px;
`;
