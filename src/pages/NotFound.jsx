import { useNavigate } from "react-router-dom";

import logo from "../assets/image/logo/logo_Cupick.png";

import styled from "styled-components";

const NotFound = () => {
  const navigate = useNavigate();
  const getTokens = () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    
    return [accessToken, refreshToken]
  }

  const tokens = getTokens();
  
  if(tokens){
    setTimeout(()=>{
      navigate("/recipe")
    }, 1500)
  } else {
    setTimeout(()=>{
      navigate("/signIn")
    }, 1500)
  }

  return (
    <StWrap>
      <img src={logo} alt="커픽 로고"/>
      <h4>
        페이지를 찾을 수 없습니다.
      </h4>
      <p>
        잠시 후 이동합니다.
      </p>
    </StWrap>
  )
}

export default NotFound;

const StWrap = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`