import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import colorLists from '../../../util/recipeIngrediantColorList'

import RecipeIngredientColorList from "./RecipeIngredientColorList";

import styled from "styled-components";

const RecipeIngredientColorLists = (props) => {
  const {idx, formProps} = props
  const {register} = formProps

  const currFleidName = `ingredientList.${idx}.ingredientColor`

  const settings = {
    dots: true,
    infinite: false,
    lazyload: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true
  };

	return (
    <div className="container">
      <StSlick>
        <Slider {...settings}>
          {colorLists.map((colorList, i)=>{
            return (
              <RecipeIngredientColorList
                key={i}
                colorList={colorList}
                name={currFleidName}
                register={register}
              />
            )
          })}
        </Slider>
      </StSlick>
      <div>
      </div>
    </div>
  )
}

export default RecipeIngredientColorLists;

const StSlick = styled.div`
  width: 100%;
  height: 80px;
  
  position: absolute;
  left: 0;

  .slick-dots {
    bottom: -30px;
  }
`