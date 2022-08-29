import React from "react";
import styled from "styled-components";

const RecipeList = ({ recipe, setRecipe }) => {
  recipe = recipe.recipeList;
  return (
    <>
      {recipe.map((recipes) => (
        <div key={recipes.recipeId}>
          <ListWrap>
            <ListHead>
              <div></div>
              <div>닉네임</div>
              <div>...</div>
            </ListHead>
            <ListContent></ListContent>
            <ListTitle>{recipes.title}</ListTitle>
          </ListWrap>
        </div>
      ))}
    </>
  );
};

export default RecipeList;

const ListWrap = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;
  margin: 0 auto;
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
