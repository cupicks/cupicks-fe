import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navigation = (props) => {
  const {empty=false} = props
  const navigate = useNavigate();
  return (
    <StNav>
      {!empty && <span className="button_goBack" onClick={()=> navigate(-1)}>
        &lt;
      </span>}
      {props.children}
    </StNav>
  )
}

export default Navigation;

const StNav = styled.nav`
  padding: 0 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  
  position: sticky;
  top: 0;
  
  background-color: #fff;
  
  line-height: 60px;
  z-index: 999;

  button {
    all: unset;
    padding: 0 16px;
  }

  .button_goBack {
    font-size: 20px;
  }

  span {
    cursor: pointer;
  }
  
  .sublevel_button {
    background-color: red;
  }

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`