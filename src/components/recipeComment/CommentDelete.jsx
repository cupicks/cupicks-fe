import React, { useState } from "react";
import styled from "styled-components";

const CommentDelete = ({ setMenuOpen }) => {
  // const onDeleteHandler = async () => {
  //   await axios.delete(`url/api/comments/${commentId}`).then((res) => {
  //     console.log(res)
  //   })
  //   fetchComment();
  //   setMenuOpen(false);
  // }
  const onDeleteHandler = () => {
    setMenuOpen(false);
  };
  return (
    <>
      <DeleteBtn onClick={onDeleteHandler}>삭 제</DeleteBtn>
    </>
  );
};

export default CommentDelete;

const DeleteBtn = styled.button`
  height: 50%;
  background-color: #0f100f;
  color: white;
  font-weight: bold;
  border-top: 2px solid #404040;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
