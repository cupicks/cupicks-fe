import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navigation = (props) => {
  const {empty=false} = props
  const navigate = useNavigate();
  return (
    <StNav>
      {!empty && <span className="button_goBack" onClick={()=> navigate(-1)}>
        〈
      </span>}
      {props.children}
    </StNav>
  )
}

export default Navigation;

const StNav = styled.nav`
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  
  position: sticky;
  top: 0;
  
  background-color: #fff;
  
  line-height: 60px;

  button {
    all: unset;
  }

  .button_goBack {
    font-size: 20px;
  }

  span {
    cursor: pointer;
  }
`