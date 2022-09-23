import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ToastMessage from "../components/elements/modal/ToastMessage";

import createIcon from "../assets/svg/add.svg";
import { ReactComponent as MainIcon } from "../assets/svg/community.svg";
import { ReactComponent as MyPageIcon } from "../assets/svg/account.svg";

import styled from "styled-components";

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
    <StWrap>
      <StButton onClick={goToMypage}>
        <div
          className={
            pathname === "/mypage" || pathname === "/profile/edit"
              ? "svg_box on"
              : "svg_box"
          }
        >
          <MyPageIcon />
        </div>
      </StButton>

      <StButtonGoToCreate onClick={goToCreate}>
        <img src={createIcon} />
      </StButtonGoToCreate>

      <StButton onClick={goToMain}>
        <div className={pathname === "/recipe" ? "svg_box on" : "svg_box"}>
          <MainIcon />
        </div>
      </StButton>

      {/* 토스트 메시지/모달 */}
      {needLogginModal && (
        <ToastMessage text={"레시피 작성에는\n 로그인이 필요합니다."} />
      )}
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
    transition: all 0.3s;
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

  &:hover svg {
    opacity: 0.7;
  }
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

    transition: all 0.5s;
    opacity: 0.9;
  }

  img:hover {
    opacity: 1;
  }
`;
