import React, { useState, useEffect } from "react";

import RecipeList from "./RecipeList";
import AllRecipeList from "./AllRecipeList";

import styled from "styled-components";
import styledElementComponents from "../../styles/customElementStyle";
const { CustomRecipeListTitle } = styledElementComponents;

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
      <CustomRecipeListTitle>
        <h1>전체 레시피</h1>
      </CustomRecipeListTitle>

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

  position: relative;
`;
