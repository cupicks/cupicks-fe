import React from "react";
import styled from "styled-components";
// import { useLocation } from "react-router-dom";

const Footer = () => {
  // const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <Wrap>
      <ButtonSet>
        <MyPageBtn></MyPageBtn>
        <MainBtn></MainBtn>
      </ButtonSet>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.footer`
  width: 600px;
  height: 200px;
  margin: 0 auto;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  display: flex;
  align-items: center;
  background-color: ghostwhite;
`;

const ButtonSet = styled.div`
  width: 400px;
  height: 100px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const MyPageBtn = styled.button`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 2px solid black;
`;

const MainBtn = styled.button`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 2px solid black;
`;
