import logo from "../assets/image/logo/logo_Cupick.png";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <StWrap>
      <StLogo 
        src={logo}
        onClick={()=>navigate('/')}
      />
    </StWrap>
  );
};

export default Header;

const StWrap = styled.header`
  height: 50px;

  padding: 0 20px;

  display: flex;

  background-color: #ffffff;
`;

const StLogo = styled.div`
  width: 120px;
  height: 100%;
  
  background: url(${props=>props.src}) no-repeat center / contain;
  transition: all .4s;

  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;
