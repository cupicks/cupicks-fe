import { useState } from "react";
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

  // const [error, setError] = useState(false);
  // setError(false);

  return (
    <StWrap>
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
    </StWrap>
  );
};

export default Recipe;

const StWrap = styled.div`
  height: calc(100vh - 50px - 90px);

  overflow: hidden;

  .error {
    width: 100%;
    text-align: center;
    img {
      width: 50%;
    }
  }
`;
