import illustration05 from "../assets/image/illustration/illustration05.png";

import styled from "styled-components";

const Error = () => {
  return (
    <StWrap>
      <img src={illustration05} alt="커픽" />
      <div>
        <h1>죄송합니다😥</h1>
        <h2>잠시 서버 작업 중입니다.</h2>
      </div>
    </StWrap>
  );
};

export default Error;

const StWrap = styled.div`
  padding-top: 10%;
  text-align: center;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  h2 {
    color: #898989;
  }

  img {
    width: 50%;
  }
`;
