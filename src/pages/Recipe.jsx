import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapBody } = styledLayoutComponents;

import ToastMessage from "../components/elements/modal/ToastMessage";
import RecipeBody from "../components/recipeMain/RecipeBody";

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

  // 에러 페이지 만든 후 삭제하기
  // const [error, setError] = useState(false);
  // setError(false);

  return (
    <StWrapBody>
      {/* {error ? (
        <>
          <div className="error">
            <img src={illustration05} alt="커픽" />
            <h4>죄송합니다😥</h4>
            <h3>잠시 서버 수정 작업 중입니다.</h3>
          </div>
        </>
      ) : (
        <RecipeBody />
      )} */}
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
`;
