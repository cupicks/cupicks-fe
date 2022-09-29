import { useNavigate } from "react-router-dom";

import illustration05 from "../assets/image/illustration/illustration05.png";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapBody } = styledLayoutComponents;
import styledFormComponents from "../styles/customFormStyle";
const { CustomButton } = styledFormComponents;

const NotFound = (props) => {
  const { message = "", timer = 1500 } = props;
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken");

  setTimeout(() => {
    if (refreshToken) {
      navigate("/recipe");
    } else {
      navigate("/sign-in");
    }
  }, timer);

  return (
    <StWrapBody>
      <img src={illustration05} alt="커픽" />
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
          "잠시 후 이동합니다."
        )}
      </p>
    </StWrapBody>
  );
};

export default NotFound;

const StWrapBody = styled(CustomWrapBody)`
  text-align: center;
  padding: 0 1.5rem;

  img {
    margin-top: 15vh;
    width: 45%;
    transform: translateY(2rem);
  }
`;
