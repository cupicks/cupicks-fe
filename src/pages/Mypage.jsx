import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useLocation } from "react-router-dom";

import api from "../server/api";

import MypageMyInfo from "../components/recipeMypage/MypageMyInfo";
import MypageRecipeLikeList from "../components/recipeMypage/MypageRecipeLikeList";
import MypageRecipeMyList from "../components/recipeMypage/MypageRecipeMyList";

import styled from "styled-components";
import ToastMessage from "../components/elements/modal/ToastMessage";

const Mypage = () => {
  const location = useLocation();
  const [messageModal, setMessageModal] = useState(false);
  const [profiles, setProfiles] = useState();
  const messageText = location.state?.message;

  const token = localStorage.getItem("refreshToken");
  const { decodedToken } = useJwt(token);
  let userData = decodedToken;

  const getProfile = async () => {
    const contentType = "application/json";
    try {
      const res = await api(contentType).get("/profile/my-profile");
      console.log(res.data.user);
      // setProfiles([...profiles, res.data.user]);
      setProfiles(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(profiles);
  useEffect(() => {
    if (messageText !== undefined) {
      setMessageModal(true);
      setTimeout(() => {
        setMessageModal(false);
      }, 1500);
    }
  }, []);
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <StWrap>
      {messageModal && <ToastMessage text={messageText} timer={1500} />}
      {userData !== null && (
        <>
          <MypageMyInfo token={token} userData={userData} profiles={profiles} />
          <MypageRecipeMyList on={true} />
          <MypageRecipeLikeList />
          <div></div>
        </>
      )}
    </StWrap>
  );
};

export default Mypage;

const StWrap = styled.div`
  height: calc((var(--vh, 1vh) * 100) - 5rem - 9rem);
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

const StProfileImageBox = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;

  margin-right: 0.2rem;

  display: flex;
  overflow: hidden;

  background: #ccc;

  .content_pic {
    width: 100%;
    object-fit: cover;
  }
`;
