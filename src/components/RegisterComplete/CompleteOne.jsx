import React from "react";

import styled from "styled-components";

import illustrationOne from "../../assets/image/illustration/illustration01.png";

const CompleteOne = () => {
  return (
    <StDiv>
      <div className="box">
        <h1>회원가입을 축하합니다!</h1>
      </div>
      <StImg src={illustrationOne} alt="축하합니다" />
    </StDiv>
  );
};

export default CompleteOne;

const StDiv = styled.div`
  position: relative;
  .box {
    width: 140px;
    position: absolute;
    top: 102px;
    left: 24px;
  }
`;

const StImg = styled.img`
  width: 338px;
  height: 340px;
  position: absolute;
  top: 227px;
  left: 130px;
`;
