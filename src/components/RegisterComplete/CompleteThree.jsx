import React from "react";

import styled from "styled-components";

import illustrationThree from "../../assets/image/illustration/illustration03.png";

const CompleteThree = () => {
  return (
    <StDiv>
      <div className="box">
        <h1>나만의 레시피를 만들고 모두와 공유해보아요!</h1>
      </div>
      <StImgBox>
        <StImg src={illustrationThree} alt="공유해보아요" />
      </StImgBox>
    </StDiv>
  );
};

export default CompleteThree;

const StDiv = styled.div`
  .box {
    width: 80%;
    margin-top: 60px;
  }
`;

const StImgBox = styled.div`
  width: 90%;
  max-width: 450px;
  padding-bottom: 100%;

  margin: -22px auto 0;

  display: block;
  position: relative;
`;

const StImg = styled.img`
  width: 100%;
  max-width: 450px;
  position: absolute;

  transform: scale(0.9);

  margin: 40px auto 0;

  display: block;
`;
