import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../server/api";
import styled from "styled-components";

import RecipeEditWrap from "../components/recipeEdit/RecipeEditWrap";

const RecipeEdit = () => {
  const { recipeId } = useParams();
  const [fetchRecipe, setFetchRecipe] = useState("");
  const navigate = useNavigate();

  const Recipefetching = async () => {
    let contentType = "application/json";

    try {
      const response = await api(contentType).get(`/recipes/${recipeId}`);
      setFetchRecipe(response.data.recipe);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Recipefetching();
  }, []);

  return (
    <StWrap>
      <RecipeEditWrap fetchRecipe={fetchRecipe} />
    </StWrap>
  );
};

export default RecipeEdit;

const StWrap = styled.div`
  flex: 1 1 auto;
`;
