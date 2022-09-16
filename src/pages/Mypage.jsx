import { useEffect, useState } from "react";
import { useJwt } from 'react-jwt'

import MypageMyInfo from "../components/recipeMypage/MypageMyInfo";
import MypageRecipeLikeList from "../components/recipeMypage/MypageRecipeLikeList";
import MypageRecipeMyList from "../components/recipeMypage/MypageRecipeMyList";

// import TokenService from '../server/token.service'

import styled from "styled-components";

const Mypage = () => {
  const [loaded, setLoaded] = useState(false)

  const token = localStorage.getItem('refreshToken')
  const {decodedToken} = useJwt(token);
  let userData = decodedToken;
  
  return (
    <StWrap>
      {userData !== null &&
        <>
          <MypageMyInfo token={token} userData={userData} />
          <MypageRecipeMyList on={true} />
          
          {/* 좋아요 리스트: MVP이후 작업 */}
          {/* <MypageRecipeLikeList />  */}
          {/* ************************* */}
          <div></div>
        </>
      }
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
