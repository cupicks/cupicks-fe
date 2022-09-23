import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import CommentEdit from "./CommentEdit";
import CommentDelete from "./CommentDelete";

const CommentOption = ({
  menuOpen,
  setMenuOpen,
  getComments,
  comments,
  setComments,
  editCommentId,
  comment,
}) => {
  const [edit, setEdit] = useState(false);
  const menubackground = useRef();

  const onEditModal = (e) => {
    // setMenuOpen(false);
    // setMenuOpen(false);
    setEdit(true);
  };

  return (
    <React.Fragment>
      {menuOpen == true ? (
        <ModalBack
          ref={menubackground}
          onClick={(e) => {
            if (menubackground.current === e.target) {
              setMenuOpen(false);
              setEdit(false);
            }
            e.stopPropagation();
          }}
        >
          {edit ? (
            
            <CommentEdit
              setMenuOpen={setMenuOpen}
              editCommentId={editCommentId}
              edit={edit}
              setEdit={setEdit}
              comments={comments}
              setComments={setComments}
              // comment={comment}
            />
            
          ) : (
            <MenuPage>
              <button className="edit_btn" onClick={onEditModal}>
                수 정
              </button>
              <CommentDelete
                comments={comments}
                setComments={setComments}
                editCommentId={editCommentId}
                setMenuOpen={setMenuOpen}
              />
            </MenuPage>
          )}
        </ModalBack>
      ) : null}
    </React.Fragment>
  );
};

export default CommentOption;

const ModalBack = styled.div`
  position: fixed;
  z-index: 1000;
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
