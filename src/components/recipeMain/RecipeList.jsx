import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { RecipeListContainer } from "./RecipeListContainer";

const RecipeList = ({ recipe, setRecipe }) => {
  recipe = recipe.recipeList;
  const settings = {
    centerMode: true,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,
  };
  return (
    <>
      <StyledSlider {...settings}>
        {recipe.map((recipes) => (
          <RecipeListContainer recipes={recipes} />
        ))}
      </StyledSlider>
    </>
  );
};

export default RecipeList;

const StyledSlider = styled(Slider)`
  /* .slick-slide div {
    height: 320px;
    width: 320px;
    outline: none;
    border: 2px solid black;
  } */

  .slick-prev:before {
    opacity: 1; // 기존에 숨어있던 화살표 버튼이 보이게
    color: black; // 버튼 색은 검은색으로
    left: 0;
  }

  .slick-next:before {
    opacity: 1;
    color: black;
  }
`;
