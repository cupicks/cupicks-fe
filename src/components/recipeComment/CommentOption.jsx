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
  setCheckComment,
  userProps,
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
              setCheckComment={setCheckComment}
              userProps={userProps}
            />
          ) : (
            <MenuPage>
              <button className="edit_btn" onClick={onEditModal}>
                수정
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
  padding-bottom: 2rem;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 1000;
`;

const MenuPage = styled.div`
  width: 90%;
  max-width: 500px;

  border-radius: 10px;

  background-color: #101010;

  button {
    all: unset;
    display: block;
    width: 100%;

    padding: 20px 0;

    text-align: center;
    font-size: 17px;
    font-weight: 500;

    color: white;

    cursor: pointer;
  }

  .edit_btn {
    border-bottom: 1px solid #ededed;
  }
`;
