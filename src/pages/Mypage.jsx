import React from "react";
import styled from "styled-components";
import MypageBody from "../components/recipeMypage/MypageBody";

const Mypage = () => {
  return (
    <Wrap>
      <MypageBody />
    </Wrap>
  );
};

export default Mypage;

const Wrap = styled.div`
  width: 600px;
  height: 100vh;
  border: 2px solid black;
  margin: 0 auto;
  /* flex-direction: column;
  display: flex; */
`;
