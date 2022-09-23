import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IngredientList from "./IngredientList";
import RecipeTitle from "../../recipeDetail/element/RecipeTitle";
import prfilePicSrc from "../../../assets/svg/profile.svg";

import styled from "styled-components";

const RecipeList = (props) => {
  const { recipeList, header = false } = props;
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);

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

  return (
    <>
      <StSlider {...settings}>
        {!recipeList && <h3 className="list_empty">레시피가 없습니다.</h3>}

        {recipeList?.map((recipe, i) => {
          return (
            // Slider의 자식은 inline-block
            <div
              className="slick_box"
              key={"slick_box" + i}
              onClick={onClickCard(recipe.recipeId)}
              // onClick={()=>navigate(`/recipe/${recipe.recipeId}/detail`)}
              // onTouchEnd={()=>navigate(`/recipe/${recipe.recipeId}/detail`)}
            >
              {header && (
                <StRecipeUserInfo>
                  <StProfilePic prfilePicSrc={recipe.resizedUrl} />
                  {recipe.nickname}
                </StRecipeUserInfo>
              )}

              <div className="flex_box">
                <StCupHeight
                  cupHeight={((recipe.cupSize / 591) * 100).toFixed(1)}
                >
                  <IngredientList key={i} recipe={recipe} />
                </StCupHeight>
                <div className="padding_box">
                  <RecipeTitle title={recipe.title} />
                </div>
              </div>
            </div>
          );
        })}
      </StSlider>
    </>
  );
};

export default RecipeList;

const StSlider = styled(Slider)`
  background-color: #fff;

  .slick_box {
    height: 40vh;
    border-radius: 16px;

    display: flex;
    flex-flow: column;
    justify-content: flex-end;

    overflow: hidden;

    box-shadow: -2px -2px 10px rgba(155, 155, 155, 0.1),
      3px 3px 8px rgba(0, 0, 0, 0.1);
  }

  .flex_box {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }

  .padding_box {
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
    text-align: center;
    color: #cdcdcd;
  }
`;

const StCupHeight = styled.div`
  height: ${(props) => props.cupHeight + "%"};
`;

const StRecipeUserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const StProfilePic = styled.div`
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  margin-right: 5px;

  position: relative;

  font-size: 14px;

  background: #eee url(${(props) => props.prfilePicSrc}) no-repeat center /
    cover;

  img {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
