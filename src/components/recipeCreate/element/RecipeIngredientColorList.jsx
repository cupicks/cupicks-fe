import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import RecipeIngredientColor from "./RecipeIngredientColor";

import styled from "styled-components";

const RecipeIngredientColorList = (props) => {
  const {colorLists, idx, register} = props

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true
  };

	return (
    <div className="container">
      <StSlick>
        <Slider {...settings}>
          <StRecipeIngredientColorList>
            {colorLists[0].map((color, i)=>{
              return (
                <RecipeIngredientColor
                  key={i}
                  color={color}
                  name={`ingredientList.${idx}.ingredientColor`}
                  register={register} 
                />
              )
            })}
          </StRecipeIngredientColorList>
          <StRecipeIngredientColorList>
            {colorLists[1].map((color, i)=>{
              return (
                <RecipeIngredientColor
                  key={i}
                  color={color}
                  name={`ingredientList.${idx}.ingredientColor`}
                  register={register} 
                />
              )
            })}
          </StRecipeIngredientColorList>
          <StRecipeIngredientColorList>
            {colorLists[2].map((color, i)=>{
              return (
                <RecipeIngredientColor
                  key={i}
                  color={color}
                  name={`ingredientList.${idx}.ingredientColor`}
                  register={register} 
                />
              )
            })}
          </StRecipeIngredientColorList>
        </Slider>
      </StSlick>
      <div>
      </div>
    </div>
  )
}

export default RecipeIngredientColorList;

const StSlick = styled.div`
  width: 100%;
  height: 80px;
  
  position: absolute;
  left: 0;
  `

const StRecipeIngredientColorList = styled.div`
  width: 100%;
  padding-top: 3px;

  input {
    position: absolute;
    /* opacity: 0;
    z-index: -9; */
  }

  label {
    transition: all .2s;
  }
  
  input:checked + .colorLabel {
    box-shadow: 0 2px 7px 3px rgba(45, 35, 53, 0.1);
    transform: translateY(-2px) scale(1.1);
  }
`