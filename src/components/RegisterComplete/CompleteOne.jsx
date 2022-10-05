import React from "react";

import styled from "styled-components";
import styledElementComponents from "../../styles/customElementStyle";
const { CustomTitle } = styledElementComponents;

const CompleteOne = (props) => {
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

export default CompleteOne;

const StDiv = styled.div``;

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

const StTitle = styled(CustomTitle)`
  width: 50%;
  margin-top: 6rem;
`;
