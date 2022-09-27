import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ToastMessage from "../components/elements/modal/ToastMessage";

import createIcon from "../assets/svg/add.svg";
import { ReactComponent as MainIcon } from "../assets/svg/community.svg";
import { ReactComponent as MyPageIcon } from "../assets/svg/account.svg";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomFooter, CustomGoToCreateButton, CustomFooterButton } =
  styledLayoutComponents;

const Footer = ({ pathname }) => {
  const navigate = useNavigate();

  const [needLogginModal, setNeedLogginModal] = useState(false);
  const userLogin = Boolean(localStorage.getItem("refreshToken"));
  const timer = 1000;

  const goToCreate = () => {
    if (!userLogin) {
      if (!needLogginModal) {
        setNeedLogginModal(true);
        setTimeout(() => {
          setNeedLogginModal(false);
        }, timer);
      }
      return;
    }

    navigate("/recipe/create");
  };

  const goToMain = () => {
    navigate("/recipe");
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  return (
    <CustomFooter>
      <CustomFooterButton onClick={goToMypage}>
        <div
          className={
            pathname === "/mypage" || pathname === "/profile/edit"
              ? "svg_box on"
              : "svg_box"
          }
        >
          <MyPageIcon />
        </div>
      </CustomFooterButton>

      <CustomGoToCreateButton onClick={goToCreate}>
        <img src={createIcon} />
      </CustomGoToCreateButton>

      <CustomFooterButton onClick={goToMain}>
        <div className={pathname === "/recipe" ? "svg_box on" : "svg_box"}>
          <MainIcon />
        </div>
      </CustomFooterButton>

      {/* 토스트 메시지/모달 */}
      {needLogginModal && (
        <ToastMessage text={"레시피 작성에는\n 로그인이 필요합니다."} />
      )}
    </CustomFooter>
  );
};

export default Footer;
