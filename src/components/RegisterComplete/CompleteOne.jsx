import React from "react";

import styled from "styled-components";

import illustrationOne from "../../assets/image/illustration/illustration01.png";

const CompleteOne = () => {
  return (
    <StDiv>
      <div className="box">
        <h1>회원가입을 축하합니다!</h1>
      </div>
      <StImgBox>
        <StImg src={illustrationOne} alt="축하합니다" />
      </StImgBox>
    </StDiv>
  );
};

export default CompleteOne;

const StDiv = styled.div`
  .box {
    width: 14rem;
    margin-top: 6rem;
  }
`;

const StImgBox = styled.div`
  width: 90%;
  max-width: 45rem;
  padding-bottom: 100%;

  margin: 2rem auto 0;

  display: block;
  position: relative;
`;

const StImg = styled.img`
  width: 100%;
  max-width: 45rem;
  position: absolute;

  margin: 4rem auto 0;

  display: block;
`;
