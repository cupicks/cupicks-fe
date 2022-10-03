import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomNavigation } = styledLayoutComponents;

import arrowBackIcon from "../assets/svg/arrow_back.svg";

const Navigation = (props) => {
  const { empty = false, transparent = false, goto = "/recipe" } = props;
  const navigate = useNavigate();

  return (
    <CustomNavigation transparent={transparent}>
      {!empty && (
        <span
          className="button_goBack fcc"
          onClick={() => navigate(goto, { replace: true, state: undefined })}
        >
          <img src={arrowBackIcon} alt="뒤로 가기 버튼" />
        </span>
      )}
      {props.children}
    </CustomNavigation>
  );
};

export default Navigation;
