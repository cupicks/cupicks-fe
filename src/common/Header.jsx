import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrap>
      <Logo></Logo>
      <Title>
        <Name>Cupick</Name>
      </Title>
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  width: 500px;
  height: 100px;
  flex-direction: row;
  display: flex;
  border: 2px solid orange;
  margin: 0 auto;
  margin-top: 20px;
  align-items: center;
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid black;
  border-radius: 50%;
  margin-left: 10px;
`;

const Title = styled.div`
  width: 200px;
  height: 100px;
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.div`
  width: 200px;
  height: 80px;
  font-size: 45px;
`;
