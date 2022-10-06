import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IngredientList from "./IngredientList";
import RecipeTitle from "./RecipeTitle";

import styled from "styled-components";

const RecipeList = (props) => {
  const { recipeList, header = false } = props;
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
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
            // Slider의 자식은 inline-block
            <StSlickBox
              isTitle={header}
              key={"slick_box" + i}
              onClick={onClickCard(recipe.recipeId)}
            >
              {header && (
                <StRecipeUserInfo>
                  <StProfilePic prfilePicSrc={recipe.resizedUrl} />
                  {recipe.nickname}
                </StRecipeUserInfo>
              )}

              <div className="flex_box">
                <StCupHeight
                  cupHeight={((recipe.cupSize / 591) * 100).toFixed()}
                >
                  <IngredientList key={i} recipe={recipe} />
                </StCupHeight>
                <div className="padding_box">
                  <RecipeTitle recipeId={recipe.recipeId} title={titleText} />
                </div>
              </div>
            </StSlickBox>
          );
        })}
      </StSlider>
    </>
  );
};

export default RecipeList;

const StSlickBox = styled.div`
  height: ${(props) => (props.isTitle ? "calc(40vh + 5.0rem)" : "40vh")};
  border-radius: 1.6rem;

  display: flex;
  flex-flow: column;
  justify-content: flex-end;

  overflow: hidden;

  box-shadow: -0.2rem -0.2rem 1rem rgba(155, 155, 155, 0.1),
    0.3rem 0.3rem 0.8rem rgba(0, 0, 0, 0.1);

  .flex_box {
    height: ${(props) => (props.isTitle ? "calc(100% - 5.0rem)" : "100%")};
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }
`;

const StSlider = styled(Slider)`
  background-color: #fff;

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

  .list_empty {
    margin: 2rem 0 5rem;

    text-align: center;
    color: #cdcdcd;
  }
`;

const StCupHeight = styled.div`
  height: ${(props) => "calc(" + props.cupHeight + "% - 4.2rem)"};
`;

const StRecipeUserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
`;

const StProfilePic = styled.div`
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid #b6b6b6;

  margin-right: 1rem;

  position: relative;

  font-size: 1.4rem;

  background: #eee url(${(props) => props.prfilePicSrc}) no-repeat center /
    cover;

  img {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
