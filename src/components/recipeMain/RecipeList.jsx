import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { RecipeListContainer } from "./RecipeListContainer";

const RecipeList = ({ favRecipe, setFavRecipe }) => {
  favRecipe = favRecipe.recipeList;
  const settings = {
    centerMode: true,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    speed: 500,
    nextArrow: <Div>&gt</Div>,
    prevArrow: <DivPre>&lt</DivPre>,
  };
  return (
    <>
      <StyledSlider {...settings}>
        {favRecipe.map((recipes) => (
          <RecipeListContainer recipes={recipes} />
        ))}
      </StyledSlider>
    </>
  );
};

export default RecipeList;

const StyledSlider = styled(Slider)`
  width: 100vw;
  position: relative;

  .slick-prev::before {
    opacity: 1;
    /* display: none; */
  }
  .slick-next::before {
    opacity: 1;
    /* display: none; */
  }

  .slick-slide div {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 14px;
  }
  .slick-list {
    /* position: absolute; */
    /* width: 40vw; */
    /* width: 390px; */
    width: 100vw;
    margin: 0 auto;
  }
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 16px;
  z-index: 99;
  text-align: right;
  line-height: 30px;
`;

const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 16px;
  z-index: 99;
  text-align: left;
  line-height: 30px;
`;
