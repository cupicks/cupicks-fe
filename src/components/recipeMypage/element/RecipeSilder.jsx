import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IngredientList from "./IngredientList";
import RecipeTitle from "./RecipeTitle";

import styled from "styled-components";
import RecipeSlickBox from "./RecipeSlickBox";

const RecipeList = (props) => {
  const { recipeList, header = false, setCancelLike } = props;
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  // const [cancelLike, setCancelLike] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
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
      <StSlider {...settings}>
        {recipeList?.length === 0 && (
          <h3 className="list_empty">레시피가 없습니다.</h3>
        )}

        {recipeList?.map((recipe, i) => {
          const title = recipe.title;
          let titleText = title;
          if (title.length > 11) {
            titleText = title.slice(0, 11) + "...";
          }

          if (windowWidth < 450) {
            if (title.length > 6) {
              titleText = title.slice(0, 6) + "...";
            }
          } else if (windowWidth < 500) {
            if (title.length > 7) {
              titleText = title.slice(0, 7) + "...";
            }
          }

          return (
            <RecipeSlickBox
              key={"slick_box" + i}
              header={header}
              onClickCard={onClickCard}
              recipe={recipe}
              titleText={titleText}
            />
          );
        })}
      </StSlider>
    </>
  );
};

export default RecipeList;

const StSlider = styled(Slider)`
  background-color: #fff;

  .padding_box {
    min-height: 42px;
    padding: 11px 20px 12px;

    & * {
      font-weight: 700;
      font-size: 14px;
      padding: 0;
    }

    img {
      width: 18px;
    }
  }

  .slick-list {
    width: 85%;
    margin: 0 auto;
    overflow: visible;
  }

  .slick-slide {
    position: relative;
    padding: 12px;
  }

  .slide {
    height: 40vh;

    background-color: #aaa;
  }

  .list_empty {
    margin: 2rem 0 5rem;

    text-align: center;
    color: #cdcdcd;
  }
`;
