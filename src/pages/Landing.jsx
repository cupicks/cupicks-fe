import { useNavigate } from "react-router-dom";

import logo from "../assets/image/logo/logo_Cupick.png";

import styled from "styled-components";

const Landing = () => {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");
  const timer = 10;

  setTimeout(() => {
    if (refreshToken) {
      navigate("/recipe");
    } else {
      navigate("/sign-in");
    }
  }, timer);

  return (
    <StWrap>
      <img src={logo} alt="커픽" />
    </StWrap>
  );
};

export default Landing;

const StWrap = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 50%;
  }
`;
