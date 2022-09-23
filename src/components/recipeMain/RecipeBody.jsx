import React, { useState, useEffect } from "react";

import RecipeList from "./RecipeList";
import AllRecipeList from "./AllRecipeList";

import styled from "styled-components";
// import api from "../../server/api";


const RecipeBody = () => {  

  // const [favRecipe, setFavRecipe] = useState([]);
  // const [AllRecipeOpen, setAllRecipeOpen] = useState(false);

  // const BestRecipefetching = async () => {
  //   let contentType = "application/json";

  //   try {
  //     const response = await api(contentType)
  //       .get(`/recipe/best`)
  //       .then((res) => {
  //         console.log(res);
  //         setFavRecipe([...favRecipe, ...res.data.recipeList]);
  //       });
  //     setLoaded(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   BestRecipefetching();
  // }, []);

  // const openAllRecipe = () => {
  //   setAllRecipeOpen(!AllRecipeOpen);
  // };

  return (
    <StWrap>
      {/* <StRecipeTitle>이번주 인기 레시피</StRecipeTitle>
      <RecipeList favRecipe={favRecipe} setFavRecipe={setFavRecipe} /> */}

      {/* <StAllRecipeTitle>최신순 ▼</StAllRecipeTitle> */}

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
