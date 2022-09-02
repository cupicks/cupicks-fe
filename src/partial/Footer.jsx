import React from "react";
import styled from "styled-components";
// import { useLocation } from "react-router-dom";

const Footer = () => {
  // const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <StWrap>
      <StButtonSet>
        <StMyPageBtn></StMyPageBtn>
        <CreateButton>+</CreateButton>
        <StMainBtn></StMainBtn>
      </StButtonSet>
    </StWrap>
  );
};

export default Footer;

const StWrap = styled.footer`
  width: 600px;
  height: 150px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  background-color: #eee;
`;

const StButtonSet = styled.div`
  width: 400px;
  height: 100px;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StMyPageBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  border: 2px solid black;
`;

const CreateButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;

  background-color: #393939;

  box-shadow: rgb(0 0 0 / 10%) 0px 1px 20px 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-80%);

  padding-bottom: 5px;

  color: white;
  font-size: 80px;
`;

const StMainBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  border: 2px solid black;
`;
