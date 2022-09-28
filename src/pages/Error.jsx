import { useNavigate } from "react-router-dom";

import illustration05 from "../assets/image/illustration/illustration05.png";

import styled from "styled-components";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <StWrap>
      <img src={illustration05} alt="커픽" />
      <h4>죄송합니다😥</h4>
      <h3>잠시 서버 작업 중입니다.</h3>
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
