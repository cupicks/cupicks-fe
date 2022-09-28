import React from "react";

import Navigation from "../partial/Navigation";
import CommentBody from "../components/recipeComment/CommentBody";

import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Comments = () => {
  const { state } = useLocation();

  return (
    <StRecipeComment>
      <Navigation goto={-1}>
        <span className="title">댓글</span>
      </Navigation>

      <p className="recipe_title">{state}</p>
      <CommentBody />
    </StRecipeComment>
  );
};

export default Comments;

const StRecipeComment = styled.div`
  height: 100%;
  position: relative;

  .recipe_title {
    padding: 0 10px;

    text-align: center;
    font-size: 12px;

    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;

    color: #cdcdcd;
    background-color: #fff;
  }
`;
