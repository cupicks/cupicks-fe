import { useNavigate } from "react-router-dom";

import logo from "../assets/image/logo/logo_Cupick.png";

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

  console.log(props);

  return (
    <StWrap>
      <img src={logo} alt="커픽" />
      <h4>{message ? message : "페이지를 찾을 수 없습니다."}</h4>
      <p>
        {message ? (
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            뒤로 가기
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
  gap: 10px;

  img {
    width: 45%;
    margin-bottom: 20px;
  }

  button {
    color: #fff;
    background-color: #393939;
    border: none;
    border-radius: 50px;
    margin-top: 15px;
    padding: 10px 25px;
  }
`;
