import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../server/api";
import { useParams } from "react-router-dom";

const CommentDelete = ({
  setMenuOpen,
  comments,
  setComments,
  editCommentId,
}) => {
  const { recipeId } = useParams();

  const getComments = async () => {
    let contentType = "application/json";
    const data = await api(contentType)
      .get(`/comments?recipeId=${recipeId}&page=1&count=10`)
      .then((res) => {
        setComments([...res.data.commentList]);
      });
    console.log(data);
  };

  const onDeleteHandler = async () => {
    let contentType = "application/json";
    await api(contentType)
      .delete(`/comments/${editCommentId}`)
      .then((res) => {
        console.log(res);
      });
    setMenuOpen(false);
    getComments();
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
