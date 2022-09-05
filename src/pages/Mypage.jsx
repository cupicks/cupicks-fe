import React from "react";
import styled from "styled-components";
import MypageBody from "../components/recipeMypage/MypageBody";

const Mypage = () => {
  return (
    <StWrap>
      <MypageBody />
    </StWrap>
  );
};

export default Mypage;

const StWrap = styled.div`
  width: 600px;
  height: 100vh;

  margin: 0 auto;

  border: 2px solid black;
  /* flex-direction: column;
  display: flex; */
`;
