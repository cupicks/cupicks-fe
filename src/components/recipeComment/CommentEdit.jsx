import React from "react";
import styled from "styled-components";

const CommentEdit = () => {
  return (
    <MenuPage>
      <button className="edit_btn">수 정</button>
      <button className="delete_btn">삭 제</button>
    </MenuPage>
  );
};

export default CommentEdit;

const MenuPage = styled.div`
  background-color: #0f100f;
  position: relative;
  width: 90%;
  height: 15%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 20px;

  .edit_btn {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 50%;
    border-bottom: 2px solid #404040;
    background-color: #0f100f;
    color: white;
    font-weight: bold;
  }

  .delete_btn {
    height: 50%;
    background-color: #0f100f;
    color: white;
    font-weight: bold;
    border-top: 2px solid #404040;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;
