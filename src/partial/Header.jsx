import React from "react";
import styled from "styled-components";
import logo from "../assets/svg/Logo_Cupick.svg";

const Header = () => {
  return (
    <StWrap>
      <StLogo src={logo}></StLogo>
    </StWrap>
  );
};

export default Header;

const StWrap = styled.header`
  width: 100%;
  height: 80px;

  margin: 0 auto;

  padding-left: 30px;

  display: flex;
  flex-flow: row;
  align-items: center;

  background-color: #ffffff;
`;

const StLogo = styled.img`
  width: 100px;
  height: 60px;

  /* background-size: contain;
  background-position: center;
  background-repeat: no-repeat; */
`;
