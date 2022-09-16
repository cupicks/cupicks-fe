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
  .box {
    width: 70%;
    margin-top: 60px;
  }
`;

const StImg = styled.img`
  width: 90%;
  max-width: 450px;

  margin: 40px auto 0;
  
  display: block;
`;
