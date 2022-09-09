import { useNavigate } from "react-router-dom";

import logo from "../assets/svg/Logo_Cupick.svg";

import styled from "styled-components";

const Landing = () => {
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
    }, 2000)
  } else {
    setTimeout(()=>{
      navigate("/signIn")
    }, 2000)
  }
  
  return (
    <StWrap>
      <img src={logo} alt="커픽"/>
    </StWrap>
  )
}

export default Landing;

const StWrap = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`