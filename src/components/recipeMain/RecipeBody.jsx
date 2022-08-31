import React, { useState } from "react";
import styled from "styled-components";
import RecipeList from "./RecipeList";

const RecipeBody = () => {
  const start = {
    isSuccess: true,
    message: "레시피 조회에성공하셨습니다",
    nickname: "바다",
    recipeList: [
      {
        recipeId: 1,
        title: "카페라떼",
        content: "레시피 내용",
        isIced: true,
        cupSize: 355,
        nickname: "창용",
        ingredientList: [
          {
            ingredientName: "연유",
            ingredientColor: "#123456",
            ingredientAmount: 100,
          },
          {
            ingredientName: "커피",
            ingredientColor: "#df18b4",
            ingredientAmount: 120,
          },
          {
            ingredientName: "시럽",
            ingredientColor: "#9db3c9",
            ingredientAmount: 100,
          },
        ],
      },
      {
        recipeId: 2,
        title: "카페모카",
        content: "레시피 내용",
        isIced: true,
        cupSize: 355,
        nickname: "창순",
        ingredientList: [
          {
            ingredientName: "연유",
            ingredientColor: "#123456",
            ingredientAmount: 100,
          },
          {
            ingredientName: "원두",
            ingredientColor: "#d10a0a",
            ingredientAmount: 85,
          },
          {
            ingredientName: "모카모카",
            ingredientColor: "#3222c9",
            ingredientAmount: 100,
          },
        ],
      },
      {
        recipeId: 3,
        title: "콜드브루",
        content: "레시피 내용",
        isIced: true,
        cupSize: 355,
        nickname: "현지",
        ingredientList: [
          {
            ingredientName: "연유",
            ingredientColor: "#123456",
            ingredientAmount: 100,
          },
          {
            ingredientName: "커피",
            ingredientColor: "#24b922",
            ingredientAmount: 120,
          },
          {
            ingredientName: "시럽",
            ingredientColor: "#c44d4d",
            ingredientAmount: 100,
          },
        ],
      },
      {
        recipeId: 4,
        title: "카라멜마키아또",
        content: "레시피 내용",
        isIced: true,
        cupSize: 473,
        nickname: "정우",
        ingredientList: [
          {
            ingredientName: "연유",
            ingredientColor: "#123456",
            ingredientAmount: 150,
          },
          {
            ingredientName: "카라멜시럽",
            ingredientColor: "#1eb4b9",
            ingredientAmount: 120,
          },
          {
            ingredientName: "원두",
            ingredientColor: "#aebd29",
            ingredientAmount: 100,
          },
        ],
      },
      {
        recipeId: 5,
        title: "연유라떼",
        content: "레시피 내용",
        isIced: true,
        cupSize: 591,
        nickname: "우찬",
        ingredientList: [
          {
            ingredientName: "커피",
            ingredientColor: "#b22336",
            ingredientAmount: 75,
          },
          {
            ingredientName: "연유",
            ingredientColor: "#1e9b2d",
            ingredientAmount: 80,
          },
          {
            ingredientName: "물",
            ingredientColor: "#2082e4",
            ingredientAmount: 110,
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
  font-size: 30px;
  align-items: center;
  display: flex;
`;
