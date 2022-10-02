import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapBody } = styledLayoutComponents;

import ToastMessage from "../components/elements/modal/ToastMessage";
import RecipeBody from "../components/recipeMain/RecipeBody";
import UserGuide from "../components/userGuide/UserGuide";

const Recipe = () => {
  const location = useLocation();
  const [messageModal, setMessageModal] = useState(false);
  const messageText = location.state?.message;
  const timer = 1200;

  // Location replace 성공하면 다시 살리기
  // useEffect(() => {
  //   if (messageText !== undefined) {
  //     setMessageModal(true);
  //     setTimeout(() => {
  //       setMessageModal(false);
  //       clearTimeout();
  //     }, timer);
  //   }
  // }, []);

  return (
    <StWrapBody>
      <UserGuide />

      <RecipeBody />

      {messageModal && (
        <ToastMessage text={messageText} smallFont={true} timer={timer} />
      )}
    </StWrapBody>
  );
};

export default Recipe;

const StWrapBody = styled(CustomWrapBody)`
  .error {
    width: 100%;
    text-align: center;
    img {
      width: 50%;
    }
  }

  overflow: auto;
`;
