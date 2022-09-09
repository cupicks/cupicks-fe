import { useNavigate } from "react-router-dom";

import createIcon from "../assets/svg/cancel.svg";
import mainIcon from "../assets/svg/language.svg";
import myPageIcon from "../assets/svg/account.svg";

import styled from "styled-components";

const Footer = (props) => {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/recipe/create");
    props.setLoaded(false);
  };

  const goToMain = () => {
    navigate("/recipe");
    props.setLoaded(false);
  };

  const goToMypage = () => {
    navigate("/mypage");
    props.setLoaded(false);
  };

  return (
    <StWrap>

        <StButton onClick={goToMypage}>
          <img src={myPageIcon} />
        </StButton>

        <StButtonGoToCreate onClick={goToCreate}>
          <img src={createIcon} />
        </StButtonGoToCreate>

        <StButton onClick={goToMain}>
          <img src={mainIcon} />
        </StButton>

    </StWrap>
  );
};

export default Footer;

const StWrap = styled.footer`
  width: 100%;
  height: 90px;

  display: flex;
  justify-content: space-between;

  position: relative;
`;

const StButton = styled.button`
  flex: 1 1 auto;

  padding-top: 10px;
  box-sizing: initial;
  
  display: flex;
  justify-content: center;
  
  border: none;
  background-color: #eee;
  
  cursor: pointer;
`;

const StButtonGoToCreate = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;

  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  
  border: none;
  background-color: transparent;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  
  cursor: pointer;
  overflow: hidden;
  
  img {
    width: 110px;
    
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;