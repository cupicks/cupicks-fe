import { useNavigate } from "react-router-dom";

import logo from "../assets/image/logo/logo_Cupick.png";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapFullVH } = styledLayoutComponents;

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
    return clearTimeout();
  }, timer);

  return (
    <StWrap>
      <img src={logo} alt="커픽" />
    </StWrap>
  );
};

export default Landing;

const StWrap = styled(CustomWrapFullVH)`
  img {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);

    width: 50%;
    margin: 0 auto;
  }
`;
