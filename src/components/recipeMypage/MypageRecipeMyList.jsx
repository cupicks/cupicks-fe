import React, { useEffect, useState } from "react";

import styled from "styled-components";

import RecipeSilder from "./element/RecipeSilder";
import RecipeListToggle from "./element/RecipeListToggle";

import api from "../../server/api";

const MypageRecipeMyList = (props) => {
  const { on } = props;
  const [recipeList, setRecipeList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // 페이지네이션 재료
  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(3);

  const Recipefetching = async () => {
    let contentType = "application/json";

    try {
      const response = await api(contentType)
        .get(`/profile/my-recipe?page=1&count=50`)
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
          <RecipeListToggle on={on}>내가 만든 레시피</RecipeListToggle>
          <div className="toggleContents">
            <RecipeSilder
              recipeList={recipeList}
              setRecipeList={setRecipeList}
            />
          </div>
        </StMypageRecipeWrap>
      )}
    </>
  );
};

export default MypageRecipeMyList;

const StMypageRecipeWrap = styled.div``;
