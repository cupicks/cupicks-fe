import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import talk_edit from "../../assets/svg/talk_edit.svg";
import CommentEdit from "./CommentEdit";

const CommentBody = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menubackground = useRef();
  // const [comment, setComment] = useState([]);
  // const fetchComment = async () => {
  //   const data = await serverAxios.get(`url`);
  //   setComment(data.data);
  // }

  // useEffect(() => {
  //   fetchComment();
  // }, []);
  return (
    <StListWrap>
      <StCommentWrap>
        <StProfile>
          <div className="profile_pic"></div>
        </StProfile>
        <StContent>
          <div className="content_top">
            <div className="nickname">닉네임</div>
            <div className="create_time">30분전</div>
          </div>
          <div className="content_bottom">바닐라시럽 어디꺼에요?</div>
        </StContent>
        <StOption
          onClick={() => {
            setMenuOpen(true);
          }}
        >
          <img src={talk_edit} />
        </StOption>
        {menuOpen == true ? (
          <ModalBack
            ref={menubackground}
            onClick={(e) => {
              if (menubackground.current === e.target) {
                setMenuOpen(false);
              }
            }}
          >
            <CommentEdit />
          </ModalBack>
        ) : null}
      </StCommentWrap>
    </StListWrap>
  );
};

export default CommentBody;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2.5rem;
  box-sizing: border-box;
`;

const StListWrap = styled.div`
  height: calc(100vh - 60px - 80px);
  display: flex;
  flex-flow: column;
  border-bottom: 2px solid #e6e6e6;
  position: relative;
`;
const StCommentWrap = styled.div`
  width: 100%;
  height: 10vh;

  display: flex;
  flex-flow: row;
`;

const StProfile = styled.div`
  width: 15%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  .profile_pic {
    width: 5vh;
    height: 5vh;

    margin-bottom: 2.2rem;

    border: 1px solid black;
    border-radius: 50%;
  }
`;

const StContent = styled.div`
  width: 75%;

  display: flex;
  flex-flow: column;

  .content_top {
    height: 35%;
    display: flex;
    flex-flow: row;
  }

  .content_bottom {
    height: 65%;
    font-size: 15px;
  }

  .nickname {
    width: 20%;
    font-size: 14px;
    font-weight: bold;

    display: flex;
    align-items: center;
  }

  .create_time {
    width: 80%;
    font-size: 13px;
    color: gray;

    display: flex;
    align-items: center;
  }
`;

const StOption = styled.div`
  width: 10%;

  cursor: pointer;
`;
