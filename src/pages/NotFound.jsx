import { useNavigate } from "react-router-dom";

import illustration05 from "../assets/image/illustration/illustration05.png";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapBody } = styledLayoutComponents;
import styledFormComponents from "../styles/customFormStyle";
const { CustomButton } = styledFormComponents;

const NotFound = (props) => {
  let { message = "", timer = 1500, type = "" } = props;
  const navigate = useNavigate();
  if (type === "notLoggedIn")
    message = "로그인 후에 사용가능한 기능이에요!\n 로그인하고 이용해볼까요?";

  return (
    <StWrapBody>
      <div className="image_box">
        <img src={illustration05} alt="커픽" />
      </div>
      <h3>{message ? message : "페이지가 없거나 접근할 수 없습니다."}</h3>
      <p>
        {message ? (
          <CustomButton
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            로그인 하러 가기
          </CustomButton>
        ) : (
          <CustomButton
            onClick={() => {
              navigate("/");
            }}
          >
            처음으로 가기
          </CustomButton>
        )}
      </p>
    </StWrapBody>
  );
};

export default NotFound;

const StWrapBody = styled(CustomWrapBody)`
  text-align: center;
  padding: 0 1.5rem;

  .image_box {
    margin-top: 5vh;
    height: 50%;
  }

  img {
    height: 100%;
  }

  h3 {
    margin-bottom: 2rem;
    transform: translateY(-0.3rem);

    font-size: 1.5rem;
    color: #898989;

    white-space: pre-wrap;
  }

  button {
    font-size: 1.7rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
