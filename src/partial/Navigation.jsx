import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import arrowBackIcon from "../assets/svg/arrow_back.svg";

const Navigation = (props) => {
  const { empty = false, goto="/" } = props;
  const navigate = useNavigate();

  return (
    <StNav>
      {!empty && (
        <div 
          className="button_goBack fcc" 
          onClick={() => navigate(goto)}
        >
          <img src={arrowBackIcon} alt="뒤로 가기 버튼" />
        </div>
      )}
      {props.children}

    </StNav>
  );
};

export default Navigation;

const StNav = styled.nav`
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;

  top: 0;

  background-color: #fff;
  color: #393939;

  min-height: 60px;
  line-height: 60px;
  z-index: 999;
  

  button {
    all: unset;
    padding: 0 16px;
    
    font-weight: 400;
    font-size: 17px;
    line-height: 150%;
  }

  .button_goBack {
    cursor: pointer;
  }

  span {
    cursor: pointer;
  }

  .sublevel_button {
  }

  .title {
    position: absolute;
    left: 50%;

    transform: translateX(-50%);

    font-size: 17px;
  }

  img {
    margin-top: 3px;
  }
`;
