import React, { useEffect, useState } from "react";

import styled from "styled-components";

import RecipeSilder from "./element/RecipeSilder";
import RecipeListToggle from "./element/RecipeListToggle";

import api from "../../server/api";

const MypageRecipe = (props) => {
  const { on = false, recipeProps } = props;
  const {
    isPagenation,
    pageInt,
    countInt,
    titleString,
    imageSrc,
    apiUrl,
    header,
  } = recipeProps;

  const [recipeList, setRecipeList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // 페이지네이션 재료
  const [page, setPage] = useState(pageInt);
  const [count, setCount] = useState(countInt);
  let pageEnd = false;

  const Recipefetching = async () => {
    let contentType = "application/json";

    try {
      const response = await api(contentType)
        .get(`${apiUrl}?page=${page}&count=${count}`)
        .then((res) => {
          console.log(res);

          if (res.data.recipeList.length === 0) {
            pageEnd = true;
            return;
          }
          setRecipeList([...recipeList, ...res.data.recipeList]);
        });
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const nextPage = () => {
    if (!pageEnd) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    Recipefetching();
  }, [page]);

  return (
    <>
      {loaded && (
        <StMypageRecipeWrap>
          <RecipeListToggle on={on}>{titleString}</RecipeListToggle>
          <div className="toggleContents">
            <RecipeSilder
              recipeList={recipeList}
              setRecipeList={setRecipeList}
              bannerImage={imageSrc}
              nextPage={nextPage}
              header={header}
            />
          </div>
        </StMypageRecipeWrap>
      )}
    </>
  );
};

export default MypageRecipe;

const StMypageRecipeWrap = styled.div``;
