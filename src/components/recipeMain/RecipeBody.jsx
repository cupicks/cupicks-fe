import React, { useState } from "react";

import RecipeList from "./RecipeList";
import AllRecipeList from "./AllRecipeList";

import styled from "styled-components";

const RecipeBody = () => {
  // const colorLists = [
  //   [
  //   '#ffffff','#000000','#3897ef','#7acffe','#c1e9ff','#b5f2bb','#92e172','#e8d0a3','#ae7948'
  //   ],
  //   [
  //   '#fee484','#fecda8','#f29d50','#ee714a','#f33d3d','#ffb1c8','#e1a6db','#d076de','#a63bd9'
  //   ],
  //   [
  //   '#262626','#353535','#555555','#737373','#999999','#b2b2b2','#c6c6c6','#d5d5d5','#ededed'
  //   ]
  //   ]
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
            ingredientName: "물",
            ingredientColor: "#c1e9ff",
            ingredientAmount: 100,
          },
          {
            ingredientName: "커피",
            ingredientColor: "#ee714a",
            ingredientAmount: 120,
          },
          {
            ingredientName: "시럽",
            ingredientColor: "#fecda8",
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
            ingredientColor: "#c1e9ff",
            ingredientAmount: 100,
          },
          {
            ingredientName: "원두",
            ingredientColor: "#a8611f",
            ingredientAmount: 85,
          },
          {
            ingredientName: "모카모카",
            ingredientColor: "#ffc670",
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
            ingredientColor: "#c1e9fe",
            ingredientAmount: 100,
          },
          {
            ingredientName: "커피",
            ingredientColor: "#a8611f",
            ingredientAmount: 120,
          },
          {
            ingredientName: "시럽",
            ingredientColor: "#a0d680",
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
            ingredientColor: "#f33d3d",
            ingredientAmount: 150,
          },
          {
            ingredientName: "카라멜시럽",
            ingredientColor: "#ffb1c8",
            ingredientAmount: 120,
          },
          {
            ingredientName: "원두",
            ingredientColor: "#d076de",
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
            ingredientColor: "#f33d3d",
            ingredientAmount: 80,
          },
          {
            ingredientName: "물",
            ingredientColor: "#2082e4",
            ingredientAmount: 110,
          },
        ],
      },
      {
        recipeId: 6,
        title: "카페카페",
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
            ingredientColor: "#a63bd9",
            ingredientAmount: 80,
          },
          {
            ingredientName: "물",
            ingredientColor: "#c1e9ff",
            ingredientAmount: 110,
          },
        ],
      },
      {
        recipeId: 7,
        title: "옥수수콘",
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
      {
        recipeId: 8,
        title: "테스트8",
        content: "레시피 내용",
        isIced: true,
        cupSize: 591,
        nickname: "우찬",
        ingredientList: [
          {
            ingredientName: "커피",
            ingredientColor: "#262626",
            ingredientAmount: 75,
          },
          {
            ingredientName: "연유",
            ingredientColor: "#1e9b2d",
            ingredientAmount: 80,
          },
          {
            ingredientName: "물",
            ingredientColor: "#c1e9ff",
            ingredientAmount: 110,
          },
        ],
      },
      {
        recipeId: 9,
        title: "테스트9",
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
      {
        recipeId: 10,
        title: "테스트10",
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

  const [favRecipe, setFavRecipe] = useState(start);
  const [AllRecipeOpen, setAllRecipeOpen] = useState(false);

  // const openAllRecipe = () => {
  //   setAllRecipeOpen(!AllRecipeOpen);
  // };

  return (
    <StWrap>
      {/* <StRecipeTitle>이번주 인기 레시피</StRecipeTitle>
      <RecipeList favRecipe={favRecipe} setFavRecipe={setFavRecipe} />
      <StAllRecipeTitle>최신순 ▼</StAllRecipeTitle> */}

      {/* 임시 타이틀 */}
      <StRecipeTitle>전체 레시피</StRecipeTitle>
      
      <AllRecipeList />
    </StWrap>
  );
};

export default RecipeBody;

const StWrap = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: column;

  overflow: auto;
`;

// const StAllRecipeTitle = styled.div`
//   height: 50px;

//   margin-left: 45px;
//   margin-top: 30px;

//   display: flex;
//   align-items: center;

//   font-size: 18px;
//   font-weight: bold;

//   cursor: pointer;
// `;

const StRecipeTitle = styled.div`
  padding: 10px 25px 0;

  font-weight: 700;
  font-size: 17px;
  line-height: 150%;
`;
