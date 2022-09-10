import MypageMyInfo from "../components/recipeMypage/MypageMyInfo";
import MypageRecipeLikeList from "../components/recipeMypage/MypageRecipeLikeList";
import MypageRecipeMyList from "../components/recipeMypage/MypageRecipeMyList";

import styled from "styled-components";

const Mypage = () => {
  const userData = {
    nickname: '닉네임',
    imageUrl: 'image.png',
    userId: 1234
  }
  // const [toggleBetween, setToggleBetween] = {}

  return (
    <StWrap>
      <MypageMyInfo userData={userData} />
      <MypageRecipeMyList on={true} />
      <MypageRecipeLikeList />
      <div></div>
    </StWrap>
  );
};

export default Mypage;

const StWrap = styled.div`
  height: calc(100vh - 80px - 150px);
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
