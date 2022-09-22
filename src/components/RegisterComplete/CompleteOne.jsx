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
    width: 140px;
    margin-top: 60px;
  }
`;

const StImgBox = styled.div`
  width: 100%;
  max-width: 450px;
  max-height: 430px;

  margin: 40px auto 0;

  display: block;
`;

const StImg = styled.img`
  width: 100%;
  max-width: 450px;

  margin: 40px auto 0;

  display: block;
`;
