import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from '../server/api'

import IsIcedIcon from "../components/recipeDetail/element/IsIcedIcon";
import IngredientsContainer from "../components/recipeDetail/IngredientsContainer";
import RecipeDesc from "../components/recipeDetail/RecipeDesc";
import Navigation from "../partial/Navigation";

import styled from "styled-components";

const RecipeDetail = () => {
  const {recipeId} = useParams()
  const [recipe, setRecipe] = useState('');

  const Recipefetching = async () => {
    let contentType = "application/json"

    try {
      const response = await api(contentType).get(`/recipes/${recipeId}`)
      setRecipe(response.data.recipe)
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(()=>{
    Recipefetching()
  }, [])

  return (
    <StWrap>
      
      {recipe &&
        <>
          <Navigation>
            <div className="icon_box fcc">
              <IsIcedIcon isIced={recipe.isIced} />
            </div>
          </Navigation>

          <IngredientsContainer recipe={recipe} />
          <RecipeDesc recipe={recipe} />
        </>
      }
    
    </StWrap>
  );
};

export default RecipeDetail;

const StWrap = styled.div`
  height: 100%;
  overflow-y: scroll;

  .icon_box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 4px;
    margin-right: 10px;

    background-color: #444;
    color: #fff;
  }
`