import { useNavigate } from "react-router-dom";

import logo from "../assets/image/logo/logo_Cupick.png";
import illustration05 from "../assets/image/illustration/illustration05.png";

import styled from "styled-components";

const NotFound = (props) => {
  const { message = "", timer = 1000 } = props;
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
    <StWrap>
      <img src={illustration05} alt="커픽" />
      <h4>{message ? message : "페이지를 찾을 수 없습니다."}</h4>
      <p>
        {message ? (
          <button
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            로그인 하러 가기
          </button>
        ) : (
          "잠시 후 이동합니다."
        )}
      </p>
    </StWrap>
  );
};

export default NotFound;

const StWrap = styled.div`
  width: 100%;
  height: calc(100vh - 50px - 90px);

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  white-space: pre-wrap;

  h4 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.8;

    margin: 0;
    margin-top: -10px;
  }

  img {
    width: 45%;
  }

  button {
    color: #fff;
    background-color: #393939;
    border: none;
    border-radius: 5px;
    margin-top: 15px;
    padding: 10px 25px;
    font-size: 16px;
  }

  @media (max-width: 400px) {
    h4 {
      font-size: 12px;
    }
    button {
      font-size: 12px;
    }
  }
`;
