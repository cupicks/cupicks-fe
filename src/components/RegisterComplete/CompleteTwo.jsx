import React from "react";

import styled from "styled-components";

import illustrationTwo from "../../assets/image/illustration/illustration02.png";

const CompleteTwo = () => {
  return (
    <StDiv>
      <div className="box">
        <h1>계량없이 이미지만 따라 만들어보세요!</h1>
      </div>
      <StImg src={illustrationTwo} alt="만들어보세요" />
    </StDiv>
  );
};

export default CompleteTwo;

const StDiv = styled.div`
  position: relative;
  .box {
    width: 300px;
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
