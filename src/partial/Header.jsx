import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <StWrap>
      <StLogo></StLogo>
    </StWrap>
  );
};

export default Header;

const StWrap = styled.header`
  width: 600px;
  height: 80px;

  margin: 0 auto;
  margin-top: 20px;

  display: flex;
  flex-flow: row;
  align-items: center;

  background-color: #ffffff;
`;

const StLogo = styled.div`
  width: 250px;
  height: 60px;

  background-image: url("/assets/image/Logo.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

// const StTitle = styled.div`
//   width: 200px;
//   height: 100px;

//   margin-left: 15px;

//   display: flex;
//   flex-flow: row;
//   align-items: center;
// `;

// const StName = styled.div`
//   width: 200px;
//   height: 80px;

//   font-size: 45px;
// `;
