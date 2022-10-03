import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmBox from "../components/elements/modal/ConfirmBox";

import createIcon from "../assets/svg/add.svg";
import { ReactComponent as Icon01 } from "../assets/svg/community.svg";
import { ReactComponent as Icon02 } from "../assets/svg/community.svg";
import { ReactComponent as Icon03 } from "../assets/svg/make_recipe.svg";
import { ReactComponent as Icon04 } from "../assets/svg/account.svg";
import { ReactComponent as Icon05 } from "../assets/svg/account.svg";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomFooter, CustomFooterButton } = styledLayoutComponents;

const Footer = ({ pathname }) => {
  const navigate = useNavigate();

  const [needLogginModal, setNeedLogginModal] = useState(false);
  const userLogin = Boolean(localStorage.getItem("refreshToken"));
  const timer = 1000;

  const goToCreate = () => {
    if (!userLogin) {
      navigate("/recipe/create/guest", { replace: true, state: undefined });
      return;
    }

    navigate("/recipe/create", { replace: true, state: undefined });
  };

  const goToMain = () => {
    navigate("/recipe", { replace: true, state: undefined });
  };

  const goToMypage = () => {
    navigate("/mypage", { replace: true, state: undefined });
  };

  const pathCommunity = pathname === "/recipe" && pathname !== "/recipe/create";
  const pathRecipeCreate = pathname === "/recipe/create";
  const pathMypage = pathname === "/mypage" || pathname === "/profile/edit";

  return (
    <CustomFooter>
      <CustomFooterButton onClick={goToMain}>
        <div className={pathCommunity ? "svg_box on" : "svg_box"}>
          <Icon01 />
        </div>
      </CustomFooterButton>

      {/* <CustomFooterButton onClick={goToMain}>
        <div className={pathname === "/recipe" ? "svg_box on" : "svg_box"}>
          <Icon02 />
        </div>
      </CustomFooterButton> */}

      <CustomFooterButton onClick={goToCreate}>
        <div className={pathRecipeCreate ? "svg_box on" : "svg_box"}>
          <Icon03 />
        </div>
      </CustomFooterButton>

      {/* <CustomFooterButton onClick={goToCreate}>
        <div className={pathname === "/recipe" ? "svg_box on" : "svg_box"}>
          <Icon04 />
        </div>
      </CustomFooterButton> */}

      <CustomFooterButton onClick={goToMypage}>
        <div className={pathMypage ? "svg_box on" : "svg_box"}>
          <Icon05 />
        </div>
      </CustomFooterButton>
    </CustomFooter>
  );
};

export default Footer;
