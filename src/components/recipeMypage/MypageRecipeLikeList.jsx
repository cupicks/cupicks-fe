import React, { useEffect, useState, memo } from "react";

import styled from "styled-components";

import RecipeSilder from "./element/RecipeSilder";
import RecipeListToggle from "./element/RecipeListToggle";

const MypageRecipeLikeList = () => {
  const [recipeList, setRecipeList] = useState();
  const [loaded, setLoaded] = useState(false);

  const response = {
    isSuccess: true,
    message: '레시피 조회에 성공하셨습니다.',
    recipeList: [
      {
        recipeId: 0,
        title: '레시피 이름',
        content:  '레시피 본문',
        isIced: true,
        cupSize: 355,
        createdAt: '2022-~~',
        updatedAt: '2022-~~',
        ingredientList: [
          {
            ingredientName: '음식 재료 이름',
            ingredientColor: '#123456',
            ingredientAmount: 300
          },
          {
            ingredientName: '음식 재료 이름',
            ingredientColor: 'tan',
            ingredientAmount: 55
          }
        ]
      },
      
      {
        recipeId: 1,
        title: '레시피 이름',
        content:  '레시피 본문',
        isIced: true,
        cupSize: 355,
        createdAt: '2022-~~',
        updatedAt: '2022-~~',
        ingredientList: [
          {
            ingredientName: '음식 재료 이름',
            ingredientColor: '#039432',
            ingredientAmount: 100
          },
          {
            ingredientName: '음식 재료 이름',
            ingredientColor: 'pink',
            ingredientAmount: 150
          }
        ]
      },
      
      {
        recipeId: 3,
        title: '레시피 이름',
        content:  '레시피 본문',
        isIced: true,
        cupSize: 355,
        createdAt: '2022-~~',
        updatedAt: '2022-~~',
        ingredientList: [
          {
            ingredientName: '음식 재료 이름',
            ingredientColor: '#fefe33',
            ingredientAmount: 50
          },
          {
            ingredientName: '음식 재료 이름',
            ingredientColor: 'skyblue',
            ingredientAmount: 20
          }
        ]
      }
    ]
  };

  useEffect(()=>{
    setRecipeList(response.recipeList)
    setLoaded(true)
  },[])

  return (
    <>
      {loaded &&
        <StMypageRecipeWrap>
          <RecipeListToggle>
            좋아요 레시피
          </RecipeListToggle>
          <div className="toggleContents">
            <RecipeSilder 
              recipeList={recipeList} 
              setRecipeList={setRecipeList}
              header={true} 
            />
          </div>
        </StMypageRecipeWrap>
      }
    </>
  )
};

export default MypageRecipeLikeList;

const StMypageRecipeWrap = styled.div`
`