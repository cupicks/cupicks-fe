import React, { useEffect, useState, memo } from "react";

import styled from "styled-components";

import RecipeSilder from "./element/RecipeSilder";
import RecipeListToggle from "./element/RecipeListToggle";

import api from "../../server/api";

const MypageRecipeLikeList = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [cancelLike, setCancelLike] = useState(false);

  // 페이지네이션 재료
  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(3);

  const Recipefetching = async () => {
    let contentType = "application/json";

    try {
      const response = await api(contentType)
        .get(`/profile/like-recipe?page=1&count=50`)
        .then((res) => {
          console.log(res);
          setRecipeList([...recipeList, ...res.data.recipeList]);
        });
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Recipefetching();
  }, []);

  return (
    <>
      {loaded && (
        <StMypageRecipeWrap>
          <RecipeListToggle>좋아요 레시피</RecipeListToggle>
          <div className="toggleContents">
            <RecipeSilder
              recipeList={recipeList}
              setRecipeList={setRecipeList}
              header={true}
              Recipefetching={Recipefetching}
              setCancelLike={setCancelLike}
            />
          </div>
        </StMypageRecipeWrap>
      )}
    </>
  );
};

export default MypageRecipeLikeList;

const StMypageRecipeWrap = styled.div``;
