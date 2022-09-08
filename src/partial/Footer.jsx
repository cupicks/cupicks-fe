import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import createButton from "../assets/svg/cancel.svg";
import myPageIcon from "../assets/svg/account.svg";
import mainIcon from "../assets/svg/language.svg";

const Footer = (props) => {
  // const { pathname } = useLocation();
  // console.log(pathname);
  const navigate = useNavigate();
  const onCreate = () => {
    navigate("/recipe/create");
    props.setLoaded(false);
  };
  return (
    <StWrap>
      <StButtonSet>
        <StMyPageBtn>
          <img className="mypageBtn" src={myPageIcon} />
        </StMyPageBtn>
        <CreateButton onClick={onCreate}>
          <img className="createBtn" src={createButton} />
        </CreateButton>
        <StMainBtn>
          <img className="mainBtn" src={mainIcon} />
        </StMainBtn>
      </StButtonSet>
    </StWrap>
  );
};

export default Footer;

const StWrap = styled.footer`
  width: 100%;
  height: 150px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  background-color: #eee;
`;

const StButtonSet = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StMyPageBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;

  cursor: pointer;

  .mypageBtn {
    width: 45px;
    height: 45px;
  }
`;

const CreateButton = styled.button`
  width: 80px;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  transform: translateY(-80%);

  padding-bottom: 5px;

  border: none;

  cursor: pointer;

  .createBtn {
    width: 120px;
    height: 120px;
    border: none;
  }
`;

const StMainBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  border: none;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  .mainBtn {
    width: 45px;
    height: 45px;
  }
`;
