import React from "react";

import styled from "styled-components";

import illustrationTwo from "../../assets/image/illustration/illustration02.png";

const CompleteTwo = () => {
  return (
    <StDiv>
      <div className="box">
        <h1>계량없이 이미지만 따라 만들어보세요!</h1>
      </div>
      <StImgBox>
        <StImg src={illustrationTwo} alt="만들어보세요" />
      </StImgBox>
    </StDiv>
  );
};

export default CompleteTwo;

const StDiv = styled.div`
  .box {
    width: 70%;
    margin-top: 60px;
  }
`;

const StImgBox = styled.div`
  width: 90%;
  max-width: 450px;
  padding-bottom: 100%;

  margin: 20px auto 0;

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
