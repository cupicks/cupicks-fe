import React from "react";

import styled from "styled-components";
import styledElementComponents from "../../styles/customElementStyle";
const { CustomTitle } = styledElementComponents;

const CompleteStep = (props) => {
  const { text, imageSrc, alt } = props;
  return (
    <StDiv>
      <StTitle>
        <h1>{text}</h1>
      </StTitle>

      <StImgBox>
        <StImg src={imageSrc} alt={alt} />
      </StImgBox>
    </StDiv>
  );
};

export default CompleteStep;

const StDiv = styled.div``;

const StImgBox = styled.div`
  width: 90%;
  max-width: 45rem;
  padding-bottom: 100%;

  margin: 3rem auto 0;

  position: relative;
`;

const StImg = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const StTitle = styled(CustomTitle)`
  margin-top: 6rem;
  white-space: pre-wrap;
`;
