import logo from "../assets/image/logo/logo_Cupick.png";

import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomHeader } = styledLayoutComponents;

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <CustomHeader src={logo}>
      <dis className="cupick_logo" onClick={() => navigate("/")} />
    </CustomHeader>
  );
};

export default Header;
