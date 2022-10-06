import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { RecipeListContainer } from "./RecipeListContainer";

const RecipeList = ({ favRecipe, setFavRecipe }) => {
  // favRecipe = favRecipe.recipeList;
  console.log(favRecipe);
  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    speed: 500,
    // beforeChange: handleBeforeChange,
    // afterChange: handleAfterChange,
  };
  return (
    <SlideWrap>
      <StyledSlider {...settings}>
        {favRecipe.map((recipes, i) => (
          <RecipeListContainer recipes={recipes} i={i} />
        ))}
      </StyledSlider>
    </SlideWrap>
  );
};

export default RecipeList;

const SlideWrap = styled.div`
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  /* width: 100vw; */
  /* position: relative; */

  /* .slick-slide div {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 14px;
  } */

  .slick-list {
    /* position: absolute; */
    /* width: 40vw; */
    /* width: 390px; */
    width: 85%;
    margin: 0 auto;
    overflow: visible;
  }

  .slick-slide {
    position: relative;
    padding: 5px;
  }

  .slide {
    height: 40vh;
    background-color: #aaa;
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
