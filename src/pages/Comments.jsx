import React from "react";
import Navigation from "../partial/Navigation";
import CommentBody from "../components/recipeComment/CommentBody";
import CommentInput from "../components/recipeComment/CommentInput";
import styled from "styled-components";

const Comments = () => {
  return (
    <StRecipeComment>
      <Navigation>
        <span className="title">댓글</span>
      </Navigation>
      <CommentBody />
      <CommentInput />
    </StRecipeComment>
  );
};

export default Comments;

const StRecipeComment = styled.div`
  /* flex: 1 1 auto;
  display: flex; */

  height: 100%;
  overflow-y: scroll;

  /* .comment_title {
    width: 30px;
    height: 30px;
  } */
`;
