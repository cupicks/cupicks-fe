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
    // console.log(data);
  };
  console.log(comments);
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
      <DeleteBtn onClick={onDeleteHandler}>삭제</DeleteBtn>
    </>
  );
};

export default CommentDelete;

const DeleteBtn = styled.button``;
