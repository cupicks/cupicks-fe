import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";

const Test = () => {
  const settings = {
    slide: 'div',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true
  };

  const colorLists = [
    [
      '#ffffff','#000000','#3897ef','#7acffe','#c1e9ff','#b5f2bb','#92e172','#e8d0a3','#ae7948'
    ],
    [
      '#fee484','#fecda8','#f29d50','#ee714a','#f33d3d','#ffb1c8','#e1a6db','#d076de','#a63bd9'
    ],
    [
      '#262626','#353535','#555555','#737373','#999999','#b2b2b2','#c6c6c6','#d5d5d5','#ededed'
    ]
  ]
  

  return (
    <StSlick>
      <div className="eeeee">
        <Slider {...settings}>
          <div className="color_list">
            {colorLists[0].map(list => {
              return (
                <span>
                  {list}
                </span>
              )
            })}
          </div>
          <div className="color_list">
            {colorLists[1].map(list => {
              return (
                <span>
                  {list}
                </span>
              )
            })}
          </div>
          <div className="color_list">
            {colorLists[2].map(list => {
              return (
                <span>
                  {list}
                </span>
              )
            })}
          </div>
        </Slider>
      </div>
    </StSlick>
  )
}

export default Test

const StSlick = styled.div`
  background-color: red;

  .color_list {
    display: flex;
    flex-flow: column;

    height: 200px;
  }
`