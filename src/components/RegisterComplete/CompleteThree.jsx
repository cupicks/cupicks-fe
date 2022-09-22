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
  max-height: 430px;

  margin: 40px auto 0;

  display: block;
`;

const StImg = styled.img`
  width: 90%;
  max-width: 450px;

  margin: 40px auto 0;

  display: block;
`;
