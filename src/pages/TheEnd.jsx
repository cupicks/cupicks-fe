import illustration05 from "../assets/image/illustration/illustration05.png";
import logo from "../assets/image/logo/logo_Cupick.png";

import styled from "styled-components";
import styledFormComponents from "../styles/customFormStyle";
import { useNavigate } from "react-router-dom";
const { CustomButton } = styledFormComponents;

const Error = () => {
  const navigate = useNavigate();

  return (
    <StWrap>
      <img src={logo} alt="로고" />
      <div></div>
      <img src={illustration05} alt="커픽" />
      <div className="flex-box">
        <h1>☕ Cupick 서비스가 종료되었습니다.☕</h1>
        <h2 style={{ marginBottom: "0.5em" }}>
          2023년 1월 29일, 공식적으로 서비스를 종료합니다.
        </h2>
        <h2 className="goodbye" style={{ marginBottom: "10%", color: "#888" }}>
          <span></span>
          42일, 또는 그 이상 Cupick을 함께 작업한 팀원분들 너무
          고생하셨습니다.😄 인생이라는 항해를 하면서 모두 멋진 사람, 또는 좋은
          개발자가 되어서 다시 만날 수 있을 거라고 믿습니다.🏄‍♀️
        </h2>

        <CustomButton>
          <a href="https://github.com/cupicks" target="_blank">
            Cupick 깃허브 바로가기
          </a>
        </CustomButton>
        <CustomButton
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          이전 메인으로 바로가기
        </CustomButton>
      </div>
    </StWrap>
  );
};

export default Error;

const StWrap = styled.div`
  height: 100vh;
  background: linear-gradient(#898989 10%, white 50%);

  text-align: center;

  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;

  h2 {
    color: #898989;
    line-height: 1.8;
  }

  img {
    width: 40%;
    max-width: 300px;

    display: block;
    margin: 0 auto;
  }

  .flex-box {
    max-width: 70%;
    display: flex;
    flex-flow: column;
    gap: 1em;
  }

  a {
    color: #fff;
  }

  span {
    padding: 0 5px;
  }

  .goodbye {
    text-align: left;
    word-break: break-all;
  }
`;
