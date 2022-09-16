import { useNavigate } from "react-router-dom";

import createIcon from "../assets/svg/add.svg";
import {ReactComponent as MainIcon} from "../assets/svg/community.svg";
import {ReactComponent as MyPageIcon} from "../assets/svg/account.svg";

import styled from "styled-components";

const Footer = ({pathname}) => {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/recipe/create");
  };

  const goToMain = () => {
    navigate("/recipe");
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  return (
    <StWrap>

        <StButton onClick={goToMypage}>
          <div 
            className={pathname === '/mypage'?"svg_box on":"svg_box"}
          >
            <MyPageIcon />
          </div>
        </StButton>

        <StButtonGoToCreate onClick={goToCreate}>
          <img 
            src={createIcon} 
          />
        </StButtonGoToCreate>

        <StButton onClick={goToMain}>
          <div 
            className={pathname === '/recipe'?"svg_box on":"svg_box"}
          >
            <MainIcon />
          </div>
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
  
  fill: #cccccc;
  
  svg {
    transition: all .3s;
  }

  .svg_box.on {
    fill: #393939;
  }
`;

const StButton = styled.button`
  flex: 1 1 auto;

  padding-top: 12px;
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