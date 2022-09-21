import { useNavigate } from "react-router-dom";

import logo from "../assets/image/logo/logo_Cupick.png";

import styled from "styled-components";

const NotFound = (props) => {
  const { message = "" } = props;
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");
  const timer = 1000;

  setTimeout(() => {
    if (refreshToken) {
      navigate("/recipe");
    } else {
      navigate("/sign-in");
    }
  }, timer);

  console.log(props);

  return (
    <StWrap>
      <img src={logo} alt="커픽" />
      <h4>{message ? message : "페이지를 찾을 수 없습니다."}</h4>
      <p>잠시 후 이동합니다.</p>
    </StWrap>
  );
};

export default NotFound;

const StWrap = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  img {
    width: 50%;
    margin-bottom: 20px;
  }
`;
