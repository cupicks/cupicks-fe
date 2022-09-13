import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommentEdit from "./CommentEdit";
import CommentDelete from "./CommentDelete";

const CommentOption = ({ setMenuOpen }) => {
  const [edit, setEdit] = useState(false);

  const onEditModal = (e) => {
    // setMenuOpen(false);
    // setMenuOpen(false);
    setEdit(true);
  };
  return (
    <React.Fragment>
      {edit ? (
        <CommentEdit setMenuOpen={setMenuOpen} edit={edit} setEdit={setEdit} />
      ) : (
        <MenuPage>
          <button className="edit_btn" onClick={onEditModal}>
            수 정
          </button>
          <CommentDelete setMenuOpen={setMenuOpen} />
        </MenuPage>
      )}
    </React.Fragment>
  );
};

export default CommentOption;

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
`;
