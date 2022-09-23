import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ToastMessage from "../components/elements/modal/ToastMessage";
import RecipeBody from "../components/recipeMain/RecipeBody";

const Recipe = () => {
  const location = useLocation();
  const [messageModal, setMessageModal] = useState(false);
  const messageText = location.state?.message;
  const timer = 1800;

  useEffect(() => {
    if (messageText !== undefined) {
      setMessageModal(true);
      setTimeout(() => {
        setMessageModal(false);
      }, timer);
    }
  }, []);

  return (
    <StWrap>
      <RecipeBody />

      {messageModal && (
        <ToastMessage text={messageText} smallFont={true} timer={timer} />
      )}
    </StWrap>
  );
};

export default Recipe;

const StWrap = styled.div`
  height: calc(100vh - 50px - 90px);

  overflow: hidden;
`;
