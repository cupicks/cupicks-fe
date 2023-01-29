import { useNavigate } from "react-router-dom";

import { ReactComponent as Icon01 } from "../assets/svg/community.svg";
import { ReactComponent as Icon02 } from "../assets/svg/search_recipe.svg";
import { ReactComponent as Icon03 } from "../assets/svg/make_recipe.svg";
import { ReactComponent as Icon04 } from "../assets/svg/badge.svg";
import { ReactComponent as Icon05 } from "../assets/svg/account.svg";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomFooter, CustomFooterButton } = styledLayoutComponents;

const Footer = ({ pathname }) => {
  const navigate = useNavigate();
  const userLogin = Boolean(localStorage.getItem("refreshToken"));

  const goToCreate = () => {
    if (!userLogin) {
      navigate("/recipe/create/guest", { replace: true, state: undefined });
      return;
    }

    navigate("/recipe/create", { replace: true, state: undefined });
  };

  const goToMain = () =>
    navigate("/recipe", { replace: true, state: undefined });

  const goToMypage = () =>
    navigate("/mypage", { replace: true, state: undefined });

  const goToBadge = () =>
    navigate("/badge", { replace: true, state: undefined });

  const goToBadge = () => {
    navigate("/badge", { replace: true, state: undefined });
  };

  const pathCommunity = pathname === "/recipe" && pathname !== "/recipe/create";
  const pathRecipeCreate =
    pathname === "/recipe/create" || pathname === "/recipe/create/guest";
  const pathMypage = pathname === "/mypage" || pathname === "/profile/edit";

  return (
    <CustomFooter>
      <div className="contents_area">
        <CustomFooterButton onClick={goToMain}>
          <div className={pathCommunity ? "svg_box on" : "svg_box"}>
            <Icon01 />
          </div>
        </CustomFooterButton>

        {/* <StBadgeButton onClick={goToMain}>
          <div className={pathname === "/recipe" ? "svg_box on" : "svg_box"}>
            <Icon02 />
          </div>
        </StBadgeButton> */}

        <CustomFooterButton onClick={goToCreate}>
          <div className={pathRecipeCreate ? "svg_box on" : "svg_box"}>
            <Icon03 />
          </div>
        </CustomFooterButton>

        <StBadgeButton onClick={goToBadge}>
          <div className={pathname === "/badge" ? "svg_box on" : "svg_box"}>
            <Icon04 />
          </div>
        </StBadgeButton>

        <CustomFooterButton onClick={goToMypage}>
          <div className={pathMypage ? "svg_box on" : "svg_box"}>
            <Icon05 />
          </div>
        </CustomFooterButton>
      </div>
    </CustomFooter>
  );
};

export default Footer;

/** 검색하기랑 활동 배지 아이콘 전용 마진 값 */
const StBadgeButton = styled(CustomFooterButton)`
  & > div {
    margin-top: 0.2rem;
  }
`;
