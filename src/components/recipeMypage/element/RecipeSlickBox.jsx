import React, { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IngredientList from "./IngredientList";
import RecipeTitle from "./RecipeTitle";

import styled from "styled-components";
import { useRef } from "react";

const RecipeSlickBox = (props) => {
  const { header, onClickCard, recipe, titleText } = props;
  const [showSlickBox, setShowSlickBox] = useState(true);
  const currentSlickBox = useRef();

  const headerElement = header ? (
    <StRecipeUserInfo>
      <StProfilePic prfilePicSrc={recipe.resizedUrl} />
      {recipe.nickname}
    </StRecipeUserInfo>
  ) : (
    ""
  );

  const handleOnClickSlickBox = () => {
    setShowSlickBox(false);
    currentSlickBox.current.parentElement.parentElement.remove();
  };

  return (
    // header, onClick, recipe, titleText // Slider의 자식은 inline-block
    <>
      {showSlickBox && (
        <StSlickBox
          isTitle={header}
          ref={currentSlickBox}
          onClick={onClickCard(recipe.recipeId)}
        >
          {headerElement}

          <div className="flex_box">
            <StCupHeight cupHeight={((recipe.cupSize / 591) * 100).toFixed()}>
              <IngredientList recipe={recipe} />
            </StCupHeight>
            <div className="padding_box">
              <RecipeTitle
                recipeId={recipe.recipeId}
                title={titleText}
                header={header}
                liked={recipe.isLiked}
                handleOnClickSlickBox={handleOnClickSlickBox}
              />
            </div>
          </div>
        </StSlickBox>
      )}
    </>
  );
};

export default RecipeSlickBox;

const StSlickBox = styled.div`
  height: ${(props) => (props.isTitle ? "calc(40vh + 50px)" : "40vh")};
  border-radius: 16px;

  display: flex;
  flex-flow: column;
  justify-content: flex-end;

  overflow: hidden;

  box-shadow: -2px -2px 10px rgba(155, 155, 155, 0.1),
    3px 3px 8px rgba(0, 0, 0, 0.1);

  .flex_box {
    height: ${(props) => (props.isTitle ? "calc(100% - 50px)" : "100%")};
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
  }
`;

const StCupHeight = styled.div`
  height: ${(props) => "calc(" + props.cupHeight + "% - 42px)"};
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
