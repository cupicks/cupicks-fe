import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";

import api from "../server/api";

import IsIcedIcon from "../components/recipeDetail/element/IsIcedIcon";
import IngredientsContainer from "../components/recipeDetail/IngredientsContainer";
import RecipeDesc from "../components/recipeDetail/RecipeDesc";
import Navigation from "../partial/Navigation";
import ToastMessage from "../components/elements/modal/ToastMessage";

import styled from "styled-components";

const RecipeDetail = () => {
  // location state로 메시지 모달창 출력
  const location = useLocation();
  const [messageModal, setMessageModal] = useState(false);
  const messageText = location.state?.message;
  const timer = 1800;
  const [needLoginModal, setNeedLoginModal] = useState(false);
  const modalProps = {
    needLoginModal,
    setNeedLoginModal,
    timer,
  };

  useEffect(() => {
    if (messageText !== undefined) {
      setMessageModal(true);
      setTimeout(() => {
        setMessageModal(false);
      }, timer);
    }
  }, []);

  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState("");

  const Recipefetching = useCallback(async () => {
    let contentType = "application/json";

    try {
      const response = await api(contentType).get(`/recipes/${recipeId}`);
      setRecipe(response.data.recipe);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [recipe.isLiked]);

  useEffect(() => {
    Recipefetching();
  }, []);
  return (
    <StWrap>
      {recipe && (
        <>
          <Navigation>
            <div className="fcc">
              <IsIcedIcon isIced={recipe.isIced} />
            </div>
          </Navigation>

          <IngredientsContainer recipe={recipe} />
          <RecipeDesc recipe={recipe} modalProps={modalProps} />
        </>
      )}
      {needLoginModal && (
        <ToastMessage
          text={"좋아요는 로그인이\n 필요한 기능입니다."}
          timer={timer}
        />
      )}
      {messageModal && <ToastMessage text={messageText} timer={timer} />}
    </StWrap>
  );
};

export default RecipeDetail;

const StWrap = styled.div`
  height: 100%;
  overflow-y: scroll;

  .icon_box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 4px;
    margin-right: 10px;

    background-color: #444;
    color: #fff;
  }
`;
