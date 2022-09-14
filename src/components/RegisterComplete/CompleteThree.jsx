import React from "react";

import styled from "styled-components";

import illustrationThree from "../../assets/image/illustration/illustration03.png";

const CompleteThree = () => {
  return (
    <StDiv>
      <div className="box">
        <h1>나만의 레시피를 만들고 모두와 공유해보아요!</h1>
      </div>
      <StImg src={illustrationThree} alt="공유해보아요" />
    </StDiv>
  );
};

export default CompleteThree;

const StDiv = styled.div`
  position: relative;
  .box {
    width: 350px;
    height: 84px;
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
