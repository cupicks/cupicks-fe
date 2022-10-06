import React, { useState, useEffect } from "react";

import RecipeList from "./RecipeList";
import AllRecipeList from "./AllRecipeList";
import RecipeSlider from "./element/RecipeSilder";

import styled from "styled-components";
import styledElementComponents from "../../styles/customElementStyle";
const { CustomRecipeListTitle } = styledElementComponents;

import api from "../../server/api";

const RecipeBody = (props) => {
  const { loggedIn } = props;
  const [favRecipe, setFavRecipe] = useState([]);
  const [AllRecipeOpen, setAllRecipeOpen] = useState(false);

  const BestRecipefetching = async () => {
    let contentType = "application/json";

    try {
      const response = await api(contentType)
        .get(`/ranking/weekly-recipe`)
        .then((res) => {
          console.log(res);
          setFavRecipe([...res.data.bestRecipeList]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    BestRecipefetching();
  }, []);

  const openAllRecipe = () => {
    setAllRecipeOpen(!AllRecipeOpen);
  };

  return (
    <StWrap>
      {/* <StRecipeTitle>이번주 인기 레시피</StRecipeTitle> */}
      <CustomRecipeListTitle>
        <h1>이번주 인기 레시피</h1>
      </CustomRecipeListTitle>

      <RecipeSlider loggedIn={loggedIn} recipeList={favRecipe} header={true} />

      {/* <StAllRecipeTitle>최신순 ▼</StAllRecipeTitle>

      {/* 임시 타이틀 */}
      <CustomRecipeListTitle>
        <h1>전체 레시피</h1>
      </CustomRecipeListTitle>

      <AllRecipeList loggedIn={loggedIn} />
    </StWrap>
  );
};

export default RecipeBody;

const StWrap = styled.div`
  width: 100%;

  display: flex;
  flex-flow: column;

  position: relative;

  overflow: hidden;
`;
