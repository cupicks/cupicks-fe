import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmBox from "../../elements/modal/ConfirmBox";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IngredientList from "./IngredientList";
import RecipeTitle from "./RecipeTitle";

import styled from "styled-components";
import RecipeSlickBox from "./RecipeSlickBox";

const RecipeSlider = (props) => {
  const { recipeList, loggedIn, header = false } = props;
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [countRecipeList, setCountRecipeList] = useState(recipeList?.length);
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
        e.stopPropagation();
        navigate(`/recipe/${path}/detail`);
      }
    },
    [dragging],
  );

  const settings = {
    draggable: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    dots: true,
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
  console.log(recipeList);

  // 모달을 보여주는 state.
  const [needLogginModal, setNeedLogginModal] = useState(false);
  // 모달이 작동하는 시간입니다.
  const gotoLogin = () => {
    navigate("/sign-in");
  };
  const cancelModal = () => {
    setNeedLogginModal(false);
  };
  const modalProps = {
    loggedIn,
    needLogginModal,
    setNeedLogginModal,
  };

  return (
    <>
      <StSlider {...settings}>
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
              modalProps={modalProps}
            />
          );
        })}
      </StSlider>
      {/* 토스트 메시지/모달 */}
      {needLogginModal && (
        <ConfirmBox
          text={"좋아요는 로그인이\n 필요한 기능입니다."}
          confirmButtonText={"로그인 하러 가기"}
          onComfirmed={gotoLogin}
          onDenied={cancelModal}
        />
      )}
    </>
  );
};

export default RecipeSlider;

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
`;

const StListEmpty = styled.p`
  width: 100%;
  padding-bottom: 5rem;

  font-size: 1.7rem;
  text-align: center;

  color: #cdcdcd;
  background-color: #fff;
`;
