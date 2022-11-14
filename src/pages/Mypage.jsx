import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useLocation } from "react-router-dom";

import api from "../server/api";

import MypageMyInfo from "../components/recipeMypage/MypageMyInfo";
import MypageRecipe from "../components/recipeMypage/MypageRecipe";

import styled from "styled-components";
import ToastMessage from "../components/elements/modal/ToastMessage";

import noRecipeBanner01 from "../assets/image/illustration/banner_no-recipe01.png";
import noRecipeBanner02 from "../assets/image/illustration/banner_no-recipe02.png";

const Mypage = () => {
  const location = useLocation();
  const [profiles, setProfiles] = useState();
  const [messageModal, setMessageModal] = useState(false);
  const messageText = location.state?.message;

  const getProfile = async () => {
    const contentType = "application/json";
    try {
      const res = await api(contentType).get("/profile/my-profile");
      setProfiles(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

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
  
  const myRecipeProps = {
    isPagenation: true,
    pageInt: 1,
    countInt: 4,
    titleString: "내가 만든 레시피",
    imageSrc: noRecipeBanner01,
    apiUrl: "/profile/my-recipe",
    header: false,
  };

  const likeRecipeProps = {
    isPagenation: true,
    pageInt: 1,
    countInt: 4,
    titleString: "좋아요 레시피",
    imageSrc: noRecipeBanner02,
    apiUrl: "/profile/like-recipe",
    header: true,
  };

  return (
    <StWrap>
      {messageModal && <ToastMessage text={messageText} timer={1500} />}
      <MypageMyInfo profiles={profiles} />

      <MypageRecipe on={true} recipeProps={myRecipeProps} />
      <MypageRecipe recipeProps={likeRecipeProps} />
      
    </StWrap>
  );
};

export default Mypage;

const StWrap = styled.div`
  height: calc((var(--vh, 1vh) * 100) - 5rem - 9rem);

  overflow-y: scroll;

  display: flex;
  flex-flow: column;
  gap: 1rem;

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
