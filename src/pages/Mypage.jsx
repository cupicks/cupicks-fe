import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useLocation } from "react-router-dom";

import MypageMyInfo from "../components/recipeMypage/MypageMyInfo";
import MypageRecipeLikeList from "../components/recipeMypage/MypageRecipeLikeList";
import MypageRecipeMyList from "../components/recipeMypage/MypageRecipeMyList";

// import TokenService from '../server/token.service'

import styled from "styled-components";
import ToastMessage from "../components/elements/modal/ToastMessage";

const Mypage = () => {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const messageText = location.state?.message;

  const token = localStorage.getItem("refreshToken");
  const { decodedToken } = useJwt(token);
  let userData = decodedToken;
  useEffect(() => {
    if (messageText !== undefined) {
      setMessageModal(true);
      setTimeout(() => {
        setMessageModal(false);
      }, 1500);
    }
  }, []);

  return (
    <StWrap>
      {messageModal && <ToastMessage text={messageText} timer={1500} />}
      {userData !== null && (
        <>
          <MypageMyInfo token={token} userData={userData} />
          <MypageRecipeMyList on={true} />

          {/* 좋아요 리스트: MVP이후 작업 */}
          <MypageRecipeLikeList />
          {/* ************************* */}
          <div></div>
        </>
      )}
    </StWrap>
  );
};

export default Mypage;

const StWrap = styled.div`
  height: calc(100vh - 50px - 90px);
  overflow-y: scroll;

  display: flex;
  flex-flow: column;
  gap: 10px;

  background-color: #eee;

  .toggleContents {
    width: 100%;
    max-height: 0;

    transition: all 1s;
    overflow: hidden;
  }

  div.on + .toggleContents {
    max-height: 100vh;
  }

  & > div:last-child {
    height: 100%;
    background-color: #fff;
  }
`;
