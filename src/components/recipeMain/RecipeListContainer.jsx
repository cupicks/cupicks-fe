import React from "react";
import styled from "styled-components";
import RecipeListIngredient from "./RecipeListIngredient";

export const RecipeListContainer = (props) => {
  const { recipeId, ingredientList, title, cupSize } = props.recipes;
  return (
    <div key={recipeId}>
      <ListWrap>
        <ListHead>
          <div></div>
          <div>닉네임</div>
          <div>...</div>
        </ListHead>
        <ListContent>
          {ingredientList.map((ingredients) => (
            <RecipeListIngredient ingredients={ingredients} cupSize={cupSize} />
          ))}
        </ListContent>
        <ListTitle>{title}</ListTitle>
      </ListWrap>
    </div>
  );
};

const ListWrap = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
  margin: 0 auto;
  margin-top: 30px;
`;

const ListHead = styled.div`
  width: 500px;
  height: 100px;
  flex-direction: row;
  display: flex;
`;

const ListContent = styled.div`
  width: 500px;
  height: 300px;
`;

const ListTitle = styled.div`
  width: 500px;
  height: 100px;
  flex-direction: row;
  display: flex;
  border: 2px solid black;
`;
