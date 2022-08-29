import React, { useState } from "react";
import styled from "styled-components";
import RecipeList from "./RecipeList";

const RecipeBody = () => {
  const start = {
    isSuccess: true,
    message: "레시피 조회에성공하셨습니다",
    recipeList: [
      {
        recipeId: 1,
        title: "레시피 이름",
        content: "레시피 내용",
        ingredientList: [
          {
            ingredientName: "음식 재료 이름",
            ingredientColor: "#123456",
            ingredientAmount: 10,
          },
        ],
      },
    ],
  };
  const [recipe, setRecipe] = useState(start);

  return (
    <Wrap>
      <RecipeTitle>이번주 인기 레시피</RecipeTitle>
      <RecipeList recipe={recipe} setRecipe={setRecipe} />
    </Wrap>
  );
};

export default RecipeBody;

const Wrap = styled.div`
  width: 600px;
  height: 800px;
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
`;

const RecipeTitle = styled.div`
  width: 600px;
  height: 100px;
  border: 2px solid green;
  font-size: 30px;
  align-items: center;
  display: flex;
`;
