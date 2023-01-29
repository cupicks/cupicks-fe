import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";
import RecipeSlickBox from "./RecipeSlickBox";
import { useRef } from "react";

const RecipeSlider = (props) => {
  const { recipeList, header = false, bannerImage, nextPage } = props;
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [countRecipeList, setCountRecipeList] = useState(recipeList?.length);
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });

  const sliderRef = useRef();
  const sliderState = sliderRef.current?.innerSlider.state;
  const slideIndex = recipeList.length - 1 - 2;

  const onSwipeHandler = () => {
    if (sliderState) {
      const { currentSlide } = sliderState;
      if (currentSlide !== 0 && currentSlide >= slideIndex) nextPage();
    }
  };

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
    onSwipeHandler();
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onClickCard = useCallback(
    (path) => (e) => {
      if (dragging) {
        e.stopPropagation();
        return;
      }
      if (path) {
        navigate(`/recipe/${path}/detail`);
      }
    },
    [dragging],
  );

  const settings = {
    draggable: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    onSwipe: onSwipeHandler,
    centerMode: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
  };

  // 브라우저 너비에 따라서 글자 수를 자릅니다.
  const windowWidth = windowSize.width;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  return (
    <>
      {(recipeList?.length === 0 || countRecipeList === 0) && (
        <StListEmpty>
          <img src={bannerImage} alt="레시피가 없습니다." />
        </StListEmpty>
      )}
      <StSlider {...settings} ref={sliderRef} header={header}>
        {recipeList?.map((recipe, i) => {
          const title = recipe.title;
          let titleText = title;
          if (title.length > 10) {
            titleText = title.slice(0, 10) + "..";
          }

          if (windowWidth < 450) {
            if (title.length > 6) {
              titleText = title.slice(0, 6) + "..";
            }
          } else if (windowWidth < 600) {
            if (title.length > 8) {
              titleText = title.slice(0, 8) + "..";
            }
          }

          return (
            <RecipeSlickBox
              key={"slick_box" + i}
              header={header}
              onClickCard={onClickCard}
              recipe={recipe}
              titleText={titleText}
              setCountRecipeList={setCountRecipeList}
              countRecipeList={countRecipeList}
            />
          );
        })}
      </StSlider>
    </>
  );
};

export default RecipeSlider;

const StSlider = styled(Slider)`
  background-color: #fff;
  height: ${(props) =>
    props.header
      ? "calc(40vh + 5rem + (1.2rem * 2))"
      : "calc(40vh + (1.2rem * 2))"};
  overflow: hidden;

  .padding_box {
    min-height: 4.2rem;
    padding: 1.1rem 1.5rem 1.2rem;

    & * {
      font-weight: 700;
      font-size: 1.4rem;
      padding: 0;
    }

    img {
      width: 1.8rem;
    }
  }

  .slick-list {
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    overflow: visible;
  }

  .slick-slide {
    position: relative;
    padding: 1.2rem;
  }

  .slide {
    height: 40vh;

    background-color: #aaa;
  }
`;

const StListEmpty = styled.p`
  width: 100%;
  padding-bottom: 4rem;

  font-size: 1.7rem;
  text-align: center;

  color: #cdcdcd;
  background-color: #fff;

  img {
    width: 50%;
  }
`;
