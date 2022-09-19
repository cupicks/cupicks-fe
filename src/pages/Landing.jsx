import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

import logo from "../assets/image/logo/logo_Cupick.png";

import styled from "styled-components";

const Landing = () => {
  const navigate = useNavigate();

  const getTokens = () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    
    return [accessToken, refreshToken]
  }

  const tokens = getTokens()
  const timer = 10

  // tokens[1] === "refreshToken"
  const { decodedToken, isExpired } = useJwt(tokens[1]);
  if(isExpired){
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    navigate("/")
  }

  setTimeout(()=>{
    // tokens[0] === "accessToken"
    if(tokens[0]){
      navigate("/recipe")
    } else {
      navigate("/sign-in")
    }
  }, timer)
  
  return (
    <StWrap>
      <img src={logo} alt="커픽"/>
    </StWrap>
  )
}

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
`